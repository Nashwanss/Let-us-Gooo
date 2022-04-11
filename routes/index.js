const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Activities = require("../models/activity");
const Wishlist = require("../models/wishListElement");
const User = require("../models/User");
const Profile = require("../models/profile");
const ObjectId = require('mongodb').ObjectID;

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

// Events
router.get("/events", ensureAuthenticated, async (req, res) => {
  const activities = await Activities.find({});
  //console.log(activities[0]);
  // console.log("rdgjdjgkd");
  res.render("events", {
    user: req.user,
    activities: activities,
    // title: "hello my friend",
  });
});

// Profile
router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    user: req.user,
  })
);

// Wish List
router.get("/wishlist", ensureAuthenticated, async (req, res) => {
  const curUser = await User.findById(req.user._id)
const profile = await Profile.find({user: curUser});
console.log("PROFILE", profile);

let activities = await Wishlist.find({profile: profile[0]}).populate('activity')
activities = activities.map((elt) => elt.activity);
//const activities = wlelements.map(async (wle) => await Activities.findById(wle.activity));
console.log("ACTIVITIES", activities);

//const activities = await Activities.find({});
  res.render("wishlist", {
    user: req.user,
    activities: activities
  })
});

router.post("/wishlist", express.json(), async (req,res)=>{
  //const user = await User.findById(req.body.userId);
  const profile = await Profile.find({user: ObjectId(`${req.body.userId}`)});
  //console.log(profile);
//  console.log(user);
  const activity = await Activities.findById(req.body.activityId);
 const newWishElement = new Wishlist({profile: profile[0], activity: activity });
  //console.log(req.body);
  newWishElement.save();

  console.log("New WL element: " + newWishElement);
  res.send("hello");
  
}
);


// Contact
router.get("/contact", ensureAuthenticated, (req, res) =>
  res.render("contact", {
    user: req.user,
  })
);

module.exports = router;
