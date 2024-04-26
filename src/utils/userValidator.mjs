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
export const validateUser = (request, response, next) => {
    const { username, password, email, contactNo } = request.body;
    
    // Custom validation logic
    if(username !== undefined){
        if (username === 'admin') {
            return response.status(400).json({ error: 'Username cannot be "admin"' });
        }
    
        if (!username || username.trim() === '') {
            return response.status(400).json({ error: 'Username cannot be empty' });
        }
        
    
        if (!/^[a-zA-Z\d]+$/.test(username) || /^\d+$/.test(username) || /^[a-zA-Z]+$/.test(username)) {
            return response.status(400).json({ error: 'Username must contain only letters and numbers' });
        }
    }
    
    if(password !== undefined){
        if(!password || password.trim() === ''){
            return response.status(400).json({ error: 'Password cannot be empty!' });
        }
    
        if(password === username){
            return response.status(400).json({ error: 'Password cannot be as same as username' });
        }
    
        if(!/^([^\s])([\W\w])([^\s]){6,16}$/.test(password)){
            return response.status(400).json({ error: 'Password should have atleast 8 characters' });
        }
    }
    if(email !== undefined){
        if(!email || email.trim() === ''){
            return response.status(400).json({ error: 'Email cannot be empty' });
        }
        if(!/^([a-z-A-Z-0-9_]+)@([a-zA-Z]+)[.]([a-z-A-Z]+)$/.test(email)){
            return response.status(400).json({ error: 'Invalid Email Format' });
        }
    }

    if(contactNo !== undefined){
        if(!contactNo || contactNo.trim() === ''){
            return response.status(400).json({ error: 'Contact No cannot be empty!' });
        }
        if(!/^[0-9]*$/.test(contactNo)){
            return response.status(400).json({error : 'Contact No should only be in Numbers'})
        }
        if(contactNo.length > 10){
            return response.status(400).json({error : 'Contact No should have only 10 Numbers'})
        }
    }
    
    next();
};
