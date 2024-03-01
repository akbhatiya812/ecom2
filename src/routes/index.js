const express = require('express');
const router = express.Router();
router.use(express.json()); 
const homeController = require('../controllers/homeController');

const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

router.get('/', homeController.home);
router.get('/product/:productId', homeController.getDetails);



router.use('/admin', isAdmin ,require('./admin'));
router.use('/user', require('./user'));
router.use('/cart', isAuth, require('./cart'));
router.use('/', (req,res) => {
    return res.status(404).render('e404');
})


module.exports = router;