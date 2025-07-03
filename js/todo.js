import { Schema, model } from "mongoose";

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", //reference to the User model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
});

const Product = model("Product", productSchema);

export default Product;