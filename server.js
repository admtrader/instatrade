const express = require('express');
const path = require('path');
const app = express();
const mehtodOverride = require('method-override');
require('./db/connection');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const PORT = 8000;

//ejs view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//end ejs view engine setup

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);


//endRoutes


app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), ()=>{
    console.log(`PORT: ${app.get('port')}`)
});