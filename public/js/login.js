
let loginEmail = document.getElementById('email')
let loginPassword = document.getElementById('password')

let loginForm = document.getElementById('login-form')

loginForm.onsubmit=(e)=>{
    e.preventDefault()
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.loggined){
                if(res.type == 'admin'){
                    window.location.href = '/admins'
                }else if(res.type == 'normal-user'){
                    window.location.href = '/'
                }else{
                    window.location.href = `/restauranthome`
                }
           }
        }
    }

    let json = JSON.stringify({
        type : 'login',
        email : loginEmail.value,
        password : loginPassword.value
   });
  
    xhr.send(json);
}


