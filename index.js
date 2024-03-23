if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require("connect-mongo");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');
const leaveRouter = require('./routes/leave');
const {User} = require('./models/user');

const app = express();
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hr-management';
const DB_USERNAME = encodeURIComponent(process.env.DB_USERNAME)
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@hr-management.aw4qonc.mongodb.net/hr-management`;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const secret = process.env.SECRET || 'thisissecret';
const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionOption = {
    store,
    name: 'session',
    secret: 'thisisasecret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use('/user', userRouter);
app.use('/employee', employeeRouter);
app.use('/leave', leaveRouter);

app.get('/', (req, res) => {
    res.send('HR-Management-App');
});

app.listen(3000, () => {
    console.log('Serve at port 3000');
});