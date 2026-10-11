if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
express;

main()
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

async function main() {
  mongoose.connect(process.env.ATLASURL);
}

//pre set

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "views")));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./views/error.js");
const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapApi = process.env.MAP_BOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapApi });

const {
  isLoggedIn,
  saveredirectUrl,
  isOwner,
  isReviewOwner,
} = require("./middleware.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const { alternatives } = require("joi");

const upload = multer({ storage });

const store = MongoStore.create({
  mongoUrl: process.env.ATLASURL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      maxAge: 259200000,
      httpOnly: true,
    },
  }),
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = 3000;
app.listen(port, (req, res) => {
  console.log("app is listening to port 3000");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//signup route
app.get("/signup", (req, res) => {
  res.render("user/signUp.ejs");
});

app.post(
  "/signup",

  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, name, password } = req.body;
      let registered = new User({ username, email, name });
      let newUser = await User.register(registered, password);
      req.login(newUser, function (err) {
        if (err) {
          return next(err);
        }
        req.flash("success", "Created Account Successfully");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }),
);

//login route
app.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

app.post(
  "/login",
  saveredirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
  },
);

//index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }),
);

//new route

app.get("/listings/create", isLoggedIn, (req, res) => {
  res.render("listings/new_form.ejs");
});

//create route

app.post(
  "/listings",
  isLoggedIn,
  upload.single("image"),
  wrapAsync(async (req, res, next) => {
    try {
      console.log("Uploaded file:", req.file);
      console.log("Form body:", req.body);

      if (!req.file) {
        req.flash("error", "Please select an image.");
        return res.redirect("/listings/new");
      }

      const { title, description, price, location, country } = req.body;

      const newListing = new Listing({
        title,
        description,
        price,
        location,
        country,
        owner: req.user._id,
        image: {
          url: req.file.secure_url,
          filename: req.file.public_id,
        },
      });

      const response = await geocodingClient
        .forwardGeocode({
          query: location,
          limit: 1,
        })
        .send();

      if (!response.body.features.length) {
        req.flash("error", "Location not found.");
        return res.redirect("/listings/new");
      }

      newListing.geometry = response.body.features[0].geometry;

      await newListing.save();
      console.log("Saved image:", newListing.image);
      console.log(
        "Saved listing:",
        await Listing.findById(newListing._id).lean(),
      );

      req.flash("success", "Listing created successfully");
      res.redirect("/listings");
    } catch (err) {
      next(err);
    }
  }),
);

//show route

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }),
);

//edit
app.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id);
    let originUrl = listings.image.url;
    originUrl = originUrl.replace("/upload", "/upload/w_200,h_250");
    res.render("listings/edit_form.ejs", { listings, originUrl });
  }),
);
app.put(
  "/listings/:id",
  isLoggedIn,
  upload.single("image"),
  wrapAsync(async (req, res) => {
    const { title, description, price, location, country } = req.body;
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { title, description, price, location, country },
      { new: true },
    );

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };

      await listing.save();
    }

    req.flash("success", "Listing edited successfully");
    res.redirect("/listings");
  }),
);
//delete route

app.delete(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id);

    // delete all reviews in one query
    await Review.deleteMany({ _id: { $in: list.reviews } });

    await Listing.findByIdAndDelete(id);
    req.flash("error", "listing deleted successfully");
    res.redirect("/listings");
  }),
);
//logout route

app.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "log out successfully ");
    res.redirect("/listings");
  });
});

async function generateWithRetry(request, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await ai.models.generateContent(request);
    } catch (error) {
      if (error.status !== 503 || attempt >= retries) {
        throw error;
      }

      const delay = 1000 * 2 ** attempt;
      console.log(`Gemini busy. Retrying in ${delay / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// AI search route
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Please keep your question under 500 characters.",
      });
    }

    const result = await generateWithRetry({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: `
You are RoamNest's property search assistant.

Classify the user's message into one of these intents:
- "greeting": hello, hi, how are you, thanks, goodbye, or casual conversation.
- "search": the user wants to find or filter properties.
- "other": unrelated questions or unclear requests.

Extract search filters only when intent is "search".

Return JSON only:
{
  "intent": "greeting" | "search" | "other",
  "reply": string,
  "city": string | null,
  "country": string | null,
  "maxPrice": number | null
}

For greetings, reply politely and ask how you can help find a stay.
For unrelated questions, explain that you help search RoamNest listings.
Never classify a greeting as a search.
Never invent property details.
`,
        responseMimeType: "application/json",
       responseSchema: {
  type: "OBJECT",
  properties: {
    intent: {
      type: "STRING",
      enum: ["greeting", "search", "other"],
    },
    reply: { type: "STRING" },
    city: { type: ["STRING", "NULL"] },
    country: { type: ["STRING", "NULL"] },
    maxPrice: { type: ["NUMBER", "NULL"] },
  },
  required: [
    "intent",
    "reply",
    "city",
    "country",
    "maxPrice",
  ],
},
      },
    });

    const filters = JSON.parse(result.text);
    if (filters.intent !== "search") {
  return res.json({
    success: true,
    answer: filters.reply,
    totalRegisteredListings: 0,
    listings: [],
  });
}

    const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const query = {};
    if (filters.city) {
      query.location = {
        $regex: escapeRegex(filters.city),
        $options: "i",
      };
    }

    if (filters.country) {
      query.country = {
        $regex: escapeRegex(filters.country),
        $options: "i",
      };
    }

    if (
      filters.maxPrice !== null &&
      Number.isFinite(filters.maxPrice) &&
      filters.maxPrice >= 0
    ) {
      query.price = { $lte: filters.maxPrice };
    }
    if (Object.keys(query).length === 0) {
  return res.json({
    success: true,
    answer: "Please specify a location or maximum budget to search for stays.",
    totalRegisteredListings: 0,
    listings: [],
  });
}
    const [count, listings] = await Promise.all([
      
      Listing.countDocuments(query),
      Listing.find(query)
        .select("title price location country image")
        .limit(10)
        .lean(),
    ]);
    console.log("MongoDB query:", JSON.stringify(query));

    res.json({
      success: true,
      answer: `RoamNest par ${count} registered listings mili hain.`,
      totalRegisteredListings: count,
      listings: listings.map((item) => ({
        id: item._id,
        title: item.title,
        price: item.price,
        location: item.location,
        country: item.country,
        image: item.image?.url || null,
        url: `/listings/${item._id}`,
      })),
    });
  } catch (error) {
    console.error("Gemini AI error:", error);

    res.status(500).json({
      success: false,
      message:
        error.status === 503
          ? "AI is temporarily busy. Please try again shortly."
          : "AI search failed. Please try again.",
    });
  }
});

//reviews route
app.post(
  "/listings/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    let newReview = new Review(req.body.review);

    // Current logged-in user becomes review owner
    newReview.author = res.locals.currUser._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New review added");
    res.redirect(`/listings/${id}`);
  }),
);

// delete review route
app.delete(
  "/listings/:id/reviews/:review_id",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(async (req, res) => {
    const { id, review_id } = req.params;

    await Review.findByIdAndDelete(review_id);

    await Listing.findByIdAndUpdate(id, {
      $pull: {
        reviews: review_id,
      },
    });

    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
  }),
);

app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went wrong" } = err;
  res.status(status).send(message);
});
