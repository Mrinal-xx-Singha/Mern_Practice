const express =require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const Post = require("../models/Post")
const router = express.Router()

// GET user profile + posts
router.get("/profile",auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        const posts = await Post.find({author:req.user.id}).sort({createdAt:-1})
    
        res.json({user,posts})
    } catch (error) {
        console.error("Profile error:",error)
        res.status(500).json({error:"Failed to fetch profile"})
    }
})


module.exports = router