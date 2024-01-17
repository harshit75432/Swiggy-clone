let deleteBtn = document.querySelectorAll('.delete-order')

deleteBtn.forEach((btn)=>{
    btn.onclick=()=>{
        let order_id = btn.id.split('-')[2]
        console.log(order_id);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", '', true);
        
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
               const res = JSON.parse(xhr.response)
               if(res.deleted){
                    window.location.href = window.location.href
               }
            }
        }
    
        let json = JSON.stringify({
           type : 'delete',
           order_id : order_id
       });
      
        xhr.send(json);
    }

})
