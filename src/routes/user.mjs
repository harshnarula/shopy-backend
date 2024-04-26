import { Router } from "express";
import { data } from '../utils/static.mjs'
import { handleValidationErrors, validateUser } from "../utils/userValidator.mjs";
import passport from "passport";
import "../strategies/localstrategies.mjs"
import { User } from "../mongoose/schemas/user.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const router = Router();

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.username = decoded.username;
      next();
    });
  };


// router.get('/api/user-list', async (request, response) => {
//     try {
//         const userList = await User.find();

//         return response.status(200).json(userList);
//     } catch (error) {
//         return response.status(500).json({ error: 'Failed to fetch user list' });
//     }
// });


router.get('/api/user/details', verifyToken, async (req, res) => {
    try {

        const user = await User.findOne({ username: req.username }); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userDetails = {
            username: user.username,
            email: user.email,
            contactNo: user.contactNo,
        };

        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});



router.post('/api/user/login', passport.authenticate("local") ,async (request, response) => {
    const { username, password } = request.body
    const findUser = await User.findOne({ username })
    // console.log(findUser)
    const token = jwt.sign({ username: findUser.username  }, process.env.JWT_SECRET, { expiresIn: '1h' });

    response.status(200).json({ token: token });
})


router.post('/api/user/register', validateUser, handleValidationErrors, async (request, response) => {
    try {
        const { username, email, password, contactNo } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ username, email, password: hashedPassword, contactNo });

        await newUser.save();

        return response.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return response.status(500).json({ error: 'Failed to register user' });
    }
});



router.patch('/api/user/update', validateUser, handleValidationErrors, async (request, response) => {
    try {
        const { id, ...updateData } = request.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return response.sendStatus(404); // User not found
        }

        return response.status(200).send("User details updated");
    } catch (error) {
        return response.status(500).json({ error: 'Failed to update user details' });
    }
});


router.delete('/api/user/delete/:id', async (request, response) => {
    const userId = request.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return response.status(404).send("User not found");
        }

        return response.status(200).send("User Deleted");
    } catch (error) {
        console.error('Error deleting user:', error);
        return response.status(500).send("Failed to delete user");
    }
});


export default router;