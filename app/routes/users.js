const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin') // middleware para vigilar el origen de la peticion lo incluimos en todas las rutas
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/users')


// http://localhost:3000/api/users
router.post('/', createItem)

// http://localhost:3000/api/users/1
router.get('/:id', getItem)

// http://localhost:3000/api/users
router.get('/',getItems)

// http://localhost:3000/api/users/1
router.patch('/id', updateItem)

// http://localhost:3000/api/users/1
router.delete('/:id', deleteItem) 



module.exports = router