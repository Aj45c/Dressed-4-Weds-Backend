const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken} = require('../middleware/authMiddleware')


router.get('/', productController.showProducts); //once add in my server folder it will look like this "/products/"! 
//I almost put products so it would of looked// Update a product (requires admin access)

router.get('/:productId', productController.getProduct);


router.put('/:productId', verifyToken, productController.updateProduct);


router.delete('/:productId', verifyToken, productController.deleteProduct);

module.exports = router;
