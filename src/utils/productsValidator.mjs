// validationMiddleware.js
import { validationResult } from 'express-validator';

// Middleware function to handle validation errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Middleware function to validate username
export const validateProduct = (request, response, next) => {
    const { products_img, products_name, products_desc, products_price, products_rating } = request.body;
    
    // Custom validation logic
    if(products_img !== undefined){
        if (!products_img || products_img.trim() === '') {
            return response.status(400).json({ error: 'Image is Mandatory for the product' });
        }   
    }
    
    if(products_name !== undefined){
        if(!products_name || products_name.trim() === ''){
            return response.status(400).json({ error: 'Products name cannot be empty!' });
        }
    
        if(products_name.length > 20){
            return response.status(400).json({ error: 'Products name should not exceed 20 characters' });
        }
    
    }

    if(products_desc !== undefined){
        if(products_desc.length > 200){
            return response.status(400).json({ error: 'Products desc should be short!' });
        }
    }

    if(products_price !== undefined){
        if(products_price === 0){
            return response.status(400).json({ error: 'Products will get selled without sales!' });
        }

        if(products_price > 500000){
            return response.status(400).json({ error: 'Products is expensive won\'t get selled!' });
        }
        if(!/^[\d]+$/.test(products_price)){
            return response.status(400).json({ error: 'Products is selled by priced Nigga!' });
        }
    }

    if(products_rating !== undefined){
        if(products_rating > 5 || products_rating <= 0 || !Number.isInteger(products_rating) ){
            return response.status(400).json({ error: 'Rate the product under 1 to 5 scale' });
        }
    }   
    
    next();
};
