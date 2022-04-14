const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Activities = require("../models/activity");
const Wishlist = require("../models/wishListElement");
const User = require("../models/User");
const Profile = require("../models/Profile").Profile;
const ObjectId = require('mongodb').ObjectID;

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

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
const profile = curUser.profile

console.log(profile)

console.log("PROFILE", profile);

let activities = await Wishlist.find({profile: profile}).populate('activity')
activities = activities.map((elt) => {
  wlElt = elt.activity
  wlElt.wlid = elt.id
  return wlElt
});
//const activities = wlelements.map(async (wle) => await Activities.findById(wle.activity));
console.log("ACTIVITIES", activities);

//const activities = await Activities.find({});
  res.render("wishlist", {
    user: req.user,
    activities: activities
  })
});

router.post("/wishlist", express.json(), async (req,res)=>{

  const profile = req.user.profile

  const activity = await Activities.findById(req.body.activityId);
  const newWishElement = new Wishlist({profile: profile, activity: activity });
  
  newWishElement.save();

  console.log("New WL element: " + newWishElement);
  res.json({msg: "hello"});
  
}
);


// Contact
router.get("/contact", ensureAuthenticated, (req, res) =>
  res.render("contact", {
    user: req.user,
  })
);

router.delete("/wishlist/:id", async (req, res) => {
  const id = req.params.id;
  console.log("AAAAAAAAAA",req.params)
  const wishlistElement = await Wishlist.findById(id);
 
 
 try{
  await wishlistElement.remove();
  res.json({ msg: "Wishlist element removed" });

 }catch(e){
  res.json({ error: e });
}
});







// // Check the profile if exist::::::>

// router.get('/',(req, res) => {

//   res.render('welcome')

//   }) 
  

//   const accessProfile = async (req, res) => {
//     profile = await checkForProfile (req.user.profile._id)
//     res.render('dashboard' , {
//       user : req.user , 
//       profile : profile
//     });
//   }
  
//   router.get('/dashboard' , ensureAuthenticated, (req, res) => {
// /*
      
//   user = User.findById(req.user.id)

//   const checkForProfile = (profileId) => {
//     return Profile.findById(profileId)
//   }
    
//   profile = checkForProfile(User.profileId)

//   if profile === undefined
//     render the profile form
//   else
//     render welcome view
//   end
// */

//     if(!req.user.profile) {
//       res.render('dashboard', {
//         user : req.user
//       });
//     }else{
//       // fill the form to have a profile
//       res.render('createAProfile')
//       //accessProfile(req,res);
//     }
//   })



module.exports = router;
