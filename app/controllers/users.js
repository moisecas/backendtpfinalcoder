const { request } = require('express')
const {httpError} = require('../helpers/handleError') // importamos el manejador de errores
//conecto con mi db
const userModel = require('../models/users') // importo el modelo de datos de mi coleccion


const  getItems= async (req,res)=>{
    try {
        const listAll = await userModel.find({}) // busco todos los registros de la coleccion
        res.send({data:listAll}) // envio la respuesta al cliente
    } catch (e) {
        httpError(res,e) // si hay un error lo manejamos con el manejador de errores
        
    }
}

const getItem= async (req,res)=>{
    //buscar un registro por id userModel id
    const id = toString (req.params.id) //convierto el id a entero
    const user = await userModel.findOne({id}) // busco un registro por id
    res.send({user}) // envio la respuesta al cliente 
   
   
}

const  createItem= async (req,res)=>{
    try {
        const {name, age,email, password} = req.body
        const resDetail = await userModel.create({name, age,email, password}) // inserto en la base de datos, responda con el detalle del registro insertado
        res.send({data:resDetail}) // envio la respuesta al cliente
    } catch (e) {
        httpError(res,e) // si hay un error lo manejamos con el manejador de errores
        
    }
}

const  updateItem=(req,res)=>{
    const {id} = req.params
    res.send({data:id})
    
}

const  deleteItem=(req,res)=>{ 
    const {id} = req.params
    res.send({data:id})
    
}

module.exports={ getItems, getItem, createItem, updateItem, deleteItem }

