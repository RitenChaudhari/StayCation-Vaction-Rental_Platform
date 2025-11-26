const express = require("express");
const app = express();
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
        .get(wrapAsync(listingController.index))
        .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

//NEW ROUTE
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
        .get(wrapAsync(listingController.showListings))
        .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListings))
        .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListings));

//Edit ROUTE:
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;