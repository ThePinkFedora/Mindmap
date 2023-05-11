
module.exports = function(req,res,next){
    console.log(`${req.method} ${req.path} ${req.body ? "\n" + req.body : ""}`);
    next();
}