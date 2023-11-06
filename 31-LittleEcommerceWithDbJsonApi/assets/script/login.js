let usernameInp = document.querySelector('.usernameInput')
let passwordInp = document.querySelector('.passwordInput')
let logInForm = document.querySelector('.logInForm')
let isLogged = false;

logInForm.addEventListener("submit", function(e){
    e.preventDefault()
    axios("http://localhost:3000/users")
  .then((res)=>{
    let users = res.data;
    users.forEach(user => {
        if (usernameInp.value == user.username && passwordInp.value == user.password){
            localStorage.setItem('newUser',  JSON.stringify({isLogged:true,  id:user.id,  balance:user.balance}))  
               isLogged=true;
               window.location.href =  "./profile.html";
        }

        else{
            Swal.fire ({
                icon: 'error',
                title: 'LogIn failed',
                text: 'Wrong username or password!',
               footer:'<a href="./register.html">Dont have an account?</a>'
              })
              
        }
    });
  })
})
  





 //suptexts
 let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length}


  let favCounter = document.querySelector('.favCounter')
  if (JSON.parse(localStorage.getItem("favorite"))) {
   favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length}