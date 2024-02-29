const Product = require('../model/Product');


module.exports.home = (req,res) => {
    Product.find().then(products => {
        return res.render('home',{
            products : products,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    }) 
}

module.exports.getDetails = (req,res) => {
    const id = req.params.productId;
    Product.findById(id).then( product => {
        return res.render('productDetails',{
            prod: product,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    })
    
}