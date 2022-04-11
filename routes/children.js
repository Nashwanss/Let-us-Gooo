const express = require("express");
const router = express.Router();
const Child = require("../models/Child").Child;
const Profile = require("../models/Profile").Profile;
const User = require("../models/User");

// router.post("/new", async (req, res) => {
//     // console.log(req.body);
//     // console.log(req.user.prfile);
//     const currentProfile = await Profile.findById(req.user.profile._id);
//     let newChildRecord = {
//       childName: req.body.childName,
//       childAge: req.body.childAge,
//       profile : currentProfile
//     };
//     // console.log(newChildRecord);
//     const newChild = new Child(newChildRecord);
//         // console.log(currentProfile);
//     try {
//       console.log(req.user.profile);

//       await newChild.save();

//       res.redirect("/events");
//     } catch (err) {
//       console.log(err);
//       res.redirect("/dashboard");
//     }
// });





router.post("/new", async (req, res) => {
  // console.log(req.body)

    const newChildRecord = new Child({
      childName: req.body.childName,
      childAge: req.body.childAge,
    });
    // console.log(newChildRecord);
    // console.log(req.user.profile._id);
    const newChild = new Child(newChildRecord);

  try {
    await newChild.save();
    let b = await Profile.findById(req.user.profile._id)
    console.log(b);
    
    await Profile.findOneAndUpdate(
      { _id: req.user.profile._id },
      {$push: {children: newChild._id }}
    );

    // console.log(newChild);
    // console.log(req.user);


    res.redirect("/events");
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

module.exports = router;
