let row = document.querySelector('.row')
let searchInput = document.querySelector('.searchInput')


axios.get("http://localhost:3000/meals")
  .then((res) => {
    let meals = res.data;
    meals.forEach(meal => {
      row.innerHTML += ` <div class="col-3 my-4">
        <div class="card" style="width: 18rem">
          <img
            class="card-img-top "
            src="${meal.imageLink}"
            alt="Card image cap" 
            style="height:250px; object-fit:cover"
          />
          <div class="card-body">
            <h5 class="card-title">${meal.name}</h5>
            <p class="card-text">${meal.price} 
            
            </p>
            <a href="./mealsdetail.html?id=${meal.id}" name="${meal.id}" class="btn btn-outline-primary detailBtn">Detail</a>
            <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            <a href="#" name="${meal.id}" class="btn btn-outline-danger cartBtn"  ><i class="fa-solid fa-cart-shopping"></i></a>
            <a href="#"  class="btn btn-outline-danger"><i class="fa-regular fa-heart favMeal" name="${meal.id}"></i></a>
          </div>
        </div>
      </div>`;

     

    });

   
    let favMeals = document.querySelectorAll('.favMeal')
    let favMealsArr = []
    let localMealsArr = JSON.parse(localStorage.getItem("favMeals"))
    if (localMealsArr){
      favMealsArr= [...localMealsArr];
    }
    for (btn of favMeals){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        if (this.className.includes("fa-regular")){
          console.log(this);
          this.classList.replace("fa-regular", "fa-solid")
          console.log(this.getAttribute("name"));
          favMealsArr.push(meals.find((meal) => meal.id== this.getAttribute("name")));
          localStorage.setItem('favMeals', JSON.stringify(favMealsArr))
          
        }
        else if (this.className.includes("fa-solid")) {
          this.classList.replace("fa-solid", "fa-regular");
          favMealsArr=  meals.find((meal)=>meal.id != this.getAttribute("name"));
          localStorage.removeItem('favMeals', JSON.stringify(favMealsArr));

        }
      })
    } 

    let cartBtns = document.querySelectorAll('.cartBtn')
    let cartArr = [];
    let localCartArr = JSON.parse(localStorage.getItem("cart"))
    let quantity = document.querySelector('.quantity')
    if (localCartArr) {
      cartArr = [...localCartArr]
    }
    // console.log(cartArr);
    for (let btn of cartBtns) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (cartArr.find((cartItem) => cartItem.id == this.name)) {
          // console.log(cartArr[+this.name-1]);
          cartArr[+this.name - 1].count++;
          localStorage.setItem("cart", JSON.stringify(cartArr))
          
        }
        else {
          meals[+this.name - 1].count = 1;
          cartArr.push(meals[+this.name - 1]);
          localStorage.setItem("cart", JSON.stringify(cartArr))
        }
      })
    }
    
  })

// let profile = document.querySelector('.profile')
// let navbar = document.querySelector('.navbar')
// if (JSON.parse(localStorage.getItem(newUser))){
//   profile.classList.replace("d-none", "d-block")
// }



 //search
 searchInput.addEventListener("keyup", function () {
  axios.get("http://localhost:3000/meals").then((res) => {
    let meals = res.data;
    row.innerHTML = "";
    meals.forEach((meal) => {
      if (
        meal.name
          .toLowerCase()
          .trim()
          .includes(searchInput.value.toLowerCase().trim())
      ) {
        row.innerHTML += ` <div class="col-3 my-4">
        <div class="card" style="width: 18rem">
          <img
            class="card-img-top "
            src="${meal.imageLink}"
            alt="Card image cap" 
            style="height:250px; object-fit:cover"
          />
          <div class="card-body">
            <h5 class="card-title">${meal.name}</h5>
            <p class="card-text">${meal.price} 
            
            </p>
            <a href="./mealsdetail.html?id=${meal.id}" name="${meal.id}" class="btn btn-outline-primary detailBtn">Detail</a>
            <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            <a href="#" name="${meal.id}" class="btn btn-outline-danger cartBtn"  ><i class="fa-solid fa-cart-shopping"></i></a>
            <a href="#"  class="btn btn-outline-danger"><i class="fa-regular fa-heart favMeal" name="${meal.id}"></i></a>
          </div>
        </div>
      </div>`;
      }
    });
  });
});




   //suptexts
 let cartCounter = document.querySelector('.cartCounter')
 if (JSON.parse(localStorage.getItem("cart"))) {
   cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length}
 
 
   let favCounter = document.querySelector('.favCounter')
   if (JSON.parse(localStorage.getItem("favorite"))) {
    favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length}

