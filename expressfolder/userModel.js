const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "please enter a first name"]
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }

},{
    timestamps:true,
})
const User = mongoose.model("user", UserSchema)
module.exports = User

