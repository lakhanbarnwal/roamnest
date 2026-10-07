# 🏡 RoamNest

> **A full-stack travel and property listing platform for discovering, listing, reviewing, and managing unique stays.**

RoamNest is a full-stack web application inspired by modern vacation rental and property discovery platforms. It allows users to explore properties, create and manage listings, upload images to the cloud, view property locations on interactive maps, submit reviews and ratings, and securely authenticate using session-based authentication.

The application is built using **Node.js, Express.js, MongoDB, Mongoose, EJS, Cloudinary, Mapbox, Passport.js, Bootstrap, and JavaScript**.

---

## 🌐 Live Project

**Live Demo:** Coming Soon

**GitHub Repository:**  
https://github.com/lakhanbarnwal/roamnest

---

# ✨ Features

## 🏠 Property Listing Management

RoamNest provides complete CRUD functionality for property listings.

- Create new property listings
- Browse all available listings
- View complete property details
- Edit existing listings
- Delete listings
- Upload property images
- Display price per night
- Store property location
- Store country information
- Associate listings with their owners
- Responsive property cards
- Indian currency formatting

---

## 🔎 Search & Property Discovery

Users can easily explore different types of properties through the discovery interface.

Available categories include:

- 🔥 Trending
- 🛏️ Rooms
- 🌆 Iconic Cities
- ⛰️ Mountains
- 🏰 Castles
- 🏊 Pools
- ⛺ Camping
- 🐄 Farms
- ❄️ Arctic

The category navigation is responsive and optimized for both desktop and mobile devices.

---

# 💰 Tax Display

RoamNest includes a tax-display feature that allows users to view additional GST information with property prices.

Example:

```text
₹5,000 / night
```

With tax information enabled:

```text
₹5,000 / night + 18% GST
```

The tax information can be toggled directly from the user interface.

---

# 🔐 Authentication

RoamNest implements secure user authentication using **Passport.js**.

Users can:

- Create a new account
- Login using username/password
- Logout securely
- Maintain login state using sessions
- Access protected routes only after authentication

Authentication is handled using:

- Passport.js
- Passport Local Strategy
- Express Session
- MongoDB
- Cookies

---

# 🛡️ Authorization

Authentication determines **who the user is**, while authorization determines **what the user is allowed to do**.

RoamNest implements authorization middleware to protect resources.

For example:

- Only authenticated users can create listings
- Only listing owners can edit their listings
- Only listing owners can delete their listings
- Only authorized users can perform protected actions
- Review operations are protected
- Unauthorized users cannot modify resources belonging to other users

Example authorization flow:

```text
User Request
      ↓
Authentication Check
      ↓
Authorization Check
      ↓
Validation
      ↓
Controller / Route Logic
      ↓
Database Operation
      ↓
Response
```

---

# 🍪 Sessions & Cookies

RoamNest uses **server-side sessions** to maintain user authentication.

When a user logs in:

```text
User Login
    ↓
Credentials Verified
    ↓
Session Created
    ↓
Session ID Stored in Cookie
    ↓
Browser Sends Cookie With Requests
    ↓
Server Identifies Logged-In User
```

Session features include:

- Persistent login sessions
- Session cookies
- Session-based authentication
- Secure session secret
- MongoDB-backed session storage
- Authentication state persistence
- Flash message support

Sensitive session configuration is stored using environment variables.

---

# 🗄️ MongoDB Session Store

Instead of relying only on the default in-memory session store, RoamNest can store sessions inside MongoDB.

This provides:

- Persistent sessions
- Better production reliability
- Session persistence after server restart
- Centralized session management

---

# ☁️ Cloud Image Upload

RoamNest uses **Cloudinary** for cloud-based property image management.

Users can upload property images without storing them permanently on the application server.

### Image Features

- Upload images from listing forms
- Store images on Cloudinary
- Save Cloudinary URLs in MongoDB
- Store image filenames/public identifiers
- Display cloud-hosted images
- Update listing images
- Manage images independently from application storage

Architecture:

```text
User Uploads Image
        ↓
      Multer
        ↓
Cloudinary Storage
        ↓
Cloudinary URL
        ↓
     MongoDB
        ↓
Displayed on Website
```

---

# 🗺️ Mapbox Integration

RoamNest integrates **Mapbox** to display property locations on an interactive map.

Map functionality includes:

- Interactive maps
- Property location visualization
- Map markers
- Listing-specific locations
- Marker interaction
- Location-based property visualization
- Responsive map interface

Basic architecture:

```text
Listing Location
       ↓
Geographic Data
       ↓
Mapbox
       ↓
Coordinates
       ↓
Interactive Map
       ↓
Property Marker
```

---

# ⭐ Reviews & Ratings

Users can share their experiences through the review and rating system.

Features include:

- Add reviews
- Submit ratings
- Display reviews
- Display rating information
- Associate reviews with listings
- Associate reviews with users
- Delete authorized reviews
- Protect review routes

Relationship:

```text
User
 │
 └──── writes ────→ Review
                       │
                       ↓
                    Listing
```

---

# 🔗 Database Relationships

RoamNest uses MongoDB and Mongoose relationships between different models.

```text
                 USER
                /    \
               /      \
            owns      writes
             ↓          ↓
         LISTINGS    REVIEWS
             │          │
             └──────────┘
                  ↓
            Property Data
```

The major models are:

### User Model

Stores information related to registered users and authentication.

### Listing Model

Stores:

- Title
- Description
- Price
- Location
- Country
- Image
- Owner
- Reviews
- Geographic information

### Review Model

Stores:

- Rating
- Comment
- Author
- Listing relationship

---

# ⚡ Form Validation

RoamNest implements both client-side and server-side validation.

Validation helps prevent invalid or incomplete information from being stored in the database.

The application uses:

- Joi validation
- Mongoose schema validation
- Bootstrap form validation
- Client-side JavaScript validation
- Express middleware

Validation flow:

```text
User Input
    ↓
Client-Side Validation
    ↓
Server Request
    ↓
Joi Validation
    ↓
Mongoose Validation
    ↓
MongoDB
```

---

# 🚨 Error Handling

The application includes centralized error handling.

Features include:

- Custom Express errors
- Async error handling
- Centralized error middleware
- User-friendly error pages
- Invalid route handling
- Database error handling
- Validation error handling

The project includes utility functions such as:

```text
utils/
├── ExpressError.js
└── wrapAsync.js
```

Error flow:

```text
Request
   ↓
Route Handler
   ↓
wrapAsync()
   ↓
Error Detected
   ↓
Express Error Middleware
   ↓
Custom Error Page
```

---

# 🔔 Flash Messages

RoamNest provides user feedback through flash messages.

Flash messages can notify users about:

- Successful login
- Successful logout
- Account registration
- Listing creation
- Listing updates
- Listing deletion
- Review creation
- Review deletion
- Authentication errors
- Authorization errors
- Validation errors

Example:

```text
Listing created successfully!
```

---

# 📱 Responsive Design

RoamNest provides a responsive user interface optimized for different screen sizes.

Supported layouts include:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📲 Mobile

Responsive features include:

- Responsive navbar
- Mobile hamburger menu
- Responsive listing cards
- Mobile-friendly property grid
- Horizontal category slider
- Responsive forms
- Responsive authentication pages
- Responsive maps
- Mobile-friendly filters

---

# 🧭 Navigation

The application includes a responsive navigation system.

Navigation functionality includes:

- Explore listings
- Search
- Create new listings
- Login
- Sign Up
- Logout
- Responsive hamburger navigation
- User-specific navigation controls

---

# 🛡️ Security

RoamNest follows multiple security practices.

Security features include:

- Environment variables for sensitive information
- Password-based authentication
- Session authentication
- Authentication middleware
- Authorization middleware
- Protected routes
- Server-side validation
- Database validation
- Secure cookies/session configuration
- Sensitive credentials excluded from Git
- Ownership verification

Sensitive information is stored inside `.env` rather than directly inside source code.

---

# 🔑 Environment Variables

Create a `.env` file inside the root directory.

Example:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
```

> ⚠️ **Never commit your actual `.env` file to GitHub.**

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 🧰 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS
- Font Awesome

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## Authentication & Sessions

- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session
- Connect Mongo / MongoDB Session Store
- Cookies

## Cloud & External Services

- Cloudinary
- Mapbox

## Validation

- Joi
- Mongoose Validation
- Client-Side Validation

## Development Tools

- VS Code
- Git
- GitHub
- npm
- Nodemon

---

# 🏗️ Project Structure

```text
RoamNest/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── starability-all.min.css
│   │
│   └── js/
│       ├── form_validation.js
│       └── map.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new_form.ejs
│   │   └── edit_form.ejs
│   │
│   └── user/
│       ├── login.ejs
│       └── signUp.ejs
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔄 CRUD Operations

RoamNest implements complete CRUD operations.

```text
CREATE
   ↓
Create a new property listing

READ
   ↓
Browse and view property listings

UPDATE
   ↓
Edit an existing property listing

DELETE
   ↓
Remove a property listing
```

Authorization is applied to update and delete operations so that only the appropriate owner can modify their property.

---

# ⚙️ Middleware

RoamNest uses Express middleware extensively.

Middleware is responsible for:

- Authentication
- Authorization
- Listing ownership verification
- Review authorization
- Request validation
- Session management
- Flash messages
- Static file handling
- Form parsing
- Method overriding
- Error handling
- Async error handling

This keeps route logic cleaner and improves code reusability.

---

# 🌐 MVC-Style Architecture

RoamNest follows an MVC-style project structure.

```text
             USER REQUEST
                  │
                  ↓
               ROUTES
                  │
                  ↓
             MIDDLEWARE
                  │
                  ↓
          APPLICATION LOGIC
                  │
          ┌───────┴───────┐
          ↓               ↓
       MODELS           VIEWS
          ↓               ↓
       MongoDB            EJS
```

This separation improves:

- Maintainability
- Scalability
- Code organization
- Reusability
- Debugging

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/lakhanbarnwal/roamnest.git
```

---

## 2. Navigate to the project directory

```bash
cd roamnest
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Configure environment variables

Create:

```text
.env
```

Add your:

- MongoDB connection string
- Session secret
- Cloudinary credentials
- Mapbox token

---

## 5. Start the application

Using Node.js:

```bash
node app.js
```

Or using Nodemon:

```bash
nodemon app.js
```

If a development script exists:

```bash
npm run dev
```

---

## 6. Open the application

Open:

```text
http://localhost:8080
```

in your browser.

---

# 🔃 Application Workflow

```text
                 ┌─────────────────┐
                 │      USER       │
                 └────────┬────────┘
                          │
                          ↓
                 ┌─────────────────┐
                 │     EXPRESS     │
                 │     ROUTES      │
                 └────────┬────────┘
                          │
                          ↓
                 ┌─────────────────┐
                 │   MIDDLEWARE    │
                 │                 │
                 │ Authentication  │
                 │ Authorization   │
                 │ Validation      │
                 └────────┬────────┘
                          │
                          ↓
                 ┌─────────────────┐
                 │ APPLICATION     │
                 │     LOGIC       │
                 └───────┬─────────┘
                         │
             ┌───────────┴────────────┐
             ↓                        ↓
       ┌──────────┐             ┌──────────┐
       │ MongoDB  │             │Cloudinary│
       └──────────┘             └──────────┘
             │
             ↓
       ┌──────────┐
       │   EJS    │
       │  Views   │
       └────┬─────┘
            │
            ↓
          USER
```

---

# 📸 Screenshots

## Home Page

Add your home page screenshot here.

```markdown
![Home Page](screenshots/home.png)
```

## Property Details

```markdown
![Property Details](screenshots/property-details.png)
```

## Map

```markdown
![Map](screenshots/map.png)
```

## Login

```markdown
![Login](screenshots/login.png)
```

## Sign Up

```markdown
![Sign Up](screenshots/signup.png)
```

---

# 🔮 Future Enhancements

Future versions of RoamNest may include:

- 💳 Online payment integration
- 📅 Property booking system
- ❤️ Wishlist / Favorites
- 👤 User profile dashboard
- 🏠 Host dashboard
- 📧 Email notifications
- 🔔 Real-time notifications
- 🔍 Advanced property search
- 📍 Location-based search
- 📅 Property availability calendar
- 🧾 Booking history
- 🔐 Social authentication
- 🛡️ Admin dashboard
- ✅ Property verification
- 🤖 AI-powered recommendations
- 💬 Real-time messaging between host and guest

---

# 🎯 Learning Outcomes

Building RoamNest provided practical experience with:

- Full-stack web development
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- RESTful routing
- CRUD operations
- Authentication
- Authorization
- Sessions
- Cookies
- Passport.js
- MongoDB relationships
- Middleware
- Cloudinary
- Image uploads
- Mapbox
- Maps and geolocation
- Joi validation
- Error handling
- Flash messages
- Responsive web design
- Git
- GitHub
- Environment variables
- Production-oriented application architecture

---

# 👨‍💻 Author

## Lakhan Kumar Barnwal

**B.Tech — Computer Science & Engineering (AI/ML)**

GitHub:  
https://github.com/lakhanbarnwal

LinkedIn:  
Add your LinkedIn profile URL here

Email:  
Add your professional email here

---

# ⭐ Support

If you like **RoamNest** or find this project useful, consider giving the repository a ⭐.

Your support is appreciated!

---

# 📄 License

This project was developed for **educational and portfolio purposes**.

You may add an open-source license such as the MIT License if you decide to distribute or allow reuse of the project.

---

<p align="center">
  Made with ❤️ by <b>Lakhan Kumar Barnwal</b>
</p>

<p align="center">
  <b>RoamNest — Discover. Explore. Stay.</b>
</p>