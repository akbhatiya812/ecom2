const User = require('../model/User');
const Product = require('../model/Product');
const bcrypt = require('bcryptjs');

module.exports.getLogin = (req,res) => {
    if(req.session.user){
        return res.redirect('back');
    }
    return res.render('login', {
        isAuthenticated: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin
    });
}

module.exports.postLogIn = async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.redirect('/user/log-in');
        }
        else if(await bcrypt.compare(user.password, req.body.password)){
            return res.redirect('/user/log-in');
        }
        else{
            req.session.isLoggedIn = true;
            req.session.user = user;

            if(user.email === "asbhatiya8888@gmail.com"){
                req.session.isAdmin = true;
            }else{
                req.session.isAdmin = false;
            }

            await req.session.save();
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
    }
    return res.redirect('back');
}

module.exports.postSignUp = async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.redirect('/user/log-in');
        }else if(req.body.password !== req.body.confirmPassword){
            return res.redirect('/user/log-in');
        }else{

            const cryptedPass = await bcrypt.hash(req.body.password,12);

            const newUser = new User({
                email: req.body.email,
                username : req.body.username,
                password: cryptedPass,
                cart: {
                    items: []
                }
            });
            await newUser.save();
            req.session.isLoggedIn = true;
            req.session.user = user;

            if(user.email === "asbhatiya8888@gmail.com"){
                req.session.isAdmin = true;
            }else{
                req.session.isAdmin = false;
            }
            
            await req.session.save();
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

module.exports.logout = (req,res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
            return res.send(500).send(err);
        }
        res.redirect('/');
    });

}