const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

// Events
router.get('/events', ensureAuthenticated, (req, res) =>
  res.render('events', {
    user: req.user
  })
);

// Profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

// Wish List
router.get('/wishlist', ensureAuthenticated, (req, res) =>
  res.render('wishlist', {
    user: req.user
  })
);

// Contact
router.get('/contact', ensureAuthenticated, (req, res) =>
  res.render('contact', {
    user: req.user
  })
);





module.exports = router;
