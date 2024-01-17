const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String
    },
    location : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Location' 
    },
    price_for_two :{
        type : String 
    },
    description :{
        type : String
    },
    images:{
        type : Array
    },
    food_categories: {
        type : Array
    },
    opening_time:{
        type: String
    },
    closing_time:{
        type: String
    },
    admin_status:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    }  

})

let  Restaurant = mongoose.model('restaurant',restaurantSchema)

module.exports = Restaurant