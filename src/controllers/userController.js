const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports.getLogin = (req,res) => {
    let m1 = req.flash('error');
    let m2 = req.flash('success');
    if (m1.length > 0) {
        m1 = m1[0];
    } else {
        m1 = null;
    }
    if (m2.length > 0) {
        m2 = m2[0];
    } else {
        m2 = null;
    }  
    if(req.session.user){
        return res.redirect('back');
    }
    return res.render('user/login', {
        isAuthenticated: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        m1:m1,
        m2:m2
    });
}

module.exports.postLogIn = async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            req.flash('error',"Incorrect Email");
            return res.redirect('/user/log-in');
        }else{
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result === false){
                req.flash('error',"Incorrect Password");
                return res.redirect('/user/log-in');
            }

            req.session.isLoggedIn = true;
            req.session.user = user;

            if(user.email === "admin@admin.com"){
                req.session.isAdmin = true;
            }else{
                req.session.isAdmin = false;
            }

            await req.session.save();
            req.flash('success',"Logged in successfully");
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
            req.flash('error',"Email is already present");
            return res.redirect('/user/log-in');
        }else if(req.body.password !== req.body.confirmPassword){
            req.flash('error',"Password Does not match");
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

            if(req.body.email === "admin@admin.com"){
                req.session.isAdmin = true;
            }else{
                req.session.isAdmin = false;
            }

            await req.session.save();
            req.flash('success',`Welcome ${req.body.username}`);
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
        return res.redirect('/');
    });

}