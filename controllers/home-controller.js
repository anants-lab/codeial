module.exports.home=function(req,res){
    res.render("home.ejs",{
        "title":"Home"
    });
};