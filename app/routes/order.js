const router = express.Router()
const  {getOrders, createOrder, updateOrder, deleteOrder, orderId} = require('../controllers/orders') 

//post
// http://localhost:3000/api/1.0/orders
router.post('/', createOrder) 

//get id
// http://localhost:3000/api/1.0/orders/1
router.get('/:id', orderId)

//get all
// http://localhost:3000/api/1.0/orders
router.get('/',getOrders)

//update
// http://localhost:3000/api/1.0/orders/1
router.patch('/:id', updateOrder)


//delete
// http://localhost:3000/api/1.0/orders/1
router.delete('/:id', deleteOrder) 
