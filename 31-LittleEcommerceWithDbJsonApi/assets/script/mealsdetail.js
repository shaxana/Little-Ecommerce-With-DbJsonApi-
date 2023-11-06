let row = document.querySelector('.row')
let id = new URLSearchParams(location.search).get("id");


axios.get(`http://localhost:3000/meals/${id}`)
.then((res)=>{
    let meal = res.data;
    row.innerHTML = `<div class="card my-5 " style="width: 700px; height: 550px;" >
    <img
      class="card-img-top"
      src="${meal.imageLink}"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">${meal.name}</h5>
      <p class="card-title"><b>Ingredients:</b> ${meal.ingredients}</p>
      <p class="card-text"> <b> Price: $ ${meal.price} </b></p>
      <a href="#" class="btn btn-outline-primary detail">Detail</a>
      <a href="#"  class="btn btn-outline-danger"><i class="fa-regular fa-heart favMeal" name="${meal.id}"></i></a>
      <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-cart-shopping detailCartBtn"></i></a>
    </div>
  </div>`
})
