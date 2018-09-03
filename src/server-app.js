import express from 'express';
import path from 'path';
import open from 'open';
 
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import apiRouters from './backend/routers/router';
let configDB = require('./backend/config/database.js');
import mongoose from 'mongoose';
mongoose.connect(configDB.url);

const port = 3000;
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text())
app.use(bodyParser.json());
require('./backend/config/passport/passport.js')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static("./dist"))
app.use(apiRouters);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

export default app;