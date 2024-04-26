import { Router } from "express";
import { data, products } from "../utils/static.mjs"
import { Product } from "../mongoose/schemas/product.mjs";
import { User } from "../mongoose/schemas/user.mjs"; 
import { verifyToken } from "./user.mjs";

const router = Router();

router.get('/api/user/carts-list', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.username }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let products = [];
        for (let i = 0; i < user.carts.length; i++) {
            const product = await Product.findOne({ _id: user.carts[i] });
            if (product) {
                products.push(product);
            }
        }

        const cartDetails = {
            carts: products
        };

        res.status(200).json(cartDetails);
    } catch (error) {
        console.error('Error fetching user carts:', error);
        res.status(500).json({ error: 'Failed to fetch user carts' });
    }
});



router.post('/api/user/cart', verifyToken, async (req, res) => {
    try {
        const { username } = req;
        const { id } = req.body; 

        const user = await User.findOne({ username }).populate('carts');

        if (!user) {
            return res.status(400).send("No Such User");
        }

        const productExists = user.carts.some(cart => cart.id === id);
        if (!productExists) {
            const product = await Product.findById(id);
            if (product) {
                user.carts.push(product);
            }
        }

        await user.save();

        return res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ error: 'Failed to update cart' });
    }
});



router.delete('/api/user/cart', verifyToken, async (req, res) => {
    try {
        const { username } = req;
        const { id } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send("No Such User");
        }

        const index = user.carts.indexOf(id);

        if (index === -1) {
            return res.status(400).send("User doesn't have the product in cart");
        }

        user.carts.splice(index, 1);
        await user.save();

        return res.status(200).send("Product Deleted");
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete product from cart' });
    }
});





export default router;