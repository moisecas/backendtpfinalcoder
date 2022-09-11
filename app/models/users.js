const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
},{
    timestamps: true // this will automatically add the createdAt and the updatedAt field for us 
}) // timestamps: true => createdAt, updatedAt (mongoose) 

module.exports = mongoose.model('Users', UsersSchema) //nombre de la coleccion en la base de datos