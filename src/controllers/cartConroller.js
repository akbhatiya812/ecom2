const User = require('../model/User');
const Product = require('../model/Product');
const Order = require('../model/Order');


module.exports.addToCart = async (req,res) => {
    try{
        const {productId} = req.body;
        let qty = 1;
        const user = await User.findById('65dedd125717cc946af949c5');
        
        const cartItemIndex = user.cart.items.findIndex(item => String(item.productId) === productId );
        if(cartItemIndex !== -1){
            user.cart.items[cartItemIndex].qty += 1;
        }else{
            user.cart.items.push({productId, qty });
        }
        await user.save();
        // console.log("Product added to the cart");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports.getCartItems = async (req,res) => {

    try{

        const user = await User.findById('65dedd125717cc946af949c5').populate('cart.items.productId');
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
        
        return res.render('cart',{
            cart: cart,
            cartTotal : cartTotal,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        })

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updateQty = async (req,res) => {
    try{
        
        const {productId,quantity} = req.body;
        const user = await User.findById('65dedd125717cc946af949c5').populate('cart.items.productId', 'price');
        let cartTotal = 0;
        user.cart.items.map(item => {
            if(item.productId.id === productId){
                item.qty = quantity;
            }
            cartTotal += item.qty*item.productId.price
        })
        await user.save();
        // console.log(user.cart.items);
        res.json(cartTotal);
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.removeItem = async (req,res) => {
    const id = req.params.productId;
    const user = await User.findById('65dedd125717cc946af949c5');

    user.cart.items = user.cart.items.filter(item => String(item.productId) !== id);

    await user.save()

    return res.redirect('back');
}

module.exports.checkout = async (req,res) => {
    
    const userId = '65dedd125717cc946af949c5'
    const user = await User.findById(userId);

    if(user.cart.items.length == 0){
        return res.redirect('back');
    }

    return res.render('checkout');
}   

module.exports.orderNow = async (req,res) =>{
    try{   

        const {address, phone} = req.body; 
        
        const userId = '65dedd125717cc946af949c5'
        const user = await User.findById(userId).populate('cart.items.productId');
        
        const cartItems = user.cart.items.map(item => ({
            productId: item.productId,
            qty: item.qty
        }))

        const order = new Order({
            user: userId,
            products: cartItems,
            address,
            phone
        })
        await order.save();
        user.cart.items = [];

        await user.save();
        return res.status(200).re('thankyou');

    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server error!');
    }
}