const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UsersSchema = new mongoose.Schema({
    id: {type: Number, 
        
    },
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

UsersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
}

UsersSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password); //comparar contraseñas 
}

module.exports = mongoose.model('Users', UsersSchema) //nombre de la coleccion en la base de datos