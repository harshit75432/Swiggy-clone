let approve = document.getElementById('approve')
let deleted = document.getElementById('delete')

approve.onclick=()=>{
    let restaurant_id = approve.dataset.restaurant_id

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.approved){
            window.location.href = '/admins'
           }
        }
    }

    let json = JSON.stringify({
        type : 'approve',
       restaurant_id : restaurant_id
   });
  
    xhr.send(json);
}

deleted.onclick=()=>{
    let restaurant_id = deleted.dataset.restaurant_id

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.response)
            if(res.deleted){
                window.location.href = '/admins'  
            }
        }
    }

    let json = JSON.stringify({
        type : 'delete',
        restaurant_id : restaurant_id
   });
  
    xhr.send(json);
}