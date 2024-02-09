if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const engine = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressErrors = require('./utils/ExpressErrors')
const methodOverride = require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')
const mongoSanitize = require('express-mongo-sanitize');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

const MongoDBStore = require("connect-mongo");


//setting up variable for router files
const campgroundRoute = require('./routes/campgrounds.js')
const reviewRoute = require('./routes/reviews.js')
const userRoute = require('./routes/users.js')

//mongoose database set-up
// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

//connecting database to AWS cloud
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//database connection with error checking
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const app = express()

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) //joining ejs from the views directory


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(mongoSanitize({
    replaceWith: '_'
}));

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SECRET || 'secret'
    }
})

store.on("error", function (e) {
    console.log("Session Error", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: process.env.SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expiration for cookies -- 1000 milisecond, 60sec, 60 mins, 24 hours
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => { //using flash
    res.locals.currentUser = req.user; //allows us to initially check if the user is logged and if so who is logged in throughout all templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// app.get('/fakeuser', async (req, res) => {
//     const user = new User({ email: 'asdf@gmail.com', username: 'asdf' }) //creating User with an email and username
//     const registeredUser = await User.register(user, 'chicken') //User is registered with hashed password instead of 'chicken' as the password
//     res.send(registeredUser)
// })



app.use('/', userRoute)
app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/reviews', reviewRoute)


app.get('/', (req, res) => {
    res.render('campgrounds/home')
})


// Error Handling
app.all('*', (req, res, next) => {
    next(new ExpressErrors('Page not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Oh no, Something Went Wrong!'
    }
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

