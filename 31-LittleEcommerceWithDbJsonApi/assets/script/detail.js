let row = document.querySelector('.row')
let id = new URLSearchParams(location.search).get("id");

axios.get(`http://localhost:3000/singers/${id}`)
  .then((res) => {
    let singer = res.data;
    row.innerHTML = `<div class="card my-3" style="width: 700px; height: 660px; ">
    <img
      class="card-img-top"
      src="${singer.imageLink}"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">${singer.name}</h5>
      <p class="card-text">${singer.name} is <b> ${singer.nationality}</b> </p>
      <p class="card-text">Age: ${singer.age} </p>
      <p class="card-text">Genre: ${singer.genre} </p>
      <a href="./index.html" class="btn btn-outline-primary detail" >Home</a>
      <a href="#" class="btn btn-outline-danger " ><i class="fa-regular fa-heart favBtn" name =${singer.id}></i></a>
    </div>
  </div>`;

// favorite
let favBtns = document.querySelectorAll(".favBtn");
let favData = [];
let localFavArr = JSON.parse(localStorage.getItem("favorite"));
if (localFavArr) {
  favData = localFavArr;
}
  JSON.parse(localStorage.getItem("favorite"))
  for(btn of favBtns){
    for (elem of favData){
      if (elem.id == btn.getAttribute("name")){
        btn.classList.replace("fa-regular", "fa-solid")
      }
    }
  }

  for (let btn of favBtns) {
    btn.addEventListener("click", function (e) {
      
      e.preventDefault();
      if (this.className.includes("regular")) {
        this.classList.replace("fa-regular", "fa-solid");
        favData.push(singers.find((singer) => singer.id == this.getAttribute("name")));
        localStorage.setItem("favorite", JSON.stringify(favData));
      } 
      else {
        this.classList.replace("fa-solid", "fa-regular");
        favData = singers.filter((singer) => singer.id != this.getAttribute("name"));
        localStorage.removeItem("favorite", JSON.stringify(favData));
      }
    });
  }
  })





//suptexts
let cartCounter = document.querySelector('.cartCounter')
if (JSON.parse(localStorage.getItem("cart"))) {
  cartCounter.textContent = JSON.parse(localStorage.getItem("cart")).length
}


let favCounter = document.querySelector('.favCounter')
if (JSON.parse(localStorage.getItem("favorite"))) {
  favCounter.textContent = JSON.parse(localStorage.getItem("favorite")).length
}