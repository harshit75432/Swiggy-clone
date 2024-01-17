let confirmPassword = document.getElementById('confirm-password')
let password = document.getElementById('password')
let phoneNumber = document.getElementById('phone-number')
let name = document.getElementById('name')
let email = document.getElementById('email')
let signUpForm = document.getElementById('sign-up-form')
let signUpDiv = document.getElementById('sign-up-div')
let signUpToLogin = document.getElementById('sign-up-to-login')
let loginToSignUp = document.getElementById('login-to-signup')
confirmPassword.onchange=()=>{
    if(confirmPassword.value != password.value){
        confirmPassword.setCustomValidity('Your confirm password does not match with password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}

signUpToLogin.onclick=()=>{
    signUpDiv.style.display = 'none'
    loginDiv.style.display = 'block'

}
password.onchange=()=>{
    if(password.value != confirmPassword.value){
        confirmPassword.setCustomValidity('Your password does not match with confirm password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}

phoneNumber.onchange=()=>{
    let mob = /^[1-9]{1}[0-9]{9}$/;
    if(mob.test(phoneNumber.value) == false){
        phoneNumber.setCustomValidity('Please fill correct phone number')
    }else{
        phoneNumber.setCustomValidity('')
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
                signUpDiv.style.display = 'none'
           }
        }
    }

    let json = JSON.stringify({
       type : 'signup',
       name : name.value,
       email : email.value,
       phone_number : phoneNumber.value,
       password : password.value
   });
  
    xhr.send(json);
}