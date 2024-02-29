module.exports = (req,res,next) => {
    if(!req.session.isLoggedIn || req.session.isLoggedIn === false){
        return res.redirect('/user/log-in');
    }
    if(req.session.user.email !== "admin@admin.com"){
        return res.redirect('/user/log-in');
    }
    next();
}
