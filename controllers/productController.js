const Product = require('../models/product');
//------------------------------------------------------------------------------------
const createProduct = async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        const product = new Product({
            name,
            price,
            image,
            description,
        })

        await product.save();

        res.status(200).json({message: "Product created"})
    
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new product' });
    }

}

//------------------------------------------------------------------------------------
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {new: true});

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the product' });
    }
};

//-----------------------------------------------------------------------------------------------------------------
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the product' });
    }
};
//------------------------------------------------------------------------------------
const showProducts = async (req, res) => {
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
};

//------------------------------------------------------------------------------------

const getProduct = async (req, res) => {
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
};

//---------------------------------------------------------------------------------------


module.exports = { showProducts, getProduct, deleteProduct, updateProduct,createProduct };