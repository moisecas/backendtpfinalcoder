const mongoose = require('mongoose')
 

const OrdersSchema = new mongoose.Schema({
    id: {type: Number,
        required: true
    },
    user: { type: String },
    products: { type: Array },
    total: { type: Number },
    status: { type: String },
    date: { type: Date },
    
},{
    timestamps: true // this will automatically add the createdAt and the updatedAt field for us
})

module.exports = mongoose.model('Orders', OrdersSchema) //nombre de la coleccion en la base de datos