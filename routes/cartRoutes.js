const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');


router.use(verifyToken);

router.post('/add-to-cart', cartController.addToCart);



module.exports = router;
