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
    //buscar por id userModel id
    try {
        const {id} = req.params // obtengo el id de la url
       
        const resDetail = await userModel.findOne({id}) // busco el registro por id
        res.send({data:resDetail}) // envio la respuesta al cliente
        
    } catch (e) {
        res.send({data:e}) // envio la respuesta al cliente 
    } 
   
   
   
}

const  createItem= async (req,res)=>{
    try {
        const {id,name, age,email, password} = req.body
        const resDetail = await userModel.create({id,name, age,email, password}) // inserto en la base de datos, responda con el detalle del registro insertado
        res.send({data:resDetail}) // envio la respuesta al cliente
    } catch (e) {
        httpError(res,e) // si hay un error lo manejamos con el manejador de errores
        
    }
}

const  updateItem=(req,res)=>{
    const {id} = req.params
    res.send({data:id})
    
}

const  deleteItem= async (req,res)=>{ 
   //delete por id 
    try {
        const {id} = req.params // obtengo el id de la url
       
        const resDetail = await userModel.deleteOne({id}) // elimino el registro por id
        res.send({data:resDetail}) // envio la respuesta al cliente
        
    } catch (e) {
        res.send({data:e}) // envio la respuesta al cliente 
    }
    
}

module.exports={ getItems, getItem, createItem, updateItem, deleteItem }

