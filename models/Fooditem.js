const mongoose = require('mongoose')

const fooditemSchema = new mongoose.Schema({
    pic :{
        type : String
    },
    name : {
        type : String
    },
    type : {
        type : String
    },
    restaurant_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    pricing : {
        type : Array
    },
    add_ons : {
        type : Array
    }    
})

let  Fooditem = mongoose.model('Fooditem',fooditemSchema)

module.exports = Fooditem