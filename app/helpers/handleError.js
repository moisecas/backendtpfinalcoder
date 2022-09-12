//manejador de errores 


const httpError = (res,err) => {
    console.log(err) // para ver el error en consola
    res.status(500)
    res.send({error:err.message})

}

module.exports = httpError 