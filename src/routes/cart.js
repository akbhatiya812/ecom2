const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartConroller');

router.post('/add-to-cart', cartController.addToCart );
router.get('/get-cart-items', cartController.getCartItems );
router.post('/updateQuantity', cartController.updateQty);
router.get('/remove-item/:productId', cartController.removeItem);
router.get('/checkout', cartController.checkout);
router.post('/order-now', cartController.orderNow);

module.exports = router;