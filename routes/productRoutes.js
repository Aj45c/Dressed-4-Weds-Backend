const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.showProducts); //once add in my server folder it will look like this "/products/"! 
//I almost put products so it would of looked like this "/products/products" which doesn't look right at all

router.get('/:productId', productController.getProduct);

module.exports = router;
