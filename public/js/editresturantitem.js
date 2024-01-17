let imagesSelect = document.getElementById('images-select')
let addRestaurantForm = document.getElementById('addrestaurant-form')
let resturantName = document.getElementById('restaurant-name')
let locationSelect = document.getElementById('location')
let description = document.getElementById('description')
let price = document.getElementById('price')
let resturantFoodType = document.getElementById('food-type')
let openingTime = document.getElementById('open-time')
let closingTime = document.getElementById('close-time')
let deletePics = document.querySelectorAll('.delete-pic')
let categories = []
let foodCategories = document.getElementById('food-type')

new MultiSelectTag('food-type',{
    rounded: true,    
    shadow: true, 
    placeholder: 'Please select food category......',
    onChange: function(values) {
        categories = values.map(item => item.value)
    }
})

categories = foodCategories.dataset.categories.split(',')
console.log(categories);



deletePics.forEach((btn)=>{
    btn.onclick=()=>{
        let id = btn.id.split('-')[2]
        const xhr = new XMLHttpRequest();
        let imageUrl = btn.dataset.imageUrl
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           let res = JSON.parse(xhr.response)
            if(res.deleted){
                document.getElementById('image-div-'+id).remove()
            }
        }
    }

    let json = JSON.stringify({
        type : 'delete-pic',
        image_url : imageUrl 
   });
  
    xhr.send(json);
    }
})

addRestaurantForm.onsubmit=(e)=>{

    e.preventDefault()
    console.log(categories);
    
    let promiseArray = []
    for(let i=0;i<imagesSelect.files.length;i++){
        let promise = new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/upload', true);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                    const res = JSON.parse(xhr.response)
                    if(res.url){
                        resolve(res.url)
                    }else{
                        reject()
                    }
                }
            }
            let data = new FormData()
            data.append('file',imagesSelect.files[i])
            xhr.send(data)
        }) 
        promiseArray.push(promise) 
    }
    Promise.all(promiseArray).then((values)=>{
        console.log(values);
        const xhr = new XMLHttpRequest();
        xhr.open("POST",'', true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const res = JSON.parse(xhr.response)
                if(res.updated){
                    window.location.href = '/restaurant' 
                }
            }
        }
      
        
        let json = JSON.stringify({
            type : 'updated',
            images : values,
            name : resturantName.value,
            location : locationSelect.value,
            price_for_two : price.value,
            description : description.value,
            food_categories : categories,
            opening_time : openingTime.value,
            closing_time : closingTime.value
        });

        xhr.send(json);
    })

}
