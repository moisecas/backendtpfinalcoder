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

dbConnect()
app.listen(PORT, () => {
    console.log('API ok corriendo en ', PORT)
})

module.exports = isLoggedIn