const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const PORT = 8000;

//.env connection
require('dotenv').config();

// init express app
const app = express();
app.use(cors());

//db connection
require('./db/connection');




//require routes
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const authRoutes = require('./routes/authRoute');


//ejs view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//end ejs view engine setup

//method override init
app.use(methodOverride('_method'));

//Session init
app.use(session({
    secret: 'SeiROOCKSS!',
    resave: false,
    saveUninitialized: true
}));

//passport init Local Strategy
//require('./config/passport');
//passport init JWT strategy
require('./config/passJWT');
//Passport init
app.use(passport.initialize());
app.use(passport.session());

//json forms and such middleware init
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use(userRoutes);
app.use('/post', postRoutes);
app.use(authRoutes);

//I need a signup route here to create the user in the db
//go to authRoute.js to do this and move the route below to it.
//this is the login route I need to set up passport local and save in DB
// app.use('/login', (req, res) => {
//     console.log(req.body)
//     console.log('login route hit')
//     res.send({
//         token: "test123"
//     });
// });


 


//endRoutes


app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), ()=>{
    console.log(`PORT: ${app.get('port')}`)
});