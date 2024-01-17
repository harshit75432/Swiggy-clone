let confirmPassword = document.getElementById('confirm-password')
let password = document.getElementById('password')
let name = document.getElementById('name')
let email = document.getElementById('email')
let signUpForm  = document.getElementById('sign-up-form')
let alertBox = document.getElementById('alert-box')
confirmPassword.onchange=()=>{
    if(confirmPassword.value != password.value){
        confirmPassword.setCustomValidity('Your confirm password does not match with password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}

signUpForm.onsubmit=(e)=>{
    e.preventDefault()
    console.log('hello');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.created){
                window.location.href = '/login'
           }else{
            alertBox.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User already exist.</strong> User already exist please login your account.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"</button>
          </div>
            `
           }
        }
    }

    let json = JSON.stringify({
       type : 'signup',
       user_type : 'normal-user',
       name : name.value,
       email : email.value,
       password : password.value
   });
  
    xhr.send(json);
}
