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
export const validateAdmin = (request, response, next) => {
    const { admin, password} = request.body;
    
    // Custom validation logic
    if(admin !== undefined){
        // if (admin === 'admin') {
        //     return response.status(400).json({ error: 'Username cannot be "admin"' });
        // }
    
        if (!admin || admin.trim() === '') {
            return response.status(400).json({ error: 'admin\'s name cannot be empty' });
        }
        
    
        if (!/^[a-zA-Z\d]+$/.test(admin) || /^\d+$/.test(admin) || /^[a-zA-Z]+$/.test(admin)) {
            return response.status(400).json({ error: 'admin\'s name must contain only letters and numbers' });
        }
    }
    
    if(password !== undefined){
        if(!password || password.trim() === ''){
            return response.status(400).json({ error: 'admin\'s password cannot be empty!' });
        }
    
        if(password === admin){
            return response.status(400).json({ error: 'admin\'s password cannot be as same as admin\'s name' });
        }
    
        if(!/^([^\s])([\W\w])([^\s]){6,16}$/.test(password)){
            return response.status(400).json({ error: 'Password should have atleast 8 characters' });
        }
    }
    next();
};
