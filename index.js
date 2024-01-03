require('dotenv').config();
const express = require('express');
const db = require('./config/MongooseConfig');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const passport = require('passport');
const passwordLocal = require('./config/PassportLocal');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo');
const passportGoogle = require('./config/PassportGoogle');
const passportGithub = require('./config/PassportGithub');
const passportFacebook = require('./config/PassportFacebook');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Static file or view file
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: "abhijeet",
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (86400)
    },
    store: new mongoStore({
        mongoUrl: "mongodb://localhost:27017/TestTopics",
        autoRemove: 'disabled'
    }, (err) => {
        console.log("error found during mongostore", err);
        return;
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAunthenticatedUser)

app.use('/', require('./router/MainRouter'));

app.listen(port, () => {
    console.log("Our project is running on port no ", port);
});