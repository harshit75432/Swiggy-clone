let priceAddBtn = document.getElementById('price-add-btn')
let priceDeleteBtns = document.querySelectorAll('.delete-price')
let addOnsbtn = document.getElementById('add-ons-btn')
let addOnsDeleteBtns = document.querySelectorAll('.add-ons-delete')
let foodItemForm = document.getElementById('food-item-form')
let foodPicSelect = document.getElementById('file')
let uploadPhoto = document.getElementById('upload-photo')
let foodPic = document.getElementById('food-pic')
let foodName = document.getElementById('food-name')
let foodType = document.getElementById('type-select')

let prices = []
let addOns = []
let priceItems = document.querySelectorAll('.price-div')
let addOnsItems = document.querySelectorAll('.add-ons-div')
let priceSection = document.getElementById('price-section')
let imageStatus = 'unchanged'
let image='' 





priceAddBtn.onclick=()=>{
    let priceSection = document.getElementById('price-section')
    let priceDiv = document.createElement('div')
    priceDiv.classList.add('mt-3','price-div')
    let len = priceSection.children.length
    
    priceDiv.id = 'price-div-'+ len
    priceDiv.innerHTML =`
    <div class="mt-3" style="border-bottom: 2px solid lightgray;"></div>  
                <div class="d-flex align-items-center mt-3 w-100">
                <div class="d-flex flex-column w-100">
                    <input id="price-title-${len}" class="form-control" type="text" placeholder="Title" required>
                    <input id="price-${len}" class="form-control mt-3" type="number" placeholder="Price" required>
                </div>
                <div class="mx-2">
                    <i id="price-delete-btn-${len}" class="bi bi-trash3 text-danger delete-price fs-5" style="cursor: pointer;"></i>
                </div>

            </div>
                           
    `
    
   
    priceSection.appendChild(priceDiv)

    priceItems = document.querySelectorAll('.price-div')

    priceDeleteBtns = document.querySelectorAll('.delete-price')
    priceDeleteBtns.forEach((btn)=>{
        
        btn.onclick=()=>{
            if(priceSection.children.length == 1){
                alert('Price does not empty')
            }else{
                let id = btn.id.split('-')[3]
                console.log(id)
                let priceDiv = document.getElementById('price-div-'+id)
                priceDiv.remove()     
            }
        }
    })

}




priceDeleteBtns.forEach((btn)=>{
        
    btn.onclick=()=>{
        if(priceSection.children.length == 1){
            alert('Price does not empty')
        }else{
            let id = btn.id.split('-')[3]
            console.log(id)
            let priceDiv = document.getElementById('price-div-'+id)
            priceDiv.remove()     
        }
    }
})



addOnsbtn.onclick=()=>{
    let addOnsSection = document.getElementById('add-ons-section')
    let addOnsDiv = document.createElement('div')
    addOnsDiv.classList.add('mt-3','add-ons-div')
    let len = addOnsSection.children.length
    addOnsDiv.id = 'add-ons-div-' + len
    addOnsDiv.innerHTML = `
                    <div   class="d-flex align-items-center mt-3">
                        <div class="d-flex flex-column w-100">
                            <input id="add-ons-title-${len}" class="form-control" type="text" placeholder="Title" required>
                            <input id="add-ons-price-${len}" class="form-control mt-3" type="number" placeholder="Price" required>
                            <select id="add-ons-type-${len}" name="type" class="form-select mt-3" required>
                                <option selected disabled>Please select food type</option>
                                <option>Veg</option>
                                <option>Non veg</option>
                            
                            </select>
                        </div>
                        <div class="mx-2">
                            <i id="add-ons-delete-${len}" class="bi bi-trash3 text-danger fs-5"></i>
                        </div>
                        <div class="mt-3" style="border-bottom: 2px solid lightgray;"></div>  
                    </div>
    `
    addOnsSection.appendChild(addOnsDiv)
    addOnsItems = document.querySelectorAll('.add-ons-div')
    addOnsDeleteBtns = document.querySelectorAll('.add-ons-delete')
    addOnsDeleteBtns.forEach((btn)=>{
        btn.onclick=()=>{
            let id = btn.id.split('-')[3]
            let addOnsDiv = document.getElementById('add-ons-div-'+id)
            addOnsDiv.remove()
        }
    })

}

foodPicSelect.onchange=()=>{
    
    let fr = new FileReader()
    fr.onload = function(e){
        foodPic.src = e.target.result
    } 
    fr.readAsDataURL(foodPicSelect.files[0])
}

uploadPhoto.onclick=()=>{
    foodPicSelect.value = null
    imageStatus = 'changed'
    foodPicSelect.click()
}




foodItemForm.onsubmit=(e)=>{
    e.preventDefault()
    if(imageStatus == 'unchanged'){
       image = foodPic.src
        priceItems.forEach((div)=>{
            id = div.id.split('-')[2]
            let priceTitle = document.getElementById('price-title-'+id)
            let price = document.getElementById('price-'+id)
            let new_price = {
               title  : priceTitle.value,
               price : price.value
            }
            prices.push(new_price)           
    })

    addOnsItems.forEach((div)=>{
        id = div.id.split('-')[3]
        let title = document.getElementById('add-ons-title-'+id)
        let price = document.getElementById('add-ons-price-'+id)
        let type = document.getElementById('add-ons-type-'+id)
        let new_addOns = {
            title : title.value,
            price : price.value,
            type : type.value
        }
        addOns.push(new_addOns)
    })
    console.log(addOns);
    console.log(prices);
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const res = JSON.parse(xhr.response)
        if(res.updated){
            window.location.href = '/fooditems'
        }    
        }
    }
    let json = JSON.stringify({
        pic : image,
        name : foodName.value,
        type : foodType.value,
        pricing : prices,
        add_ons : addOns,
        
        });
    xhr.send(json);

    }
    
    if(imageStatus == 'changed'){

        priceItems.forEach((div)=>{
     
                id = div.id.split('-')[2]
                let priceTitle = document.getElementById('price-title-'+id)
                let price = document.getElementById('price-'+id)
                let new_price = {
                   title  : priceTitle.value,
                   price : price.value
                }
                prices.push(new_price)
                
        })
    
        addOnsItems.forEach((div)=>{
            id = div.id.split('-')[3]
            let title = document.getElementById('add-ons-title-'+id)
            let price = document.getElementById('add-ons-price-'+id)
            let type = document.getElementById('add-ons-type-'+id)
            let new_addOns = {
                title : title.value,
                price : price.value,
                type : type.value
            }
            addOns.push(new_addOns)
        })
        console.log(addOns);
        console.log(prices);
        if(prices.length > 0){
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/upload', true);
            xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const res = JSON.parse(xhr.response)
                addFoodItem(res.url)
                }
            }    
            let data = new FormData()
            data.append('file',foodPicSelect.files[0])
            xhr.send(data);
        }else{
            alert('price is empty')
        }
    }
    
}







function addFoodItem(url){
       
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const res = JSON.parse(xhr.response)
        if(res.updated){
            window.location.href = '/fooditem'
        }    
        }
    }
    let json = JSON.stringify({
        pic : url,
        name : foodName.value,
        type : foodType.value,
        pricing : prices,
        add_ons : addOns,
        });
    xhr.send(json);
    
}