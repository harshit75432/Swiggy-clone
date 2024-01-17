let acceptedBtn = document.getElementById('accepted')
let unconfirmBtn = document.getElementById('unconfirm')
let rescheduleBtn = document.getElementById('reshedule')
let cancelBtn = document.getElementById('cancel') 

acceptedBtn.onclick=()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
            if(res.accepted){
                window.location.href = '/orders'
            }
        }
    }

    let json = JSON.stringify({
       type : 'accepted'
   });
  
    xhr.send(json);
} 


cancelBtn.onclick=()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
            if(res.canceled){
                window.location.href = '/orders' 
            }
        }
    }

    let json = JSON.stringify({
       type : 'cancel'
   });
  
    xhr.send(json);
}