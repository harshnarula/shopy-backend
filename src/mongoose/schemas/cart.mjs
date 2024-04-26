import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product_img : {
        type: mongoose.Schema.Types.String,
        required: true     
    },
    product_name : {
        type: mongoose.Schema.Types.String,
        required: true,
        options: {
            min: 5,
            max: 25
        }
    },
    product_desc : {
        type: mongoose.Schema.Types.String,
        options: {
            min: 0,
            max: 200
        }
    },
    product_price : {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    product_rating : {
        type: mongoose.Schema.Types.Number,
        options: {
            min: 1,
            max: 5
        }
    },
    product_category : {
        type: mongoose.Schema.Types.String,
        required: true,
        options: {
            min: 5,
            max: 25
        }
    },
});

export const Cart = mongoose.model("Cart", cartSchema);