let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
    name :{
        type : String
    },
    email :{
        type : String
    },
    user_type : {
        type : String
    },
    password :{
        type : String
    },
    cart :{
        type : Array
    },
    restaurant_id :{
        type : String
    }
})

let User = mongoose.model('User',userSchema)

module.exports = User