require('dotenv').config()
const epxress = require('express')
const cors = require('cors')
const app = epxress()
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(epxress.json())



dbConnect()
app.listen(PORT, () => {
    console.log('API ok corriendo en ', PORT)
})