const dotenv = require('dotenv');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

dotenv.config();

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));

module.exports = passport;