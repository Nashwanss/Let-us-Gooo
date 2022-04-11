const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Activities = require("../models/activities");

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
  console.log(activities[0]);
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
router.get("/wishlist", ensureAuthenticated, (req, res) =>
  res.render("wishlist", {
    user: req.user,
  })
);

// Contact
router.get("/contact", ensureAuthenticated, (req, res) =>
  res.render("contact", {
    user: req.user,
  })
);








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
