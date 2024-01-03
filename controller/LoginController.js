module.exports.signIn = function(req,res) {
    return res.render('SignIn');
}

module.exports.Home = function(req,res) {
    return res.render('Home');
}

module.exports.signOut = function(req,res) {
    req.logout(user => {
        console.log(user)
        // req.flash('success','LogOut Successfully')
    })

    return res.redirect('/user/signUp');
}