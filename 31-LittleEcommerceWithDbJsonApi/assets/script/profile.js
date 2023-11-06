let profileCard = document.querySelector('.profileCard')


if(JSON.parse(localStorage.getItem(newUser))){
    axios("http://localhost:3000/users")
    .then((res)=>{
      let users = res.data;
      users.forEach(user => {
        
          profileCard.innerHTML += ` <div class="userInfo">
          <h1>Accaunt</h1>
          <h2>Username: ${user.username}</h2>
          <h2>Email: ${user.email}</h2>
          <h2>Balance: ${user.balance}</h2>
          <h2>Orders: ${user.order}</h2>
        </div>`
       
      });
    
    })

   
}


//logout
let logOutBtn = document.querySelector('.logOutBtn')

logOutBtn.addEventListener("click", function(e){
  e.preventDefault();
  console.log('salam');
  localStorage.removeItem('newUser')
  alert("LOgged out")

})




 //suptexts
 let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length}


  let favCounter = document.querySelector('.favCounter')
  if (JSON.parse(localStorage.getItem("favorite"))) {
   favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length}