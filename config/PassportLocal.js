const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../model/Student');
const passportGoogle = require('./PassportGoogle');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {
        try {
            const student = await Student.findOne({ email: email });
            console.log(student);
            if (!student || (student.password != password)) {
                console.log("error password");
                return done(null, false);
            }
            return done(null, student);
        } catch (err) {
            return res.json(err);
        }
    }
));

passport.serializeUser(function (student, done) {
    done(null, student.id);
});

passport.deserializeUser(async function (id, done) {
    const student = await Student.findById(id);
    return done(null, student);
});

// cheak the user Authentication
passport.cheakAuthentication = function (req, res, next) {
    // if user signed in
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({
        mesaage: "check authentication function"
    });
}

passport.setAunthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    return next();
}

module.exports = passport;