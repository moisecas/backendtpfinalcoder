
const {httpError} = require('../helpers/handleError')


//get create update delete

const getOrders = async (req, res) => {
    try {
        const products = await productsModel.find({})
        res.send({data:products})
    } catch (e) {
        httpError(res,e)
    }
}

const createOrder = async (req, res) => {
    try {
        const {id, name, price, stock} = req.body
        const product = await productsModel.create({id, name, price, stock})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

const updateOrder = async (req, res) => {
    try {
        const {id} = req.params
        const {name, price, stock} = req.body
        const product = await productsModel.findOneAndUpdate({id}, {name, price, stock})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsModel.deleteOne({id})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

const orderId = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsModel.findOne({id})
        res.send({data:product})
    } catch (e) {
        httpError(res,e)
    }
}

module.exports = {getOrders, createOrder, updateOrder, deleteOrder, orderId}  