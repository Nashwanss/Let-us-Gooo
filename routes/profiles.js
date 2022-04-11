const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile").Profile;
const User = require("../models/User");

// router.put('/edit',  )

router.post("/new", async (req, res) => {
  console.log(req.body);

  let newProfileObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    location: req.body.location,
    picture: req.body.picture,
  };

  // console.log(newProfileObject)

  const newProfile = new Profile(newProfileObject);

  try {
    await newProfile.save();
    console.log(newProfile);

    const currentUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { profile: newProfile }
    );
    console.log(currentUser);

    res.redirect("/events");
  } catch (err) {
    console.log(err);
    res.redirect("/profile");
  }
});

module.exports = router;
