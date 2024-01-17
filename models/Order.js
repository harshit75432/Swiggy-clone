const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
   food_items :{
        type : Array
   },
   user_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
   },
   restaurant_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'restaurant'
   },
   order_id : {
    type : String
   },
   status : {
     type : String
   }
})

let order = mongoose.model('Order',orderSchema)

module.exports = order
