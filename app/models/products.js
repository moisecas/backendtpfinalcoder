const mongoose = require('mongoose') 

const ProductsSchema = new mongoose.Schema({
    id: {type: Number,
        required: true
    },
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    stock: { type: Number },
    status: { type: String },
    date: { type: Date },
    
},{
    timestamps: true // this will automatically add the createdAt and the updatedAt field for us
})