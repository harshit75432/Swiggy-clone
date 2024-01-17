
let addWithModal = document.querySelectorAll('.add-food-modal')

let addItemButtons = document.querySelectorAll('.add-button')
let subtractItemButtons = document.querySelectorAll('.subtract-btn')
let plusItemButtons = document.querySelectorAll('.plus-btn')

let repeatItemButtons = document.querySelectorAll('.repeat-item')


let cart = {
    food_items :[]
}

let userId = ''
loadCart()

function loadCart(){
    let xhr = new XMLHttpRequest()
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let res = JSON.parse(xhr.response)
            if(res.cart){
                cart = res.cart
                if(cart.food_items.length>0){
                    updateView()
                }   
            }
        }
    }

    let json = JSON.stringify({
        type : 'cart'
    })
    xhr.send(json)
}


function updateView() {

   for( let i=0; i<cart.food_items.length;i++){



    let food_item = cart.food_items[i]

   document.getElementById(`add-div-${food_item.id}`).style.display = 'none'
   document.getElementById(`quantity-div-${food_item.id}`).style.display = 'block'
   document.getElementById(`quantity-${food_item.id}`).innerHTML = food_item.quantity


   }

}

addItemButtons.forEach((addItemButton)=>{

    addItemButton.onclick =()=>{

        let simple_food_item = {
            id:addItemButton.dataset.food_id,
            quantity:1,
            type:'simple',
            date : Date.now(),
            price:addItemButton.dataset.price
        }
        cart.restaurant_id = addItemButton.dataset.restaurant_id
        
        let food_items  = cart.food_items
        food_items.push(simple_food_item)
        
        cart.food_items = food_items

        // Update View

        document.getElementById(`quantity-div-${addItemButton.dataset.food_id}`).style.display='block'
        document.getElementById(`add-div-${addItemButton.dataset.food_id}`).style.display='none'
        updateCart()


        


    }
})


plusItemButtons.forEach((plusItemButton)=>{

    plusItemButton.onclick =()=>{

    // Only for simple
        
        let food_items  = cart.food_items
        let quantity = 0
        for(let i=0; i<food_items.length;i++){
            let food_item = food_items[i]

            if(food_item.id == plusItemButton.dataset.food_id ){
                

                food_item.quantity = Number(food_item.quantity) + 1
                quantity = Number(food_item.quantity)
                break;
            }
        }
        
        cart.food_items = food_items
        
        // Update Cart
        updateCart()


        // Update View

        document.getElementById(`quantity-${plusItemButton.dataset.food_id}`).innerHTML= quantity


    }
})

subtractItemButtons.forEach((subtractItemButton)=>{

    subtractItemButton.onclick =()=>{

    // Only for simple
        
        let food_items  = cart.food_items
        let quantity = 0
        if(subtractItemButton.dataset.type == 'customsiable'){
            for(let i=0; i<food_items.length;i++){
                let food_item = food_items[i]
            
                    console.log('vcasv');
                
                        if(food_item.id == subtractItemButton.dataset.food_id ){
                            if(food_item.customisation_items.length>0 && food_item.customisation_items){
                                alert('This item has multiple customizations added. Remove the correct item from the cart.')
                                break
                            }
                            if(food_item.quantity >=2){
                                food_item.quantity = Number(food_item.quantity) - 1
                                quantity = Number(food_item.quantity)
                                document.getElementById(`quantity-${subtractItemButton.dataset.food_id}`).innerHTML= quantity
                            }else{
            
                                // Remove from cart( for quantity = 1)
                                food_items.splice(i,1)
            
                                // Update View
                                document.getElementById(`quantity-div-${subtractItemButton.dataset.food_id}`).style.display='none'
                                document.getElementById(`add-div-${subtractItemButton.dataset.food_id}`).style.display='block'
                            }
                            break;
                    }   
                    }
                
        }else{
            console.log('sdvhbs');
            for(let i=0; i<food_items.length;i++){
                let food_item = food_items[i]
            if(food_item.id == subtractItemButton.dataset.food_id ){
                if(food_item.quantity >=2){
                    food_item.quantity = Number(food_item.quantity) - 1
                    quantity = Number(food_item.quantity)
                    document.getElementById(`quantity-${subtractItemButton.dataset.food_id}`).innerHTML= quantity
                }else{

                    // Remove from cart( for quantity = 1)
                    food_items.splice(i,1)

                    // Update View
                    document.getElementById(`quantity-div-${subtractItemButton.dataset.food_id}`).style.display='none'
                    document.getElementById(`add-div-${subtractItemButton.dataset.food_id}`).style.display='block'
                }
                break;
        }
    }

        }
        
        cart.food_items = food_items

        
        // Update Cart
        updateCart()


        // Update View



    }
})

repeatItemButtons.forEach((repeatItemButton)=>{

    repeatItemButton.onclick =()=>{

    // Only for simple
        
        let food_items  = cart.food_items
        let quantity = 0
        for(let i=0; i<food_items.length;i++){
            let food_item = food_items[i]

            if(food_item.id == repeatItemButton.dataset.food_id ){
                
                
                food_item.quantity = Number(food_item.quantity) + 1
                quantity = Number(food_item.quantity)
                if(food_item.customisation_items.length>0){
                    let index = food_item.customisation_items.length-1
                    console.log(index);
                    food_item.customisation_items[index].quantity = Number(food_item.customisation_items[index].quantity) + 1
                }
                
                break;
            }
        }
        
        cart.food_items = food_items
        
        // Update Cart
        updateCart()


        // Update View

        document.getElementById(`quantity-${repeatItemButton.dataset.food_id}`).innerHTML= quantity

        document.getElementById(`repeat-close-btn-${repeatItemButton.dataset.food_id}`).click()



    }
})



function updateCart()
{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let res = JSON.parse(xhr.response)
            if(res){
                // console.log(res);
            }
        }
    }

    let json = JSON.stringify({
        type : 'update',
        cart : cart
})
    xhr.send(json)
}


addWithModal.forEach((btn)=>{
    btn.onclick=()=>{
        console.log('add modal button clicked');

        let restaurantId = btn.dataset.restaurant_id
        let foodId = btn.dataset.food_id
         
        const xhr = new XMLHttpRequest();
        xhr.open("GET",`${restaurantId}/${foodId}/modal-details`, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.response)
            if(res.details){
                let userId = res.user_id
            createModal(res,restaurantId,foodId,userId)
            }     
                }                         
                }
                xhr.send();

                }
            })



function createModal(res,restaurantId,foodId,userId){

    console.log(res);
    let priceValue = ''
    let selected_option = '' 


    
    let modalDiv = document.getElementById('add-ons-details')

    modalDiv.innerHTML = ''

    let bodyDiv = document.createElement('div')
    bodyDiv.classList.add('d-flex','flex-column')

    let new_header = document.createElement('div')
    new_header.classList.add("d-flex","justify-content-between")

    let header_title = document.createElement('h5')
    header_title.classList.add('modal-title')
    
    header_title.innerHTML = `Customise ${res.food.name}`

    let modal_close_button = document.createElement('button')
    modal_close_button.id = 'close-add-modal'
    modal_close_button.type = 'button'
    modal_close_button.classList.add('btn-close')

    modal_close_button.setAttribute('data-bs-dismiss','modal')

    let food_price_span = document.createElement('span')
    food_price_span.innerHTML =`₹${res.food.pricing[0].price}`

    let border_div = document.createElement('div')
    border_div.style.border = '1px dashed rgb(8, 8, 8,0.2)'

    new_header.appendChild(header_title)
    new_header.appendChild(modal_close_button)
    
    bodyDiv.append(new_header)

    bodyDiv.append(food_price_span)
    
    
    bodyDiv.append(border_div)


    let quantity_div = document.createElement('div')
    quantity_div.id = 'quantity-div'
    quantity_div.style.display = 'block'

    let quantity_title = document.createElement('h4')
    quantity_title.classList.add('mt-4','add-on-heading')
    quantity_title.innerHTML = 'Quantity'

    quantity_div.append(quantity_title)
    

    let quantity_content = document.createElement('div')
    quantity_content.classList.add('d-flex','flex-column')

    for(let i=0;i<res.food.pricing.length;i++){
        let quantity_item = document.createElement('div')
        quantity_item.classList.add('d-flex','align-items-center','check-price')
        quantity_item.id = i
        quantity_item.innerHTML = `        
        <img class="mx-2" src="/images/vegicon.png" width="20px" height="20px" alt="">
        <input class="mx-2 quantity-radio" type="radio" ${i == 0 && 'checked'} name="price" id="price-${i}" value="${res.food.pricing[i].price} " data-price="${res.food.pricing[i].price}" data-title="${res.food.pricing[i].title}" >
        <span style="font-size: 17px;" id="title-${i}"  >${ res.food.pricing[i].title }</span>
        <span class='ms-2'>₹${ res.food.pricing[i].price }</span>`
        quantity_content.appendChild(quantity_item)
    }

   
    let quantiy_border = document.createElement('div')
    quantiy_border.style.border = '1px dashed rgb(8, 8, 8,0.2)'
    quantiy_border.classList.add('mt-2')

    quantity_content.append(quantiy_border)

    quantity_div.append(quantity_content)
    bodyDiv.append(quantity_div)

    if(res.food.add_ons.length>0){
    // Add Ons are present

    let next_div = document.createElement('div')
    next_div.id='next-div'
    next_div.style.display = 'block'
    let nextBtn = document.createElement('div')
    nextBtn.id='next' 
    nextBtn.classList.add('mt-3','d-flex','justify-content-between','px-3','py-1')
    nextBtn.style.cursor = 'pointer'
    nextBtn.style.border = '1.7px solid rgb(144, 238, 144)'
    nextBtn.innerHTML = `
            <span class="text-success">Step 1/2</span>
            <span class="text-success">Next</span>`

    next_div.append(nextBtn) 
      

    let add_ons_div = document.createElement('div')
    add_ons_div.id = 'add-ons-div'
    add_ons_div.style.display = 'none'
    
    let quantity_title2 = document.createElement('h4')
    quantity_title2.classList.add('mt-4','mb-2','add-on-heading') 
    quantity_title2.innerHTML = 'Quantity'
    
    let changeBtn = document.createElement('span')
    changeBtn.classList.add('p-1')
    changeBtn.id = 'previous-div'
    changeBtn.style.color = 'orangered'
    changeBtn.style.border = '1px solid orangered'
    changeBtn.style.cursor = 'pointer'
    changeBtn.style.fontWeight = '500'
    changeBtn.innerHTML = 'CHANGE'
    
    let add_ons_title = document.createElement('h4')
    add_ons_title.classList.add('mt-5','add-on-heading')
    add_ons_title.innerHTML = 'Add Ons'
    
    let add_ons_content = document.createElement('div')
    add_ons_content.classList.add('d-flex','flex-column')

    for(let i=0;i<res.food.add_ons.length;i++){
        
        let add_ons_item = document.createElement('div')
        add_ons_item.id = `add-ons-div-${i}`
        add_ons_item.classList.add('d-flex','align-items-center','add-ons-div')
        add_ons_item.innerHTML = `
        <img class="mx-2" src="/images/vegicon.png" width="20px" height="20px" alt="">
        <input class="mx-2 add-on-items" type="checkbox"  value="${ res.food.add_ons[i].title }" id="add-ons-${i}" data-price="${res.food.add_ons[i].price}" data-title="${res.food.add_ons[i].title}">
        <span style="font-size: 17px;">${ res.food.add_ons[i].title }</span>
        <span class='ms-2'>₹${ res.food.add_ons[i].price }</span>`
        add_ons_content.appendChild(add_ons_item)
    }

    
    let add_item_div = document.createElement('div')
    add_item_div.id='add-item-div'
    add_item_div.style.display = 'block'
    let addItemBtn = document.createElement('div')
    addItemBtn.id=`add-item-cart-${foodId}` 
    addItemBtn.classList.add('mt-3','d-flex','justify-content-between','px-3','py-1','bg-success','plus-add')
    addItemBtn.style.cursor = 'pointer'
    addItemBtn.style.border = '1.7px solid rgb(144, 238, 144)'
    addItemBtn.innerHTML = `
        <div>
            <span style="color: white">Total</span>
            <span class="ms-2" style="color: white" id="price-display"></span>
        </div>    
        <span style="color: white;">ADD ITEM</span>`

    
        
    changeBtn.onclick=()=>{
        add_ons_div.style.display = 'none'
        next_div.style.display = 'block'
        quantity_div.style.display = 'block'
    }



    add_item_div.append(addItemBtn)  
      


    add_ons_div.append(quantity_title2)
    add_ons_div.append(changeBtn)
    add_ons_div.append(add_ons_title)
    add_ons_div.append(add_ons_content)
    add_ons_div.append(add_item_div)


    bodyDiv.append(next_div)

    bodyDiv.append(add_ons_div)


    nextBtn.onclick=()=>{
        add_ons_div.style.display = 'block'
        next_div.style.display = 'none'
        quantity_div.style.display = 'none'

        let quantityRadios = document.querySelectorAll('.quantity-radio')
        quantityRadios.forEach((radio)=>{
        
                    if(radio.checked){
                        priceValue = radio.dataset.price
                        selected_option  = radio.dataset.title
                    }
        
            })


    }



    addItemBtn.onclick=()=>{
        let add_ons = []
        let addOnCheckBoxes = document.querySelectorAll('.add-on-items')
        addOnCheckBoxes.forEach((checkbox)=>{
            
            console.log('hello from addons');
       
        
            if(checkbox.checked){
                priceValue = Number(checkbox.dataset.price) + Number(priceValue)
                let add_on = {
                    'price':checkbox.dataset.price,
                    'title':checkbox.dataset.title
                }
                add_ons.push(add_on)
            }
        
            })
// priceValue,selectption,add_ons
    customiseCartWithAddOns(priceValue,selected_option,add_ons)   
    }
    }else{
    // No AddOns

    let add_item_div = document.createElement('div')
    add_item_div.id='add-item-div'
    add_item_div.style.display = 'block'
    let addItemBtn = document.createElement('div')
    addItemBtn.id=`add-item-cart-${foodId}` 
    addItemBtn.classList.add('mt-3','d-flex','justify-content-between','px-3','py-1','bg-success','plus-add')
    addItemBtn.style.cursor = 'pointer'
    addItemBtn.style.border = '1.7px solid rgb(144, 238, 144)'
    addItemBtn.innerHTML = `
        <div>
            <span style="color: white">Total</span>
            <span class="ms-2" style="color: white" id="price-display"></span>
        </div>    
        <span style="color: white;">ADD ITEM</span>`

        add_item_div.append(addItemBtn)  
      
    addItemBtn.onclick=()=>{


        let quantityRadios = document.querySelectorAll('.quantity-radio')
        quantityRadios.forEach((radio)=>{
        
                    if(radio.checked){
                        priceValue = radio.dataset.price
                        selected_option  = radio.dataset.title
                    }
        
            })


            customiseCart(priceValue,selected_option)

    }



    bodyDiv.append(add_item_div)

    }
    modalDiv.append(bodyDiv)




function customiseCart(priceValue,selected_option){
    if(cart.food_items.length>0){
        for(let i=0;i<cart.food_items.length;i++){
            let food_item = cart.food_items[i]
            if(food_item.id == foodId){
                console.log('here');
                let customisation_items = food_item.customisation_items 
                let customise_item = {
                    id : Date.now(),
                    quantity : 1,
                    selected_option : selected_option,
                    price : priceValue
                }
                customisation_items.push(customise_item)
                food_item.quantity = Number(food_item.quantity) + 1
                quantity = Number(food_item.quantity)
                let customise_food_item = {
                    type : 'customsiable', 
                    quantity : quantity,
                    customisation_items : customisation_items,
                }
                food_item = customise_food_item
                document.getElementById(`quantity-${foodId}`).innerHTML = quantity
                updateCart()
                document.getElementById('close-add-modal').click()
                console.log(cart);
                break
             
            }else{
                let customise_food_item = 
                {
                    id:foodId,
                    quantity:1,
                    type:'customsiable',
                    customisation_items:[{
                        selected_option:selected_option,
                        price: priceValue,
                        id : Date.now(),
                        quantity : 1
                    }]
                }
            
            
                cart.restaurant_id = restaurantId
            
                let food_items  = cart.food_items
                food_items.push(customise_food_item)
            
                cart.food_items = food_items
            
                console.log(customise_food_item);
            
                // Update View
            
                document.getElementById(`quantity-div-${foodId}`).style.display='block'
                document.getElementById(`add-div-${foodId}`).style.display='none'
                updateCart()
                document.getElementById('close-add-modal').click()
    
                console.log(cart);
                break
            }
        }
        

    }else{
        console.log('else');
        let customise_food_item = 
        {
            id:foodId,
            quantity:1,
            type:'customsiable',
            customisation_items:[{
                id : Date.now(),
                quantity : 1, 
                selected_option:selected_option,
                price: priceValue,
            }]
        }
    
    
        cart.restaurant_id = restaurantId
    
        let food_items  = cart.food_items
        food_items.push(customise_food_item)
    
        cart.food_items = food_items
    
        console.log(customise_food_item);
    
        // Update View
    
        document.getElementById(`quantity-div-${foodId}`).style.display='block'
        document.getElementById(`add-div-${foodId}`).style.display='none'
        updateCart()
        document.getElementById('close-add-modal').click()

        console.log(cart);
    }  
}

function customiseCartWithAddOns(priceValue,add_ons,selected_option){
    if(cart.food_items.length>0){
        for(let i=0;i<cart.food_items.length;i++){
            let food_item = cart.food_items[i]
            if(food_item.id == foodId){
                console.log('here');
                let customisation_items = food_item.customisation_items 
                let customise_item = {
                    id : Date.now(),
                    quantity : 1,
                    add_ons : selected_option,
                    selected_option : add_ons,
                    price : priceValue
                }
                customisation_items.push(customise_item)
                food_item.quantity = Number(food_item.quantity) + 1
                quantity = Number(food_item.quantity)
                let customise_food_item = {
                    type : 'customsiable',
                    id : foodId,
                    quantity : quantity,
                    customisation_items : customisation_items
                }
                food_item = customise_food_item

                document.getElementById(`quantity-${foodId}`).innerHTML = quantity
                updateCart()
                document.getElementById('close-add-modal').click()
                console.log(cart);
                break
             
            }else{
                let customise_food_item = 
                {
                    id:foodId,
                    quantity:1,
                    type:'customsiable',
                    customisation_items:[{
                        id : Date.now(),
                        quantity : 1,
                        selected_option:add_ons,
                        price: priceValue,
                        add_ons:selected_option,
                    }]
                }
            
            
                cart.restaurant_id = restaurantId
            
                let food_items  = cart.food_items
                food_items.push(customise_food_item)
            
                cart.food_items = food_items
            
                console.log(customise_food_item);
            
                // Update View
            
                document.getElementById(`quantity-div-${foodId}`).style.display='block'
                document.getElementById(`add-div-${foodId}`).style.display='none'
                updateCart()
                document.getElementById('close-add-modal').click()
    
                console.log(cart);
                break
            }
        }
        

    }else{
        console.log('else');
        let customise_food_item = 
        {
            id:foodId,
            quantity:1,
            type:'customsiable',
            customisation_items:[{
                id : Date.now(),
                quantity : 1,
                selected_option: add_ons,
                price: priceValue,
                add_ons:selected_option,
            }]
        }
    
    
        cart.restaurant_id = restaurantId
    
        let food_items  = cart.food_items
        food_items.push(customise_food_item)
    
        cart.food_items = food_items
    
        console.log(customise_food_item);
    
        // Update View
    
        document.getElementById(`quantity-div-${foodId}`).style.display='block'
        document.getElementById(`add-div-${foodId}`).style.display='none'
        updateCart()
        document.getElementById('close-add-modal').click()

        console.log(cart);
    }
}
    


    










//     let priceDisplay = document.getElementById('price-display')

//     let quantitySelects = document.querySelectorAll('.check-price')
//     quantitySelects.forEach((radio)=>{

//         let id = radio.id
//             if(document.getElementById('price-'+id).checked){
//                 priceValue = document.getElementById('price-'+id).value
//                 selected_option  = document.getElementById('title-'+id).innerHTML
//                 priceDisplay.innerHTML = "₹" + priceValue
//             }

//     })


//     priceDisplay.innerHTML = "₹" + priceValue
// }


// let addOnsDivs = document.querySelectorAll('.add-ons-div')
    
// addOnsDivs.forEach((check)=>{
//     let id = check.id.split('-')[3]
//     document.getElementById('add-ons-'+id).onchange=()=>{
//         if(document.getElementById('add-ons-'+id).checked){
//             let addValue = document.getElementById('add-ons-'+id).dataset.price
//             addOnsTitle = document.getElementById('add-ons-'+id).dataset.title 
//             let previousPriceValue = priceDisplay.innerHTML
//             let amount = previousPriceValue.slice(1)
//             let total = Number(amount) + Number(addValue)
//             priceDisplay.innerHTML = "₹" + total
//             priceValue = total 
//         }else{
//             let addValue = document.getElementById('add-ons-'+id).dataset.price 
//             let previousPriceValue = priceDisplay.innerHTML
//             let amount = previousPriceValue.slice(1)
//             let total = Number(amount) - Number(addValue)
//             priceDisplay.innerHTML = "₹" + total
//             priceValue = total 
//         }
//     }
// })

// let addItemButton = document.getElementById(`add-item-cart-${foodId}`)
// addItemButton.onclick=()=>{

//     console.log();
//     let customise_food_item = {
//         id:foodId,
//         quantity:1,
//         type:'customsiable',
//         selected_option:selected_option,
//         price: priceValue,
//         add_ons:[]
// }


// cart.restaurant_id = btn.dataset.restaurant_id

// let food_items  = cart.food_items
// food_items.push(customise_food_item)

// cart.food_items = food_items

// console.log(customise_food_item);

// // Update View

// document.getElementById(`quantity-div-${btn.dataset.food_id}`).style.display='block'
// document.getElementById(`add-div-${btn.dataset.food_id}`).style.display='none'
// updateCart()
// document.getElementById('close-add-modal').click()


// }

}
               

