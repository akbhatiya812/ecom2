const User = require('../model/User');
const Order = require('../model/Order');


module.exports.addToCart = async (req,res) => {
    try{
        const {productId} = req.body;
        let qty = 1;
        const user = await User.findById(req.user._id);
        
        const cartItemIndex = user.cart.items.findIndex(item => String(item.productId) === productId );
        if(cartItemIndex !== -1){
            user.cart.items[cartItemIndex].qty += 1;
        }else{
            user.cart.items.push({productId, qty });
        }
        await user.save();
        req.flash('success', 'product added to cart');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports.getCartItems = async (req,res) => {

    try{
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
        const user = await User.findById(req.user._id).populate('cart.items.productId');
        let cartTotal = 0;
        const cart = user.cart.items.map( item => {
            cartTotal += item.qty*item.productId.price
            return ({
                productId : item.productId._id,
                productTitle : item.productId.title,
                productPrice : item.productId.price,
                productImg : item.productId.img, 
                qty: item.qty
            })
        }) ;
        
        return res.render('cart/cart',{
            cart: cart,
            cartTotal : cartTotal,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            m1:m1,
            m2:m2
        })

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updateQty = async (req,res) => {
    try{
        
        const {productId,quantity} = req.body;
        const user = await User.findById(req.user._id).populate('cart.items.productId', 'price');
        let cartTotal = 0;
        user.cart.items.map(item => {
            if(item.productId.id === productId){
                item.qty = quantity;
            }
            cartTotal += item.qty*item.productId.price
        })
        await user.save();
        // console.log(user.cart.items);
        req.flash('success', 'qty updated');
        return res.json(cartTotal);
    }catch(err){
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.removeItem = async (req,res) => {
    try{
        const id = req.params.productId;
        const user = await User.findById(req.user._id);

        user.cart.items = user.cart.items.filter(item => String(item.productId) !== id);

        await user.save()
        req.flash('success', 'Product Removed from cart');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
    }
    
}

module.exports.checkout = async (req,res) => {
    try{
        let m1 = req.flash('error');
        let m2 = req.flash('success');
        if (m1.length > 0) {
            m1 = m2[0];
        } else {
            m1 = null;
        }
        if (m2.length > 0) {
            m2 = m1[0];
        } else {
            m2 = null;
        }
        const user = await User.findById(req.user._id);

        if(user.cart.items.length == 0){
            req.flash('error', 'There is nothing in cart');
            return res.redirect('back');
        }
        return res.render('cart/checkout',{
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            m1:m1,
            m2:m2
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}   

module.exports.orderNow = async (req,res) =>{
    try{   

        const {address, phone} = req.body; 
    
        const user = await User.findById(req.user._id);
        
        const cartItems = user.cart.items.map(item => ({
            productId: item.productId,
            qty: item.qty
        }))

        const order = new Order({
            user: user._id,
            products: cartItems,
            address,
            phone
        });
        
        await order.save();
        user.cart.items = [];

        await user.save();
        req.flash('success', 'Order Created successfully!');
        return res.status(200).re('cart/thankyou',{
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });

    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server error!');
    }
}