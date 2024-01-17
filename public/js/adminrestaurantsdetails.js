let activeBtn = document.getElementById('active')
let blockBtn = document.getElementById('block')

activeBtn.onclick=()=>{
    let restaurant_id = activeBtn.dataset.restaurant_id

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.actived){
            window.location.href = window.location.href
           }
        }
    }

    let json = JSON.stringify({
        type : 'active',
       restaurant_id : restaurant_id
   });
  
    xhr.send(json);
}

blockBtn.onclick=()=>{
    let restaurant_id = blockBtn.dataset.restaurant_id

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.blocked){
            window.location.href = window.location.href
           }
        }
    }

    let json = JSON.stringify({
        type : 'block',
       restaurant_id : restaurant_id
   });
  
    xhr.send(json);
}