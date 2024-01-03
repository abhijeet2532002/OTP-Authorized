const express = require('express');
const router = express.Router();
const { signIn, Home, signOut } = require('../controller/LoginController');
const passport = require('passport');

// Passport Local Authentication
router.get('/signUp', signIn);
router.get('/logout', signOut);
router.post('/login', passport.authenticate('local', { failureRedirect: '/user/signUp' }), Home);

// Passport Google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/signUp' }), Home);

// Passport Github Authentication
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/user/signUp' }), Home);

// Passport Facebook Authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user:email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/user/signUp' }), Home);

module.exports = router;