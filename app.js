require('dotenv').config()
const epxress = require('express')
const cors = require('cors')
const app = epxress()
const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan') // morgan => ver las peticiones que se hacen en la consola
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const session = require('express-session')
const { dbConnect } = require('./config/mongo')
//importar el servidor de socket
// const {Server} = require('socket.io')
// const http = require('http')  

// const server = http.createServer(app) //le paso app par que tenga la configuración de express 
// const io = new WebSocketServer(server) //conexión a websocket 
// let productos = [] //let porque la voy a estar actualizando



const PORT = process.env.PORT || 3000
app.use(cors())
app.use(epxress.json())

// routes
app.use('/api/1.0', require('./app/routes')) // http://localhost:3000/api/users
require('./config/passport')(passport) // pass passport for configuration ')

// static files
app.use(epxress.static(path.join(__dirname, 'public')))  

app.set('views', path.join(__dirname, 'views')) // views => carpeta donde se guardan las vistas
app.set('view engine', 'ejs') // motor de plantillas

// middlewares
app.use(morgan('dev')) // morgan => ver las peticiones que se hacen en la consola
app.use(cookieParser()) // leer las cookies
app.use(bodyparser.urlencoded({ extended: false })) // leer los datos de los formularios, false => no acepta imagenes
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session()) // para guardar la sesion
app.use(flash()) // para mostrar mensajes de error en la vista 

// routes
// mostrar el formulario de login
app.get('/', (req, res) => {
    res.render('index.ejs')  
})

//login
app.get('/login', (req, res, next) => {
    res.render('login.ejs',{ message: req.flash('loginMessage') })
})
app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

})) // procesar el formulario de login 

//signup
app.get('/signup', (req, res, next) => {
    res.render('signup.ejs',{ message: req.flash('signupMessage') })
})

//profile
app.get('/profile',isLoggedIn,(req, res) => {
    res.render('profile.ejs',{ user: req.user }) // req.user => usuario que ha iniciado sesion
})

app.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile', // redireccionar a la ruta profile en caso de exito 
    failureRedirect: '/signup', // si hay un error, redireccionar a signup
    failureFlash: true //enviar mensajes de error
})) // procesar el formulario de signup

//logout
app.get('/logout', (req, res) => {
    req.logout() //metodo que proporciona passport para cerrar sesion
    res.redirect('/') // redireccionar a la ruta principal

})

//verifica si esta autenticado
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){ //authenticated metodo que proporciona passport para verificar si esta autenticado
        return next()
    } 
        
    return res.redirect('/')
}


// //CHAT
// //para ejecutar websocket
// io.on('connection', (socket)=>{ // socket? si.. cada vez que se haga una conexión, dime
//     console.log('nueva conexión exitosa: ', socket.id) //socket es la info del cliente, puede indicarle que quiero ver, para este caso el id

//     socket.emit('server:loadnotes', productos) //le voy a pasar el arreglo donde están los productos creados
//     socket.on('client:newnote', newNote =>{ //lo recibimos mediante post
//         const producto = { ...newNote, id: uuid()}
//         console.log(producto)
//         productos.push(producto)  //inserto la data de newnote al arreglo 
//         console.log(productos)  //muestro por consola
//         //al cliente le vas a emitir por pantalla los productos, emit
//         io.emit('server:newnote', producto) 
//     }) //cuando escuches el evento client:newnote voy a hacer algo, el servidor escucha ese evento enviado desde el index, lado del cliente

//     socket.on('client:deletenote', (noteId) =>{
//        productos = productos.filter((note)=>note.id !== noteId) //función que filtra un dato, filter, por cada producto recorrido haga, is es distinta a la que esta pasadno
//        io.emit('server:loadnotes', productos)  //io para que se muestre en tiempo real 
//     })
//     socket.on('client:getnote', noteId => {
//         const note = productos.find(note => note.id === noteId)
//         socket.emit('server:selectednote', note)//mostrando datos al cliente 
//     })//cuando de los sockets escuches el evento que viene desde el cliente y viene con el id, muestra

//     socket.on('client:updatenote', (updateNote) =>{
//         productos=productos.map(note => {
//             if(note.id === updateNote.id){
//                 note.title=updateNote.title
//                 note.description=updateNote.description 
//             }
//             return note 
//         })
//         io.emit("server:loadnotes", productos) 
        
//     })

// })



dbConnect()
app.listen(PORT, () => {
    console.log('API ok corriendo en ', PORT)
})

module.exports = isLoggedIn