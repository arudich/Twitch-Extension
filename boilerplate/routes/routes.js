exports.init = function(app) {
    app.get('/', index);
}

index = function(req,res){
    res.render('index')
}