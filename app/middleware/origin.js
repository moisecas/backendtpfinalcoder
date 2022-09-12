//vigilar el origen de la peticion 

const checkOrigin = (req, res, next) => { //res responder al cliente, next para pasar al siguiente middleware, req para leer la peticion del cliente
    const token = req.headers.autorization.split(' ').pop() // leer el token de la cabecera de la peticion del cliente 
    if(token=='123456'){ // si el token es correcto
        next() // si hay token pasa al siguiente middleware
    }else{
        res.status(409) // si no hay token envia un error 401
        res.send('no autorizado') // envia un mensaje de error
    }
    
} // middleware para vigilar el origen de la peticion y cololocarlo en todas las rutas que quiera proteger

module.exports = checkOrigin