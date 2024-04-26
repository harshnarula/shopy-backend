import { Router } from "express";
import { products } from '../utils/static.mjs'
import { handleValidationErrors, validateProduct } from "../utils/productsValidator.mjs";
import { Product } from "../mongoose/schemas/product.mjs";

const router = Router();

router.get('/api/products-list', async (request, response) => {
    try {
        const products = await Product.find();
        response.status(200).json(products);
        console.log(products)

    } catch (error) {
        console.error('Error fetching products:', error);
        response.status(500).json({ error: 'Failed to fetch products' });
    }
});


router.post('/api/product', validateProduct, handleValidationErrors, async (request, response) => {
    try {
        const { products_img, products_name, products_desc, products_price, products_rating, products_category } = request.body;
        const newProduct = new Product({
            products_img,
            products_name,
            products_desc,
            products_price, 
            products_rating,
            products_category
        });

        await newProduct.save();
        return response.status(200).json({ message: 'Product added successfully' });

    } catch (error) {
        return response.status(500).json({ error: 'Failed to add product' });
    }
});


router.patch('/api/product', validateProduct, handleValidationErrors, async (request, response) => {
    try {
        const { id, ...updateData } = request.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return response.sendStatus(404);
        }
        return response.status(200).send("Product details updated");

    } catch (error) {
        return response.status(500).json({ error: 'Failed to update product details' });
    }
});

router.delete('/api/product', async (request, response) => {
    try {
        const productId = request.body.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        console.log(deletedProduct)

        if (!deletedProduct) {
            return response.status(404).send("Product not found");
        }
        return response.status(200).send("Product Deleted");

    } catch (error) {
        return response.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;