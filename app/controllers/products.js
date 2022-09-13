const productsModel = require('../models/products')
const {httpError} = require('../helpers/handleError')

const getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsModel.findOne({id})
        res.send({data:product})
    } catch (e) {
        res.send({data:e})
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productsModel.find({})
        res.send({data:products})
    } catch (e) {
        httpError(res,e)
    }
}

const createProduct = async (req, res) => {
    try {
        const {id, name, price, stock} = req.body
        const product = await productsModel.create({id, name, price, stock})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {name, price, stock} = req.body
        const product = await productsModel.findOneAndUpdate({id}, {name, price, stock})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsModel.deleteOne({id})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

module.exports = {getProduct, getProducts, createProduct, updateProduct, deleteProduct}

