let repeatItemButtons = document.querySelectorAll('.repeat-item')
let plusItemButtons = document.querySelectorAll('.plus-btn')
let customiseModalView = document.querySelectorAll('.customisable')
let subtractItemButtons = document.querySelectorAll('.subtract-btn')
let updateModalView = document.querySelectorAll('.coustomise-heading')
let placed = document.getElementById('placed')
let cart = {
    food_items :[]
}

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
            }
        }
    }

    let json = JSON.stringify({
        type : 'cart'
    })
    xhr.send(json)
}


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
                document.getElementById(`quantity-${plusItemButton.dataset.food_id}`).innerHTML= quantity         
                                         let total = food_item.price * quantity 
                                         document.getElementById(`total-price-${ plusItemButton.dataset.food_id }`).innerHTML  = '₹'+total
                                         let amount = document.getElementById('total-bill').innerText
                                         amount = amount.slice(1)
                                        let totalBill = Number(amount) + Number( food_item.price)
                                        document.getElementById('total-bill').innerHTML = '₹'+totalBill 
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
                    let index = food_item.customisation_items.findIndex((item)=> item.id == repeatItemButton.dataset.item_id)
                    
                    console.log(index);
                    food_item.customisation_items[index].quantity = Number(food_item.customisation_items[index].quantity) + 1
                    quantity = Number(food_item.customisation_items[index].quantity)
                     document.getElementById(`quantity-${ repeatItemButton.dataset.item_id}`).innerHTML= quantity         
                                         let total = food_item.customisation_items[index].price * quantity 
                                         document.getElementById(`total-price-${  repeatItemButton.dataset.item_id }`).innerHTML  = '₹'+total
                                         let amount = document.getElementById('total-bill').innerText
                                         amount = amount.slice(1)
                                        let totalBill = Number(amount) + Number( food_item.customisation_items[index].price)
                                        document.getElementById('total-bill').innerHTML = '₹'+totalBill   
                }
                
                break;
            }
        }
        
        cart.food_items = food_items
        
        // Update Cart
        updateCart()


        // Update View

       

        document.getElementById(`repeat-close-btn-${repeatItemButton.dataset.item_id}`).click()
        window.location.href = window.location.href

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
                           
                            if(food_item.quantity >=2){
                                food_item.quantity = Number(food_item.quantity) - 1
                                quantity = Number(food_item.quantity)
                                
                                    
                                for(let j=0;j<food_item.customisation_items.length;j++){
                                    if(food_item.customisation_items[j].id == subtractItemButton.dataset.item_id){
                                        if(food_item.customisation_items[j].quantity >= 2){
                                            console.log('sjvgsdjh');
                                            food_item.customisation_items[j].quantity = Number(food_item.customisation_items[j].quantity) - 1
                                         quantity = Number(food_item.customisation_items[j].quantity) 
                                         document.getElementById(`quantity-${subtractItemButton.dataset.item_id}`).innerHTML= quantity         
                                         let total = food_item.customisation_items[j].price * quantity 
                                         document.getElementById(`total-price-${ subtractItemButton.dataset.item_id }`).innerHTML  = '₹'+total
                                         let amount = document.getElementById('total-bill').innerText
                                         amount = amount.slice(1)
                                        let totalBill = Number(amount) - Number( food_item.customisation_items[j].price)
                                        document.getElementById('total-bill').innerHTML = '₹'+totalBill 
                                            break
                                        }else{
                                            console.log('jsbh');
                                            let index = food_item.customisation_items.findIndex((item)=> item.id == subtractItemButton.dataset.item_id)
                                            food_item.customisation_items.splice(index,1)
                                            window.location.href = window.location.href
                                            break
                                        }
                                    }
                                }
    
                                
                              
                                food_item = food_item.customisation_items
                            }else{
            
                                // Remove from cart( for quantity = 1)

                                food_items.splice(i,1)
            
                                // Update View
                             window.location.href = window.location.href
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
                    console.log('come');
                    food_item.quantity = Number(food_item.quantity) - 1
                    quantity = Number(food_item.quantity)
                    document.getElementById(`quantity-${subtractItemButton.dataset.food_id}`).innerHTML= quantity         
                                         let total = food_item.price * quantity 
                                         document.getElementById(`total-price-${ subtractItemButton.dataset.food_id }`).innerHTML  = '₹'+total
                                         let amount = document.getElementById('total-bill').innerText
                                         amount = amount.slice(1)
                                        let totalBill = Number(amount) - Number( food_item.price)
                                        document.getElementById('total-bill').innerHTML = '₹'+totalBill 
                }else{

                    // Remove from cart( for quantity = 1)
                    food_items.splice(i,1)
                    window.location.href = window.location.href 
                    // Update View
           
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

function updateCart()
{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let res = JSON.parse(xhr.response)
            if(res){
                console.log(res);
            }
        }
    }

    let json = JSON.stringify({
        type : 'update',
        cart : cart
})
    xhr.send(json)
}


customiseModalView.forEach((btn)=>{
    btn.onclick=()=>{
        
        let restaurantId = btn.dataset.restaurant_id
        let foodId = btn.dataset.food_id

        console.log('add modal button clicked');
        const xhr = new XMLHttpRequest();
        xhr.open("GET",`restaurant/${restaurantId}/${foodId}/modal-details`, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.response)
            if(res.details){ 
            createModal(res,restaurantId,foodId)
            }     
                }                         
                }
                xhr.send();

    }
})

function createModal(res,restaurantId,foodId){

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

    customiseCartWithAddOns(priceValue,selected_option,add_ons,foodId)    
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


            customiseCart(priceValue,selected_option,foodId)

    }



    bodyDiv.append(add_item_div)

    }
    modalDiv.append(bodyDiv)


function customiseCart(priceValue,selected_option,foodId){
    if(cart.food_items.length>0){
        console.log('first');
        console.log(foodId);
        for(let i=0;i<cart.food_items.length;i++){
            let food_item = cart.food_items[i]
            console.log(food_item.id);
            if(food_item.id == foodId){
                console.log('second');
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
                updateCart()
                document.getElementById('close-add-modal').click()
                window.location.href = window.location.href
                console.log(cart);
                break
             
            }
        }
        

    }else{
        console.log('elses second');
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
        updateCart()
        document.getElementById('close-add-modal').click()
        window.location.href = window.location.href
        console.log(cart);
    }  
}

function customiseCartWithAddOns(priceValue,add_ons,selected_option){

    if(cart.food_items.length>0){
       console.log('skvbn');
       console.log(foodId);
        for(let i=0;i<cart.food_items.length;i++){
            let food_item = cart.food_items[i]
            console.log(food_item.id);
            if(food_item.id == foodId){
                console.log('first');
                let customisation_items = food_item.customisation_items 
                let customise_item = {
                    id : Date.now(),
                    quantity : 1,
                    add_ons : selected_option ,
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

                
                updateCart()
                document.getElementById('close-add-modal').click()
                window.location.href = window.location.href
                console.log(cart);
                break
             
            }
        }
        
    }else{
        console.log('elsesdvsdv',selected_option,add_ons);
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
                add_ons:selected_option
            }]
        }
    
    
        cart.restaurant_id = restaurantId
    
        let food_items  = cart.food_items
        food_items.push(customise_food_item)
    
        cart.food_items = food_items
    
        console.log(customise_food_item);
    
        // Update View
        updateCart()
        document.getElementById('close-add-modal').click()
        window.location.href = window.location.href
        console.log(cart);
    }
}
    

}

updateModalView.forEach((btn)=>{
    btn.onclick=()=>{
        console.log('add modal button clicked');
        let customId = btn.dataset.item_id
        let restaurantId = btn.dataset.restaurant_id
        let foodId = btn.dataset.food_id
        let buttonType = btn.dataset.type
        const xhr = new XMLHttpRequest();
        xhr.open("GET",`restaurant/${restaurantId}/${foodId}/modal-details`, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.response)
            if(res.details){
            updateModal(res,restaurantId,foodId,customId,buttonType)
            }     
                }                         
                }
                xhr.send();

    }
})

function updateModal(res,foodId,restaurantId,customId){
    console.log(res);
    console.log(cart);
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
    console.log(restaurantId); 
let foodItemsIndex = cart.food_items.findIndex((item)=> item.id == restaurantId)
console.log(foodItemsIndex); 
const customisableIndex = cart.food_items[foodItemsIndex].customisation_items.findIndex((item)=> item.id == customId)
let productPrice = cart.food_items[foodItemsIndex].customisation_items[customisableIndex].price
let selectPrice = cart.food_items[foodItemsIndex].customisation_items[customisableIndex].selected_option

    let priceIndex = 0
    for(let i=0;i<res.food.pricing.length;i++){
        console.log(priceIndex);
        if(selectPrice == res.food.pricing[i].title){ 
            priceIndex = i
            console.log(priceIndex);
        }
        let quantity_item = document.createElement('div')
        quantity_item.classList.add('d-flex','align-items-center','check-price')
        quantity_item.id = i
        quantity_item.innerHTML = `        
        <img class="mx-2" src="/images/vegicon.png" width="20px" height="20px" alt="">
        <input class="mx-2 quantity-radio" type="radio" ${i == priceIndex && 'checked'} name="price" id="price-${i}" value="${res.food.pricing[i].price} " data-price="${res.food.pricing[i].price}" data-title="${res.food.pricing[i].title}" >
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
    let checked_add_ons = []
    console.log(customisableIndex);
  
        checked_add_ons = cart.food_items[foodItemsIndex].customisation_items[customisableIndex].add_ons
    
    console.log(checked_add_ons);
    for(let i=0;i<res.food.add_ons.length;i++){
        let value = false
        for(let j=0;j<checked_add_ons.length;j++){
            if(checked_add_ons[j].title == res.food.add_ons[i].title){
                console.log('come');
                value = true
                break     
            }
        }
        console.log(value);
        let add_ons_item = document.createElement('div')
        add_ons_item.id = `add-ons-div-${i}`
        add_ons_item.classList.add('d-flex','align-items-center','add-ons-div')
        add_ons_item.innerHTML = `
        <img class="mx-2" src="/images/vegicon.png" width="20px" height="20px" alt="">
        <input class="mx-2 add-on-items" type="checkbox" ${value == true && 'checked'} value="${ res.food.add_ons[i].title }" id="add-ons-${i}" data-price="${res.food.add_ons[i].price}" data-title="${res.food.add_ons[i].title}">
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
            <span class="ms-2" style="color: white" id="price-display">${'₹'+productPrice}</span>
        </div>    
        <span style="color: white;">UPDATE ITEM</span>`

    
        
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

    let addOnCheckBoxes = document.querySelectorAll('.add-on-items')
    addOnCheckBoxes.forEach((checkbox)=>{
        
        console.log('hello from addons');
   
        checkbox.onchange=()=>{
            console.log('enter');
            if(checkbox.checked){
                priceValue = Number(checkbox.dataset.price) + Number(priceValue)
               document.getElementById('price-display').innerHTML = priceValue
                
            }
        }
      
    
        })

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
    console.log(customisableIndex);    
        cart.food_items[foodItemsIndex].customisation_items[customisableIndex].price = priceValue 
        cart.food_items[foodItemsIndex].customisation_items[customisableIndex].add_ons =  add_ons

        cart.food_items[foodItemsIndex].customisation_items[customisableIndex].selected_option =  
selected_option
                
                
                updateCart()
                document.getElementById('close-add-modal').click()
                window.location.href = window.location.href
                console.log(cart);   
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
            <span class="ms-2" style="color: white" id="price-display">${'₹'+productPrice}</span>
        </div>    
        <span style="color: white;">UPDATE ITEM</span>`

        add_item_div.append(addItemBtn)  
      
    addItemBtn.onclick=()=>{


        let quantityRadios = document.querySelectorAll('.quantity-radio')
        quantityRadios.forEach((radio)=>{
        
                    if(radio.checked){
                        priceValue = radio.dataset.price
                        selected_option  = radio.dataset.title
                        document.getElementById('price-display').innerHTML = '₹'+ priceValue
                    }
        
            })

            cart.food_items[foodItemsIndex].customisation_items[customisableIndex].price = priceValue 
            cart.food_items[foodItemsIndex].customisation_items[customisableIndex].add_ons = selected_option 

             
            updateCart()
            document.getElementById('close-add-modal').click()
            window.location.href = window.location.href
            console.log(cart);

    }



    



    bodyDiv.append(add_item_div)


}

    
modalDiv.append(bodyDiv)

}

placed.onclick=()=>{
    
const xhr = new XMLHttpRequest();
xhr.open("POST", '', true);

xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const res = JSON.parse(xhr.response)
        if(res.placed){
            cart = {
                food_items:[]
            }
            updateCart()
            window.location.href = `/congratulations`
        }
    }
}

let json = JSON.stringify({
   type : 'placed'
});

xhr.send(json);
}