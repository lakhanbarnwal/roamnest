# 🏡 RoamNest

**Discover. Explore. Stay.**

RoamNest is a full-stack Property discovery and listing platform where
users can explore stays, create and manage property listings, upload
images to cloud storage, view property locations on interactive maps,
and share reviews. It also includes an **AI-powered chatbot** that helps
users search registered listings using natural-language requests.

## 🌐 Project Links

-   **Live Demo:** https://roamnest-1-wnl4.onrender.com
-   **GitHub Repository:** https://github.com/lakhanbarnwal/roamnest


## ✨ Features

### 🤖 AI-Powered Hotel Search Chatbot

RoamNest includes a floating AI chatbot powered by the Google Gemini
API.

-   Search registered properties using natural-language prompts.
-   Extract search criteria such as location, country, and maximum
    price.
-   Return results from the application's MongoDB listings rather than
    inventing property records.
-   Display matching property titles, locations, prices, and
    cloud-hosted images.
-   Open a property detail page directly from a result.
-   Handle greetings and non-search messages separately from listing
    searches.
-   Preserve chat history for the current browser tab using
    `sessionStorage`.

**Example prompts** - `Show listings in India` -
`Find stays under ₹1000` - `Show all listings` -
`Find properties in Ranchi`

Search results depend on the data saved in the database and the accuracy
of the location and country values in each listing. AI responses also
depend on Gemini API and model availability.

### 🏠 Property Listing Management

-   Create, read, update, and delete property listings (CRUD).
-   View individual property details.
-   Store title, description, price, location, country, image, owner,
    reviews, and geographic coordinates.
-   Associate each listing with its owner.
-   Display listing cards and property details.
-   Format prices in Indian rupees.

### 🔎 Property Discovery & Categories

The discovery interface includes categories such as:

-   Trending
-   Rooms
-   Iconic Cities
-   Mountains
-   Castles
-   Pools
-   Camping
-   Farms
-   Arctic

The category navigation is designed to work across desktop and mobile
screen sizes.

### 🔍 Search and Filters

-   Discover properties through the listing interface.
-   Use the AI chatbot to search by supported criteria such as location,
    country, and maximum price.
-   View matching records from the registered listings database.

### ☁️ Cloud Image Uploads with Cloudinary

Property images are uploaded to Cloudinary instead of being stored as
image files on the application server.

-   Upload images through listing forms.
-   Store Cloudinary image URLs and public identifiers in MongoDB.
-   Display cloud-hosted images on listing pages and chatbot results.
-   Update listing images when editing a property.

**Image upload flow**

``` text
User selects an image
        ↓
Multipart form submission
        ↓
Multer + Cloudinary storage
        ↓
Cloudinary returns image URL and public ID
        ↓
Image metadata is saved in MongoDB
        ↓
RoamNest displays the cloud-hosted image
```

### 🗺️ Interactive Maps with Mapbox

-   Convert listing locations into geographic coordinates using Mapbox
    geocoding.
-   Store geographic data with the listing.
-   Display property locations on interactive maps.
-   Show map markers associated with listings.

Map accuracy depends on the location supplied and the geocoding result.

### 🔐 Authentication with Passport.js

RoamNest uses Passport.js with a local username/password strategy.

-   User registration.
-   Login and logout.
-   Password-based authentication.
-   Session-based login state.
-   Protected routes for authenticated users.

### 🛡️ Authorization and Ownership Checks

Authentication verifies **who the user is**; authorization determines
**what the user is allowed to do**.

Authorization middleware is used to protect listing and review actions.

-   Require login for protected operations.
-   Restrict listing edits and deletion to the listing owner.
-   Protect review operations and review ownership where applicable.
-   Prevent users from modifying resources they do not own.

### 🍪 Sessions, Cookies, and MongoDB Session Store

-   Express Session manages login sessions.
-   Connect Mongo stores session data in MongoDB.
-   Cookies maintain the session identifier between requests.
-   Flash messages provide feedback after actions.
-   Session configuration uses environment variables for secrets.

### ⭐ Reviews and Ratings

-   Add reviews to listings.
-   Associate reviews with their authors and listings.
-   Display submitted reviews and ratings.
-   Delete reviews through protected routes.

### 💰 Tax Display

-   Toggle additional tax information in the listing interface.
-   Show the displayed price with tax information when enabled.

The interface may display an example such as an additional 18% GST;
confirm applicable tax rules before treating displayed tax information
as a final payable amount.

### ✅ Validation and Error Handling

-   Client-side form validation.
-   Joi validation where configured.
-   Mongoose schema validation.
-   Express middleware for request processing.
-   Async error-handling utilities.
-   Centralized Express error handling.
-   Flash messages for success and error feedback.

### 📱 Responsive User Interface

-   Responsive navigation and mobile menu.
-   Property cards and listing grids.
-   Responsive forms and authentication pages.
-   Category navigation and filters.
-   Property detail pages and maps.
-   Floating AI chatbot interface.

## 🧰 Technology Stack

  -----------------------------------------------------------------------
  Area                                Technologies
  ----------------------------------- -----------------------------------
  Frontend                            HTML5, CSS3, JavaScript, Bootstrap,
                                      EJS

  Backend                             Node.js, Express.js

  Database                            MongoDB Atlas, MongoDB, Mongoose

  Authentication                      Passport.js, Passport Local,
                                      Passport Local Mongoose

  Sessions                            Express Session, Connect Mongo,
                                      cookies

  Image storage                       Cloudinary, Multer, Multer Storage
                                      Cloudinary

  Maps and geocoding                  Mapbox

  AI chatbot                          Google Gemini API, `@google/genai`

  Validation                          Joi, Mongoose validation,
                                      client-side validation

  Hosting                             Render

  Development tools                   npm, Git, GitHub, VS Code, Nodemon
  -----------------------------------------------------------------------

## 🏗️ Architecture Overview

``` text
Browser (EJS, CSS, JavaScript)
             |
             v
       Express.js App
             |
      Middleware Layer
  Authentication / Authorization
   Validation / Error Handling
             |
      Application Routes
       /      |       \
      v       v        v
  MongoDB  Cloudinary  Gemini API
  Listings  Images     AI filters
      |
      v
  Mapbox Geocoding
  (coordinates for listings)

Express renders pages and returns API results to the browser.
```

## ⚙️ Getting Started

### Prerequisites

Install or configure:

-   Node.js and npm
-   A MongoDB Atlas database
-   A Cloudinary account
-   A Mapbox access token
-   A Google AI Studio / Gemini API key

### 1. Clone the repository

``` bash
git clone https://github.com/lakhanbarnwal/roamnest.git
cd roamnest
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Use the variable names
expected by the current application:

``` env
ATLASURL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_long_random_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

MAP_BOX_TOKEN=your_mapbox_access_token
GEMINI_API_KEY=your_gemini_api_key
```

**Important:** The variable names must match those used in `app.js` and
`cloudConfig.js`. Never commit real credentials or API secrets to
GitHub. Keep `.env` in `.gitignore`.

### 4. Start the application

``` bash
node app.js
```

If a development script is configured in `package.json`, you can also
use the relevant npm script, such as:

``` bash
npm run dev
```

### 5. Open the application

The current `app.js` configuration uses port `3000`:

``` text
http://localhost:3000
```

If you change the port or configure a `PORT` environment variable, use
the port configured by your application.

## 🔑 Environment Variable Reference

  -----------------------------------------------------------------------
  Variable                            Purpose
  ----------------------------------- -----------------------------------
  `ATLASURL`                          MongoDB Atlas connection string

  `SESSION_SECRET`                    Secret used by Express Session and
                                      session-store configuration

  `CLOUD_NAME`                        Cloudinary cloud name

  `CLOUDINARY_API_KEY`                Cloudinary API key

  `CLOUDINARY_API_SECRET`             Cloudinary API secret

  `MAP_BOX_TOKEN`                     Mapbox access token for
                                      geocoding/maps

  `GEMINI_API_KEY`                    Google Gemini API key for chatbot
                                      requests
  -----------------------------------------------------------------------

Do not paste secret values into issues, screenshots, or public
repositories. Configure production environment variables in the Render
service dashboard as well.

## 🚀 Deployment

RoamNest is configured for a hosted deployment on Render.

Before deploying:

1.  Push the latest code to GitHub.
2.  Set the build command to `npm install`.
3.  Configure the start command to match `package.json` (for example,
    `npm start` if a start script is defined, or `node app.js`).
4.  Add all required environment variables in Render.
5.  Verify MongoDB Atlas network access and credentials.
6.  Verify Cloudinary, Mapbox, and Gemini credentials.
7.  Test registration, login, listing CRUD, image uploads, maps,
    reviews, and AI search on the deployed URL.

Third-party API availability, quotas, model access, and hosting limits
can affect individual features.

## 🧪 Example AI Chatbot Workflow

1.  A user enters a natural-language request in the chatbot.
2.  The server sends the message to Gemini to extract supported search
    filters.
3.  The server builds a MongoDB query from those filters.
4.  MongoDB returns matching registered listings.
5.  The API returns the count and a limited set of listing details.
6.  The chatbot renders the results, including available images and
    property links.

The chatbot should only report listing details returned by the database.
If a search returns no results, check that the saved `location`,
`country`, and `price` fields match the requested filters.

## 🔒 Security Notes

-   Keep API keys, database credentials, and session secrets in
    environment variables.
-   Never commit `.env` or other files containing secrets.
-   Validate incoming form and API data on the server.
-   Protect write operations with authentication and authorization
    middleware.
-   Check resource ownership before editing or deleting listings.
-   Avoid exposing raw internal errors to end users in production.
-   Review cookie settings and HTTPS configuration for production
    deployment.
-   Apply sensible request limits and monitor third-party API usage.

## 🎓 Learning Outcomes

RoamNest demonstrates practical work with:

-   Full-stack web development using Node.js and Express.
-   Server-rendered interfaces with EJS.
-   MongoDB data modeling and Mongoose relationships.
-   CRUD operations and REST-style routes.
-   Authentication, authorization, sessions, and cookies.
-   Cloud image uploads with Cloudinary.
-   Geocoding and maps with Mapbox.
-   AI-assisted search with the Gemini API.
-   Form validation, middleware, and centralized error handling.
-   Deployment configuration and environment variables.


------------------------------------------------------------------------

```{=html}
<p align="center">
```
Made with ❤️ by `<b>`{=html}Lakhan Kumar Barnwal`</b>`{=html}
`<br>`{=html} `<b>`{=html}RoamNest --- Discover. Explore.
Stay.`</b>`{=html}
```{=html}
</p>
```
