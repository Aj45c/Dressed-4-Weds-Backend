const router = express.Router();
const Product = require('../models/product');

//------------------------------------------------------------------------------------
router.get('/products', async (req, res) => {
    try {

        const products = await Product.find();

        if(!products) {
            return res.status(400).json({ error: "No products found"})
        }

        res.status(200).json(products)

    } catch (error) {
            console.error(error)

            res.status(500).json({ error: "Couldn't find products"});
    }
});

//------------------------------------------------------------------------------------

router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId);

        if(!product) {
            return res.status(400).json({ error: "No product found"})
        }

        res.status(200).json(product)

    } catch (error) {
            console.error(error)

            res.status(500).json({ error: "Couldn't get product details"});
    }
});

//---------------------------------------------------------------------------------------

router.post('/products/:productId/to-cart', async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId);

    } catch (error){
        console.error(error)
        res.status(500).json( {error: "Couldn't add product to cart"})
    }
});


module.exports = router;