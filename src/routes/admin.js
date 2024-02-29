const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/add-product', adminController.addProductPage);
router.post('/addProduct', adminController.addProduct);
router.get('/update-product/:productId', adminController.updateProductPage);
router.get('/delete-product/:productId', adminController.deleteProduct);
router.post('/updateProduct', adminController.updateProduct);
router.get('/orders', adminController.getOrders);


module.exports = router;