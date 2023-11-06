let usernameInput = document.querySelector('.username-input')
let emailInput = document.querySelector('.email-input')
let passInput = document.querySelector(".password-input")
let balanceInput = document.querySelector('.balance-input')
let registerForm = document.querySelector('.register-form')
let confirmPasswordInput = document.querySelector('.confirm-password-input')
// if (usernameInput.value == user.username){
//     Swal.fire({
//         icon: 'error',
//         title: 'Registration failed',
//         text: 'username already exists!',
       
//       })

registerForm.addEventListener("submit", function(e){
    e.preventDefault()
   axios("http://localhost:3000/users")
   .then((res)=>{
    let users = res.data;
    if (x = users.find((x)=> x.username == usernameInput.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'Username already exists',
           
          })
    }
    else if(passInput.value.search(/[A-Z]/)>0){
        Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'Password should inclue at least 1 capital letter!',
           
          })
    }
    else{
      
    if (passInput.value == confirmPasswordInput.value ){
        axios.post("http://localhost:3000/users", {
        username : usernameInput.value,
        email : emailInput.value,
        password : passInput.value,
        balance : balanceInput.value,
        
       
        
    })
    .then((res)=>{
        let users = res.data;
        users.forEach(user => {
            
        });

    })  
    window.location.href= "./login.html"

    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'Your password must be same as your verification password!',
           
          })

    }
    }
   })
   
    
  
   
  
})


 //suptexts
 let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length}


  let favCounter = document.querySelector('.favCounter')
  if (JSON.parse(localStorage.getItem("favorite"))) {
   favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length}