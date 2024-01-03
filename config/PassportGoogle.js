require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Student = require('../model/Student');
const crypto = require('crypto')

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.Google_callbackURL,
        passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            const student = await Student.findOne({ email: profile.emails[0].value });
            if (student) {
                return done(null, student);
            } else {
                const studentCreate = await Student.create({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, studentCreate);
            }
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;