const Product = require('../model/Product');


module.exports.home = (req,res) => {
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
    Product.find().then(products => {
        return res.render('home/home',{
            products : products,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            m1:m1,
            m2:m2
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    }) 
}

module.exports.getDetails = (req,res) => {
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
    const id = req.params.productId;
    Product.findById(id).then( product => {
        return res.render('home/productDetails',{
            prod: product,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            m1:m1,
            m2:m2
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    })
    
}