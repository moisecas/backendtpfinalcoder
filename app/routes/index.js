const express = require('express')
const router = express.Router() 
const fs = require('fs') // file system leer el directorio 


const pathRouter = __dirname // __dirname => ruta absoluta del directorio actual 

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file)=>{ //fs es para leer el directorio, filter para filtrar los archivos que queremos leer
    const fileWithoutExtension = removeExtension(file)
    const skip = ['index'].includes(fileWithoutExtension) // no queremos que se cargue el archivo index.js
    if(!skip){ // si no es index.js
        router.use(`/${fileWithoutExtension}`, require(`./${fileWithoutExtension}`)) // http://localhost:3000/api/users
        console.log(`http://localhost:3000/api/${fileWithoutExtension}`)
    }
    console.log(removeExtension(file)) // users me devuelve el nombre del archivo sin la extension .js 
})// leer el directorio actual


//cuando sea una ruta que no existe
router.get('*',(req, res) => {
    res.status(404)
    res.send('404 not found') 
    
}) 

//ver directory public index.ejs
router.get('/', (req, res) => {
    res.render('index')
})





module.exports = router 