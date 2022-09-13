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
    
},{
    timestamps: true // this will automatically add the createdAt and the updatedAt field for us
}) 

module.exports = mongoose.model('Products', ProductsSchema) //nombre de la coleccion en la base de datos