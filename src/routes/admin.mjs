import { Router } from "express";
import { handleValidationErrors, validateAdmin } from "../utils/adminValidator.mjs";
import passport from "passport";
import "../strategies/localstrategies.mjs"
import { Admin } from "../mongoose/schemas/admin.mjs";
import bcrypt from 'bcrypt';


const router = Router();

// Route to retrieve the list of users
router.get('/api/admin', async (request, response) => {
    try {
        // Query the database to find all users
        const adminList = await Admin.find();

        // Send the list of users as a response
        return response.status(200).json(adminList);
    } catch (error) {
        // Handle any errors that occur during the database query
        return response.status(500).json({ error: 'Failed to fetch admin\'s detail' });
    }
});


router.post('/api/admin/login',(request, response) => {
    response.status(200).send("Admin Logged in successfully");
})


router.post('/api/admin/register', validateAdmin, handleValidationErrors, async (request, response) => {
    try {
        const { admin, password } = request.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new admin document using the Mongoose Admin model with the hashed password
        const newAdmin = new Admin({ admin, password: hashedPassword });

        // Save the new admin to the database
        await newAdmin.save();

        return response.status(200).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin:', error);
        return response.status(500).json({ error: 'Failed to register admin' });
    }
});



router.patch('/api/admin/update', validateAdmin, handleValidationErrors, async (request, response) => {
    try {
        const { id, ...updateData } = request.body;

        // Find the user by ID and update their details
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAdmin) {
            return response.sendStatus(404); // User not found
        }

        return response.status(200).send("Admin\'s details updated");
    } catch (error) {
        return response.status(500).json({ error: 'Failed to update admin details' });
    }
});


router.delete('/api/admin/delete/:id', async (request, response) => {
    const adminId = request.params.id;

    try {
        // Find the user by ID and delete it
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
            return response.status(404).send("Admin not found");
        }

        return response.status(200).send("Admin Deleted");
    } catch (error) {
        console.error('Error deleting admin:', error);
        return response.status(500).send("Failed to delete admin");
    }
});


export default router;