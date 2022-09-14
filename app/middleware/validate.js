//validar si el usuario esta logueado
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    } 
    return res.redirect('/')
}