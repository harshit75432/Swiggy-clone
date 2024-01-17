const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const Location = require('./models/location')
const Restaurant = require('./models/Restaurant')
const randomstring = require("randomstring");
let User = require('./models/User')
const multer = require('multer')
const Fooditem = require('./models/fooditem')
const Order = require('./models/order')
const fs = require('fs')
const bcrypt = require("bcrypt")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


const localDb = 'mongodb://127.0.0.1:27017/swiggy'
mongoose.set('strictQuery', true);

mongoose.connect(localDb)
.then((result)=>{
   console.log('connection successfull');
   app.listen(3000,()=>{
         console.log("Project running on port 3000")
   });
})


function isLoggedIn(req,res,next){
    if(req.session.isLoggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}

const upload = multer({
    storage:multer.diskStorage({
       destination : function(req,file,cb){
          cb(null,'public/uploads')
       },
       filename: function(req,file,cb){
          let temp_file_arr = file.originalname.split('.')
          let temp_file_name = temp_file_arr[0]
          let temp_file_extension = temp_file_arr[temp_file_arr.length-1]
          let file_name = temp_file_name+'-'+Date.now()+'.'+ temp_file_extension
          req.file_name = file_name
          cb(null,file_name)
       }
    })
 }).single('file')
 
app.post('/upload',upload,(req,res)=>{
    
    let url = `http://localhost:3000/uploads/${req.file_name}`
    console.log(url);
    res.json({url})
})

let data = require('./data/data')
const { log } = require('console')

app.get('/admin',(req,res)=>{
    res.render('admin')
})
app.get('/location',isLoggedIn,(req,res)=>{
    Location.find()
    .then((locations)=>{
        res.render('location',{locations : locations})
    })
})
app.get('/restaurant',(req,res)=>{
    Restaurant.find().populate('location','name')
    .then((restaurants)=>{
        res.render('restaurant',{restaurants : restaurants})
    })
})
app.get('/fooditems',isLoggedIn,(req,res)=>{
    let restaurant_id = req.session.restaurant_id
    Fooditem.find({restaurant_id : restaurant_id})
    .then((fooditems)=>{
        res.render('fooditems',{fooditems : fooditems,id : restaurant_id})
    })
})
app.get('/addlocation',isLoggedIn,(req,res)=>{
    res.render('addlocation')
})
app.post('/addlocation',isLoggedIn,(req,res)=>{
    let location = req.body.location
    let new_location = new Location({
        name : location
    })
    new_location.save()
    .then(()=>{
        res.redirect('/location')
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/addresturant',(req,res)=>{

    Location.find()
    .then((locations)=>{
        res.render('addresturant',{locations : locations})
    })
})
app.post('/addresturant',(req,res)=>{
    console.log(req.body);
    let new_resturant = new Restaurant({
      ...req.body
    })
    new_resturant.save()
    .then(()=>{
        res.json({
            created : true
        })  
    })
    .catch((err)=>{
        res.json({
            error : err
        })
    })
})

app.get('/addfooditem',isLoggedIn,(req,res)=>{
    Restaurant.find()
    .then((restaurants)=>{
        res.render('addfooditem',{restaurants : restaurants})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/addfooditem',isLoggedIn,(req,res)=>{
 

    let new_food_item = new Fooditem({
        
        ...req.body
        
    })
    new_food_item.restaurant_id = req.session.restaurant_id
    new_food_item.save()
    .then(()=>{
        res.json({
            created : true
        })
    })
    .catch((err)=>{
        res.json({
            error : err
        })
    })
})

app.get('/editlocationitem/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id
    Location.findById(id)
    .then((location)=>{
        res.render('editlocationitem',{location : location})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/editlocationitem/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id
    Location.findByIdAndUpdate(id,{name : req.body.location})
    .then(()=>{
        res.redirect('/location')
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/editrestaurantitem/:id/:location',isLoggedIn,(req,res)=>{
    let location = req.params.location
    let id = req.params.id
    Location.find()
    .then((locations)=>{
        Restaurant.findById(id)
        .then((restaurant)=>{
            console.log(locations,restaurant.location);
            res.render('editrestaurantitem',{restaurant : restaurant,locations:locations,location : location})

    })
    .catch((err)=>{
        console.log(err);
    })
       
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/editrestaurantitem/:id/:location',isLoggedIn,(req,res)=>{
    let id = req.params.id

    if(req.body.type == 'delete-pic'){
        console.log('delete');
        let imageUrl = req.body.image_url
    let url = './public' +  imageUrl.split('localhost:3000')[1]
    console.log(url);
        fs.unlink(url,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
        Restaurant.findById(id)
        .then((resturant)=>{
            let updateImages = resturant.images.filter((items)=> items != imageUrl)
            Restaurant.findByIdAndUpdate(id,{images : updateImages})
            .then(()=>{
                res.json({
                    deleted : true
                })
            })
            .catch((err)=>{
                res.json({
                    error : err
                })
            })
        })
    
    }

    if(req.body.type == 'updated'){

        Restaurant.findById(id)
        .then((restaurant)=>{
            let updateImage = [...restaurant.images,...req.body.images]
           
            Restaurant.findByIdAndUpdate(id,{...req.body, images : updateImage})
            .then(()=>{
                res.json({
                    restaurant,
                    updated : true
                })
            })
        })
        .catch((err)=>{
            res.json({
                error : err
            })
        })
    }
})

app.get('/editfooditem/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id 
    
    Restaurant.find()
    .then((restaurants)=>{
        Fooditem.findById(id)
        .then((fooditem)=>{
            res.render('editfooditem',{restaurants : restaurants,food : fooditem,data})
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/editfooditem/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id 
    
    
    Fooditem.findById(id)
    .then((food)=>{
        let imageUrl = food.pic
        let url = './public' +  imageUrl.split('localhost:3000')[1]
        console.log(url);
        fs.unlink(url,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
        let add_ons = [...food.add_ons,...req.body.add_ons]
        Fooditem.findByIdAndUpdate(id,{...req.body, add_ons : add_ons})
        .then(()=>{
            res.json({
                updated : true,
                food
            })
        })
        .catch((err)=>{
            res.json({
                error : err
            })
        })

    })
})

app.get('/',isLoggedIn,(req,res)=>{
    Restaurant.find()
    .then((restaurants)=>{
        res.render('home',{restaurants : restaurants})
    })
})

app.post('/',isLoggedIn,(req,res)=>{
   let {type} = req.body
   if(type == 'signup'){
        bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log(err);
        }
        if(hash){
            let new_user = new User({
                name : req.body.password,
                email : req.body.email,
                phone_number : req.body.phone_number,
                password : hash
            })
            new_user.save()
            .then(()=>{
                res.json({
                    created : true
                })
            })
            .catch((err)=>{
                res.json({
                    error : err
                })
            })
        }
    });
   } 
   if(type == 'login'){
        User.findOne({email : req.body.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(result){
                        req.session.isLoggedIn = true
                        req.session.user_id = user._id
                        req.session.isLoggedIn = true
                        req.session.restaurantId = user.id
                        res.json({
                            loggined : true
                        })
                    }
                    if(err){
                        res.json({
                            error : err
                        })
                    }
                });
            }else{
                res.json({
                    logined : false
                })
            }
        })
   }
})

app.get('/restaurant/:id/:foodId/:type',isLoggedIn,(req,res)=>{
    let restaurant_id = req.params.id
    let foodId = req.params.foodId
    let type = req.params.type
    console.log(type,foodId,restaurant_id);

    if(type == 'modal-details'){
        Restaurant.findById(restaurant_id)
        .then((restaurant)=>{
            Fooditem.findById(foodId)
            .then((food)=>{
                res.json({
                    restaurant,
                    food,
                    cart : req.session.cart,
                    user_id : req.session.user_id,
                    details : true
                }) 
                })
                .catch((err)=>{
                    res.json({
                        error : err
                    })
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

   
})

app.get('/restaurant/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id
    console.log(req.session.cart);
    Restaurant.findById(id).populate('location','name')
    .then((restaurant)=>{
        Fooditem.find({resturant : id})
        .then((foods)=>{
            res.render('restaurantdetail',{restaurant : restaurant,foods : foods,cart:{}})
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
   
})

app.post('/restaurant/:id',isLoggedIn,(req,res)=>{
    let {type} = req.body

    if(type == 'subtract'){
            let restaurantId = req.body.restaurant_id
            let priceValue = req.body.price_value 
            let foodId = req.body.food_id
            let quantity = req.body.quantity
            let addOnsTitle = req.body.add_ons_title
            let items = req.session.cart && req.session.cart.items ? req.session.cart.items : [] 
            let item = {
            price_value : priceValue,
            quantity : quantity,
            food_id : foodId,
            add_ons : addOnsTitle
        }


        for(let i=0;i<req.session.cart.items.length;i++){
            if(req.session.cart.items[i].food_id == foodId){
                req.session.cart.items[i] = item
            }
        }
        let cart = { 
            resturant_id : restaurantId,
            items
        }

        req.session.cart = cart
        console.log(req.session.cart);
      
        let count = 0

        for(let j=0;j<req.session.cart.items.length;j++){
            if(req.session.cart.items[j].food_id == foodId){
                count++
                console.log(count);
            }
        }
        console.log(req.session.cart);
       if(count == 1){
        console.log('right');
        Fooditem.findById(foodId)
        .then((food)=>{
            res.json({
               subtracted : true,
               cart : req.session.cart,
               food : food
            })

        })
        .catch((err)=>{
            console.log(err);
        })
       }else{
            res.json({
                subtracted : false
            })
       }
        
    }
    
    if(type == 'repeat'){
        let restaurantId = req.body.restaurant_id
        let priceValue = req.body.price_value 
        let foodId = req.body.food_id
        let quantity = req.body.quantity
        let addOnsTitle = req.body.add_ons_title

          
        let items = req.session.cart && req.session.cart.items ? req.session.cart.items : [] 
        let item = {
            price_value : priceValue,
            quantity : quantity,
            food_id : foodId,
            add_ons : addOnsTitle
        }
        

        for(let i=0;i<req.session.cart.items.length;i++){
            if(req.session.cart.items[i].food_id == foodId){
                console.log(i);
                req.session.cart.items[i] = item
            }
        } 
        let cart = {
            restaurant_id : restaurantId,
            items
        }
        req.session.cart = cart
        console.log(req.session.cart);
        res.json({
            added : true
        })
    }

    if(type == 'add-item'){
        console.log('repeat');
       let restaurantId = req.body.restaurant_id
       let quantity = req.body.quantity
       let priceValue  = req.body.price_value
       let addOnsTitle = req.body.add_ons_title
       let foodId = req.body.food_id
        console.log(restaurantId);
        console.log(req.session.cart);

       if(req.session.cart && req.session.cart.restaurant_id != restaurantId){
            req.session.cart = {}
       }   
       let items = req.session.cart && req.session.cart.items ? req.session.cart.items : []
       let item = {
            quantity,
            price : priceValue,
            add_ons : addOnsTitle,
            food_id : foodId
       }
       items.push(item)

       let cart = {
            restaurant_id : restaurantId,
            items
       }

       req.session.cart = cart
       console.log(req.session.cart);
       Fooditem.findById(foodId)
       .then((food)=>{
           res.json({
                food : food,
                cart : req.session.cart,
                added : true
           })
       })
    }

    if (type == 'update'){
        let cart = req.body.cart
        req.session.cart = cart
        res.json({
            status : 'success',
            message : 'Cart Updated',
       })

    }
    if(type == 'cart'){
        res.json({
            cart : req.session.cart,
        })
    }
})

app.get('/cart',isLoggedIn,(req,res)=>{
    let cart = req.session.cart
    console.log(cart);
    if(cart){
        console.log('enter');
        if(cart.food_items.length == 0){
            res.render('cart',{cart:cart})
        }else{
            Restaurant.findById(cart.restaurant_id)
            .then((restaurant)=>{
                let food_names = []
                for(let i=0;i<cart.food_items.length;i++){
                    let food_item = cart.food_items[i]
                    console.log(food_item.id);
                    Fooditem.findById(cart.food_items[i].id)
                    .then((food)=>{   
                        
                        food_names.push(food.name)
                        if(i == cart.food_items.length-1){
                            console.log(food.name);
                            res.render('cart',{cart : cart,restaurant : restaurant,food_names : food_names})          
                        }          
                    })
                }
               
            })
        }
       
    }else{
        res.render('cart',{cart:cart})
    }
})

app.post('/cart',isLoggedIn,(req,res)=>{
    let {type} = req.body
    if(type == 'cart'){
        res.json({
            cart : req.session.cart
        })
    }

    if(type == 'update'){
        let cart = req.body.cart
        req.session.cart = cart
        res.json({
            status : 'success',
            message : 'Cart Updated',
       })

    }
    if(type == 'placed'){
        let cart = req.session.cart
        let order_id = randomstring.generate(5)
        let new_order = new Order({
            food_items : cart.food_items,
            user_id : req.session.user_id,
            restaurant_id : cart.restaurant_id,
            order_id : order_id,
            status : 'Accepted'
        })
        new_order.save(new_order)
        .then((order)=>{
            req.session.order_id = order.order_id
            res.json({
                placed : true
            })
        })
        .catch((err)=>{
            res.json({
                error : err
            })
        })
    }
})


app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',(req,res)=>{
    let {type} = req.body
    if(type == 'signup'){
        User.findOne({email : req.body.email})
        .then((user)=>{
            if(user){
                console.log('exist');
               res.json({
                created : false 
               })
            }else{
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err){
                        console.log(err);
                    }
                    if(hash){
                        let new_user = new User({
                            name : req.body.name,
                            email : req.body.email,
                            user_type : req.body.user_type,
                            password : hash
                        })
                        new_user.save()
                        .then(()=>{
                            res.json({
                                created : true
                            })
                        })
                        .catch((err)=>{
                            res.json({
                                error : err
                            })
                        })
                    }
                });
            }
        })
        
    }
})

app.get('/restaurantsignup',(req,res)=>{
    Location.find()
    .then((locations)=>{
        res.render('restaurantsignup',{locations : locations})
    })
})

app.post('/restaurantsignup',(req,res)=>{
    let new_resturant = new Restaurant({
        ...req.body
      })
      new_resturant.save()
      .then(()=>{
          res.json({
              created : true
          })  
      })
      .catch((err)=>{
          res.json({
              error : err
          })
      })
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',(req,res)=>{
    User.findOne({email : req.body.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(result){
                         console.log('auich');
                        req.session.isLoggedIn = true
                        req.session.user_id = user._id
                        console.log(user.restaurant_id);
                        req.session.restaurant_id = user.restaurant_id
                        res.json({
                            type : user.user_type,
                            restaurant_id : user.id,
                            loggined : true
                        })
                    }
                    if(err){
                        res.json({
                            error : err
                        })
                    }
                });
            }else{
                res.json({
                    loggined : false
                })
            }
        }) 
})
app.get('/admins',isLoggedIn,(req,res)=>{
    
    Restaurant.find({admin_status : 'under-process'}).populate('location','name')
    .then((restaurants)=>{
        console.log(restaurants);
        res.render('admins',{restaurants : restaurants})
    })
})

app.get('/admin_request_details/:location/:id',isLoggedIn,(req,res)=>{
    let restaurantId = req.params.id
    let location = req.params.location
    console.log(location);
    Restaurant.findById(restaurantId)
    .then((details)=>{
        res.render('adminrequestdetails',{details : details,location:location})
    })
})

app.post('/admin_request_details/:location/:id',isLoggedIn,(req,res)=>{
    let {type} = req.body
    if(type == 'approve'){
        let id  = req.body.restaurant_id
        Restaurant.findByIdAndUpdate(id,{
            admin_status : 'active'})
            .then(()=>{
                Restaurant.findById(id)
                .then((restaurant)=>{
                    let password = '123456'
                    bcrypt.hash(password, 10, function(err, hash) {
                        if(hash){

                            let new_user = new User({
                                name : restaurant.name,
                                email : restaurant.email,
                                password : hash,
                                restaurant_id : restaurant._id, 
                                user_type : 'restaurant'
                            })
                            new_user.save()
                            .then(()=>{
                                res.json({
                                    approved : 'true',                                  
                                })
                            })
                            .catch((err)=>{
                                res.json({
                                    error : err
                                })
                            })
                        }
                    });

                })
             })
             .catch((err)=>{
                console.log(err);
             })
           
        }
       
  
    if(type == 'delete'){
        let id  = req.body.restaurant_id
        Restaurant.findByIdAndDelete({_id:id})
        .then(()=>{
            res.json({
                deleted : true
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})

app.get('/restauranthome',isLoggedIn,(req,res)=>{
    User.findById(req.session.user_id)
    .then((user)=>{
        let name = user.name
        res.render('restauranthome',{name:name})
    })
})

let getDetails = require('./data/date')

app.get('/orders',isLoggedIn,(req,res)=>{
    Order.find({restaurant_id : req.session.restaurant_id}).populate('user_id','name')
    .then((orders)=>{
        console.log(orders);
    
        res.render('orders',{orders,details:getDetails})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/createadmin',(req,res)=>{
    let password = '123456'
    bcrypt.hash(password, 10, function(err, hash) {
        if(hash){

            let new_user = new User({
                name : 'System Admin',
                email : 'admin@swiggy.com',
                password : hash, 
                user_type : 'admin'
            })
            new_user.save()
            .then(()=>{
                res.json({
                    status : 'true',                                  
                })
            })
        }
})

})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

app.get('/congratulations',isLoggedIn,(req,res)=>{
    let order_id = req.session.order_id
    res.render('congratulation',{order_id:order_id})
})

app.get('/adminrestaurants',isLoggedIn,(req,res)=>{
    Restaurant.find({admin_status:'active'}).populate('location','name')
    .then((restaurants)=>{
        res.render('adminresturants',{restaurants})
    })
})

app.get('/admin_restaurant_details/:location/:id',isLoggedIn,(req,res)=>{
    let restaurantId = req.params.id
    let location = req.params.location
    console.log(location);
    Restaurant.findById(restaurantId)
    .then((details)=>{
        res.render('adminrestaurantsdetails',{details : details,location:location})
    })
})

app.post('/admin_restaurant_details/:location/:id',isLoggedIn,(req,res)=>{
    let {type} = req.body
    if(type == 'approve'){
        let id  = req.body.restaurant_id
        Restaurant.findByIdAndUpdate(id,{
            admin_status : 'active'})
            .then(()=>{
                Restaurant.findById(id)
                .then((restaurant)=>{
                    let password = '123456'
                    bcrypt.hash(password, 10, function(err, hash) {
                        if(hash){

                            let new_user = new User({
                                name : restaurant.name,
                                email : restaurant.email,
                                password : hash,
                                restaurant_id : restaurant._id, 
                                user_type : 'restaurant'
                            })
                            new_user.save()
                            .then(()=>{
                                res.json({
                                    approved : 'true',                                  
                                })
                            })
                            .catch((err)=>{
                                res.json({
                                    error : err
                                })
                            })
                        }
                    });

                })
             })
             .catch((err)=>{
                console.log(err);
             })
           
        }
       
  
    if(type == 'delete'){
        let id  = req.body.restaurant_id
        Restaurant.findByIdAndDelete({_id:id})
        .then(()=>{
            res.json({
                deleted : true
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})

app.get('/orderdetails/:id',(req,res)=>{
    let orderId = req.params.id
    Order.findById(orderId).populate('user_id','name').populate('restaurant_id','name')
    .then((order)=>{
        let food_names = []
        for(let i=0;i<order.food_items.length;i++){
            let food_item = order.food_items[i]
            console.log(food_item.id);
            Fooditem.findById(order.food_items[i].id)
            .then((food)=>{   
                
                food_names.push(food.name)
                if(i == order.food_items.length-1){
                    console.log(food.name);
                    res.render('orderdetails',{order,food_names : food_names})          
                }          
            })
        }
    })
})