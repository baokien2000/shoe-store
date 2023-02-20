import mongoose from "mongoose";

const Schema = mongoose.Schema({
    brand: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },

    imageUrl: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    sale: {
        type: Number,
        require: true,
    },
    rate: {
        type: Number,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    size: {
        type: Array,
        require: true,
    },
    cart: {
        type: Number,
        require: true,
    },

}, { timestamps: true })
export const ShoesModel = mongoose.model("Shoes", Schema)
// id: 2,
// brand: 'Vans',
// name: 'Vans Authentic DIY HC Lemon Chrome',
// imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn0a4uuc1ae-4.jpg',
// price: 6.31,
// sale: 17,
// rate: 5,
// color: 'Yellow',
// size: [36, 37, 38, 40, 41],
// cart: 0