const express = require('express');
const app = express();
const port = 8000;

const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/mongoose');
const User = require('./model/User');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGOOSE_URL,
    collection: 'sessions'
})

app.use(express.urlencoded());
app.use(session({
    secret: 'secret Key',
    resave: false,
    saveUninitialized : false,
    store: store

}))

app.use(async (req,res,next) => {
    if(!req.session.user){
        return next();
    }
    try{
        const user = await User.findById(req.session.user._id);
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})


app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views', 'src/view');

app.use('/', require('./routes/index'));


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }
})
