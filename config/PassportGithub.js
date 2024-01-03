const dotenv = require('dotenv');
const passport = require('passport');
const GithubStratgey = require('passport-github2').Strategy;
const crypto = require('crypto');
const Student = require('../model/Student');

dotenv.config();

passport.use(new GithubStratgey({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
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
))

module.exports = passport;