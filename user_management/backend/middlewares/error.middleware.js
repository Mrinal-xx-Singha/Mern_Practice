module.exports = (err,req,res,next) =>{
    console.err(err)
    res.status(500).json({error:err.message || "Something went wrong"} )
}