let tbody=document.querySelector('tbody')
let favMealsArr = []
let localMealsArr = JSON.parse(localStorage.getItem('favMeals'))
if (localMealsArr){
  favMealsArr = localMealsArr
}

favMealsArr.forEach(meal =>{
  tbody.innerHTML += ` <tr>
  <th scope="row">${meal.id}</th>
  <td>${meal.name}</td>
  <td><img src="${meal.imageLink}" alt="" style="width:50px"></td>
  <td>${meal.price}</td>
  <td><a href="#" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></a></td>
  <td><a href="#" class="btn btn-outline-danger "><i class="fa-solid fa-cart-shopping favMealCartBtn" name= "${meal.id}"></i></a></td>
  
</tr>`;



})


let deleteBtns = document.querySelectorAll('.deleteBtn')
for (let btn of deleteBtns){
    btn.addEventListener("click", function(){
        this.parentElement.parentElement.remove();
        localStorage.removeItem('favMeals')
    })
}


let favMealCartBtns = document.querySelectorAll('.favMealCartBtn')
let cartFavArr = []
let localCartFavArr = JSON.parse(localStorage.getItem('cartfav'))
if(localCartFavArr){
    cartFavArr = localCartFavArr
}

for (btn of favMealCartBtns){
    btn.addEventListener("click", function(e){
        e.preventDefault();
        if(cartFavArr.find((cartItem)=> cartItem.id == this.name)){
            cartFavArr[+this.name - 1].count++;
            localStorage.setItem('cartfav', JSON.stringify(cartFavArr))
        }
        else{
            meals[+this.name -1].count=1;
            cartFavArr.push(meals[+this.name-1]);
            localStorage.setItem('cartfav', JSON.stringify(cartFavArr))
        }
    })
}




//suptexts
let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length
}

let favCounter = document.querySelector('.favCounter')
if (JSON.parse(localStorage.getItem("favorite"))) {
  favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length
}

// let favMealCounter = document.querySelector('.favMealCounter')
// if (JSON.parse(localStorage.getItem('favMeals'))){
//     favMealCounter.textContent = JSON.parse(localStorage.getItem('favMeals')).length
// }