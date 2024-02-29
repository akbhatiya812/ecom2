const Product = require('../model/Product');
const Order = require('../model/Order');


module.exports.addProductPage = (req,res) => {
    Product.find().then(products => {
        return res.render('admin/addProduct',{
            products : products,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    })
}

module.exports.addProduct = (req,res) => {
    const newProuct = new Product({
        title : req.body.title,
        desc : req.body.desc,
        price: req.body.price,
        img: req.body.img
    });
    newProuct.save().then( savedProduct => {
        // console.log('product saved successfully');
        return res.redirect('back');
    }).catch(err => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    })
}

module.exports.updateProductPage = (req,res) => {
    const id = req.params.productId;
    Product.findById(id).then( product => {
        return res.render('admin/editProduct',{
            product: product,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    }).catch(err => {
        return res.status(500).send('Internal Server error',err);
    })
}

module.exports.updateProduct = async (req,res) => {
    try {
        const productId = req.body.productId;
        const updatedProductData = {
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            price: req.body.price
        };

        // Find the product by ID and update its fields
        let product = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // console.log('Product updated successfully');
        return res.redirect('back');
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports.deleteProduct = (req,res) => {
    const id = req.params.productId;
    Product.findByIdAndDelete(id).then(() => {
        // console.log("Product Removed successfully");
        return res.redirect('back');
    }).catch(err => {
        return res.status(500).send("Internal Server Error!");
    })
}

module.exports.getOrders = async (req,res) => {
    try{
        const orders = await Order.find().populate('products.productId').populate('user','username');
        orders.forEach(order => {
            let orderAmount = 0;
            order.products.forEach(product => {
                orderAmount += product.productId.price * product.qty;
            });
            order.orderAmount = orderAmount;
        });
        return res.render('admin/orders', {
            orders: orders,
            isAuthenticated: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        })
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
}