const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    console.log(res.locals.OriginalUrl);
    req.flash("error", "Please Login First");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveredirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewOwner = async (req, res, next) => {
  try {
    const { id, review_id } = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.findById(review_id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
      if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not Authorised to delete this review");
        return res.redirect(`/listings/${id}`);
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
