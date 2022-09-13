const express = require('express')
const router = express.Router()
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/products')

//post
// http://localhost:3000/api/1.0/products
router.post('/', createProduct) 

//get id
// http://localhost:3000/api/1.0/products/1
router.get('/:id', getProduct)

//get all
// http://localhost:3000/api/1.0/products
router.get('/',getProducts)

//update
// http://localhost:3000/api/1.0/products/1
router.patch('/:id', updateProduct)

//delete
// http://localhost:3000/api/1.0/products/1
router.delete('/:id', deleteProduct) 

module.exports = router 