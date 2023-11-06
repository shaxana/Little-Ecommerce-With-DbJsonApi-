let tbody = document.querySelector('tbody')
let favData = []
let localFavArr = JSON.parse(localStorage.getItem("favorite"))

if (localFavArr) {
  favData = localFavArr;
}


favData.forEach(singer => {

  tbody.innerHTML += ` <tr>
    <th scope="row">${singer.id}</th>
    <td>${singer.name}</td>
    <td><img src="${singer.imageLink}" alt="" style="width:50px"></td>
    <td>${singer.age}</td>
    <td>${singer.genre}</td>
    <td><a href="#" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></a></td>
    
  </tr>`;


});








//suptexts
let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length
}

let favCounter = document.querySelector('.favCounter')
if (JSON.parse(localStorage.getItem("favorite"))) {
  favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length
}


let deleteBtns = document.querySelectorAll('.deleteBtn')
for (let btn of deleteBtns) {
  btn.addEventListener("click", function () {
    this.parentElement.parentElement.remove();
    localStorage.removeItem("favorite", JSON.stringify(favData))
  })
}