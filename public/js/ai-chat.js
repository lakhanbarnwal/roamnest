
const toggle = document.getElementById("rn-ai-toggle");
const panel = document.getElementById("rn-ai-panel");
const closeBtn = document.getElementById("rn-ai-close");
const form = document.getElementById("rn-ai-form");
const input = document.getElementById("rn-ai-input");
const messages = document.getElementById("rn-ai-messages");
const sendBtn = document.getElementById("rn-ai-send");

const CHAT_HISTORY_KEY = "roamnest_ai_chat_history";
const CHAT_PANEL_KEY = "roamnest_ai_panel_open";

// Restore chat history after page navigation or refresh
function restoreChatHistory() {
  try {
    const savedHistory = sessionStorage.getItem(CHAT_HISTORY_KEY);

    if (savedHistory && messages) {
      messages.innerHTML = savedHistory;
      messages.scrollTop = messages.scrollHeight;
    }

    const wasOpen = sessionStorage.getItem(CHAT_PANEL_KEY) === "true";

    if (panel) panel.hidden = !wasOpen;
  } catch (error) {
    console.error("Could not restore AI chat:", error);
  }
}

// Save current messages in this browser tab
function saveChatHistory() {
  try {
    if (messages) {
      sessionStorage.setItem(CHAT_HISTORY_KEY, messages.innerHTML);
    }
  } catch (error) {
    console.error("Could not save AI chat:", error);
  }
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `rn-ai-bubble ${className}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  saveChatHistory();
  return div;
}

function showResults(listings, container) {
  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.className = "rn-ai-bubble rn-ai-bot rn-ai-result";

    const title = document.createElement("strong");
    title.textContent = listing.title || "Registered stay";
    card.appendChild(title);

    const details = document.createElement("p");
    details.textContent =
      `${listing.location || ""}, ${listing.country || ""}` +
      ` • ₹${listing.price ?? "Price not listed"}`;
    card.appendChild(details);

    if (listing.image) {
      const img = document.createElement("img");
      img.src = listing.image;
      img.alt = listing.title || "Property";
      img.loading = "lazy";
      card.appendChild(img);
    }

    const link = document.createElement("a");
    link.href = listing.url;
    link.textContent = "View property";

    // Open the property in a new tab so chat stays open
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.appendChild(link);
    container.appendChild(card);
  });

  saveChatHistory();
}

if (toggle && panel && input) {
  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    sessionStorage.setItem(
      CHAT_PANEL_KEY,
      String(!panel.hidden)
    );

    if (!panel.hidden) input.focus();
  });
}

if (closeBtn && panel) {
  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    sessionStorage.setItem(CHAT_PANEL_KEY, "false");
  });
}

restoreChatHistory();

if (form && input && sendBtn && messages) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "rn-ai-user");
    input.value = "";
    sendBtn.disabled = true;

    const loading = addMessage(
      "Searching registered stays...",
      "rn-ai-bot"
    );

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      loading.remove();
      saveChatHistory();

      if (!response.ok || !data.success) {
        addMessage(
          data.message || "Unable to search right now.",
          "rn-ai-bot"
        );
        return;
      }

      addMessage(data.answer, "rn-ai-bot");

      if (data.listings?.length) {
        showResults(data.listings, messages);
      } else {
        addMessage("No matching listings found.", "rn-ai-bot");
      }

      messages.scrollTop = messages.scrollHeight;
      saveChatHistory();
    } catch (error) {
      loading.remove();
      saveChatHistory();
      addMessage("Network error. Please try again.", "rn-ai-bot");
      console.error("AI chat request failed:", error);
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  });
}
