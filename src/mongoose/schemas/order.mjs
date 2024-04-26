const orderSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 1 // Assuming default quantity is 1
    },
    razorpay_order_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    razorpay_payment_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    razorpay_signature: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

export const Order = mongoose.model("Order", orderSchema);