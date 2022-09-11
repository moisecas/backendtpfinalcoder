const express = require('express')
const router = express.Router() 
const fs = require('fs') // file system leer el directorio 

const pathRouter = __dirname // __dirname => ruta absoluta del directorio actual 

fs.readdirSync(pathRouter).filter((file)=>{
    console.log(file)
})// leer el directorio actual

module.exports = router