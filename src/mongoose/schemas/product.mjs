import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    products_img : {
        type: mongoose.Schema.Types.String,
        required: true     
    },
    products_name : {
        type: mongoose.Schema.Types.String,
        required: true,
        options: {
            min: 5,
            max: 25
        }
    },
    products_desc : {
        type: mongoose.Schema.Types.String,
        options: {
            min: 0,
            max: 200
        }
    },
    products_price : {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    products_rating : {
        type: mongoose.Schema.Types.Number,
        options: {
            min: 1,
            max: 5
        }
    },
    products_category : {
        type: mongoose.Schema.Types.String,
        required: true,
        options: {
            min: 5,
            max: 25
        }
    },
});

export const Product = mongoose.model("Product", productSchema);