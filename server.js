const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const {auth} = require('express-openid-connect');
const multer = require('multer');
const cors = require('cors');

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



//ejs view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//end ejs view engine setup

//method override init
app.use(methodOverride('_method'));


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use(userRoutes);
app.use('/post', postRoutes);


//endRoutes


app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), ()=>{
    console.log(`PORT: ${app.get('port')}`)
});