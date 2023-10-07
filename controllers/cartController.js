const Cart = require('../models/cart');


const addToCart = async (req, res) => {
    try {
        const userId = req.userId
        
        const productId = req.body.productId;
        
        const quantity = req.body.quantity
        

        let userCart = await Cart.findOne({ user: userId})

        if (!userCart) {
            userCart = new Cart({ user:userId, items: [] });
        }

        const exsitingCartItem = userCart.items.find(item => item.product.toString() === productId);

        if (exsitingCartItem) {
            exsitingCartItem.quantity += quantity;
        } else {
            userCart.items.push({ product: productId, quantity });

        }

        await userCart.save();

        res.status(200).json({ message: "Item was added to cart!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Item was not added to cart"})
    }
}

//-----------------------------------------------------------------------------------

const removeFromCart = async (req, res) => {
    try {
        userId = req.userId;
        productId = req.params.productId;

        let userCart = await Cart.findOne({ user: userId });

        const itemToRemoveIndex = userCart.items.findIndex(
            (item) => item._id.toString() === itemId
        );

        if (itemToRemoveIndex === -1) {
            return res.status(404).json({ message: "Item not found in the cart" });
        }

        userCart.items.splice(itemToRemoveIndex, 1);

        await userCart.save();

        res.status(200).json({ message: "Item was removed from the cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Item was not removed from the cart" });
    }
};


const viewCart = async (req, res) => {
    try {
        const userId = req.userId;


        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            return res.status(404).json({ message: "User's cart not found" });
        }

        res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while retrieving the cart" });
    }
};


module.exports = { addToCart, removeFromCart, viewCart };