// Importing required modules
import express from "express";
import mongoose, { mongo } from "mongoose";
import userRouter  from './routes/user.mjs';
import productsRouter from './routes/products.mjs'
import cartRouter from './routes/cart.mjs';
import adminRouter from './routes/admin.mjs'
import passport from 'passport'
import session from 'express-session';
import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
// import { Order } from './order.mjs';

// Creating an Express application
const app = express();


mongoose.connect("mongodb://localhost/shopy_db")
.then(() => console.log('Connected to the database'))
.catch((err) => console.log(`Error: ${err}`))

app.use(express.json())
app.use(session({
    secret: 'hash',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static('src/public'))

dotenvConfig();

const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});


// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors());

app.use(adminRouter);
app.use(userRouter);
app.use(productsRouter);
app.use(cartRouter);

