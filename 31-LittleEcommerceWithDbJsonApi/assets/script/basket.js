let shoppingCart = document.querySelector('.shoppingCart')
let tbody = document.querySelector('tbody')
let cartArr = [];
let totalSumElement = document.querySelector('.totalSumOfMeals');
let localCartArr = JSON.parse(localStorage.getItem("cart"));
let sum =0;

if (localCartArr) {
    cartArr = [...localCartArr];
}



console.log(cartArr);
let subTotal = 0;
cartArr.forEach((meal) => {

    tbody.innerHTML += `  <tr>
                    <td>${meal.id}</td>
                    <td>${meal.name}</td>
                    <td scope="row"><img src="${meal.imageLink}" alt="" style="width:80px"></td>
                    <td>${meal.price}</td>
                    <td class="quantity">${meal.count}</td>
                    <td>${sum+=Number(meal.price)*Number(meal.count)}</td>
                    <td><a href="#" class="btn btn-outline-danger decBtn" name="${meal.id}"><i class="fa-solid fa-minus"></i></a></td>
                    <td><a href="#" class="btn btn-outline-danger incBtn" name="${meal.id}"><i class="fa-solid fa-plus"></i></a></td>
                    <td><a href="#" class="btn btn-outline-danger deleteBtn" name="${meal.id}"><i class="fa-solid fa-trash"></i></a></td>
              
                  </tr>`;
    subTotal += sum;

    let incBtns = document.querySelectorAll(".incBtn")
    let decBtns = document.querySelectorAll(".decBtn")

    for (let btn of incBtns) {
        btn.addEventListener("click", function (e) {
            this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent = ++meal.count
            this.parentElement.previousElementSibling.previousElementSibling.textContent = meal.count * meal.price;
            subTotal += (Number(meal.count) * Number(meal.price));
            totalSumElement.textContent = subTotal.toFixed(2);
            e.preventDefault()


        })
    }
    for (let btn of decBtns) {
        btn.addEventListener("click", function () {
            if (meal.count > 0) {
                this.parentElement.previousElementSibling.previousElementSibling.textContent = --meal.count;
                this.parentElement.previousElementSibling.textContent = meal.count * meal.price;
                subTotal -= (Number(meal.count) * Number(meal.price));
                totalSumElement.textContent = subTotal.toFixed(2);
            }
          
        })
    }
   
   

   

});


//checkbox
totalSumElement.textContent = subTotal.toFixed(2);
let usernew = JSON.parse(localStorage.getItem('newUser'))
let buyNowBtns = document.querySelectorAll('.buyNowBtn')
for (let btn of buyNowBtns) {
    btn.addEventListener("click", function () {
        axios("http://localhost:3000/users")
            .then((res) => {
                let users = res.data;
               let user = users.find((x)=> x.id == usernew.id)
                    if(JSON.parse(localStorage.getItem('newUser'))){
                        console.log(subTotal);
                        if (user.balance >= subTotal ){
                            user.balance = ( user.balance - subTotal).toFixed(2)
                            console.log("userbalance", user.balance);
                            Swal.fire({
                                text: `Your balance is: ${user.balance}`
                              })
                         }
                         else{
                            
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: "You don't have enough balance!"
                              })
                         }
                    }
                    else{
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'You must be logged in to continue!',
                            footer: '<a href="./login.html">LogIn</a>'
                          })
                    }
                

              
            
                
            })
    })
}


//delete button
let deleteBtns = document.querySelectorAll('.deleteBtn')
for (let btn of deleteBtns) {
    btn.addEventListener("click", function () {
        this.parentElement.parentElement.remove();
       localStorage.removeItem('cart');
      
    })

}
JSON.parse(localStorage.getItem("cart"))
for (btn of deleteBtns){
    for (elem of cartArr){
       if (elem.id == btn.getAttribute("name")){
        localStorage.setItem("cart", JSON.stringify(cartArr))
       }
    }
}


//removeALL button
let removeAllBtn = document.querySelector('.removeAllBtn')

removeAllBtn.addEventListener("click", function(){
    tbody.innerHTML='';
    localStorage.removeItem('cart')
})




 //suptexts
 let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length}

  let favCounter = document.querySelector('.favCounter')
  if (JSON.parse(localStorage.getItem("favorite"))) {
   favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length}
