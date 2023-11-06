let row = document.querySelector(".row");
let searchInput = document.querySelector(".searchInput");

axios.get("http://localhost:3000/singers").then((res) => {
  let singers = res.data;
  singers.forEach((singer) => {
    row.innerHTML += ` <div class="col-3 my-4" >
        <div class="card " style="width: 18rem ">
          <img
            class="card-img-top"
            src="${singer.imageLink}"
            alt="Card image cap" 
            style="height:250px; object-fit:cover"
          />
          <div class="card-body">
            <h5 class="card-title">${singer.name}</h5>
            <p class="card-text">${singer.name} is <b> ${singer.nationality}</b>
            
            </p>
            <a href="./detail.html?id=${singer.id}" name="${singer.id}" class="btn btn-outline-primary detailBtn">Detail</a>
            <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></a>
            <a href="#" class="btn btn-outline-danger"><i class="fa-regular fa-heart favBtn" name="${singer.id}"></i></a>
          </div>
        </div>
      </div>`;
  });
  
  let favBtns = document.querySelectorAll(".favBtn");
  let favData = [];
  let localFavArr = JSON.parse(localStorage.getItem("favorite"));
  if (localFavArr) {
    favData = localFavArr;
  }

  //unchange icons when page loading
  JSON.parse(localStorage.getItem("favorite"))
  for(btn of favBtns){
    for (elem of favData){
      if (elem.id == btn.getAttribute('name')){
        btn.classList.replace("fa-regular", "fa-solid")
      }
    }
  }

//fav btn
  for (let btn of favBtns) {
    btn.addEventListener("click", function (e) {
    
      e.preventDefault();
      if (this.className.includes("fa-regular")) {
        this.classList.replace("fa-regular", "fa-solid");
        favData.push(singers.find((singer) => singer.id == this.getAttribute("name")));
        localStorage.setItem("favorite", JSON.stringify(favData));
      } 
      else if (this.className.includes("fa-solid")){
        this.classList.replace("fa-solid", "fa-regular");
        favData = singers.find((singer) => singer.id != this.getAttribute("name"));
        localStorage.removeItem("favorite", JSON.stringify(favData));
      }
    });
  }


});

 //search
searchInput.addEventListener("keyup", function () {
  axios.get("http://localhost:3000/singers").then((res) => {
    let singers = res.data;
    row.innerHTML = "";
    singers.forEach((singer) => {
      if (
        singer.name
          .toLowerCase()
          .trim()
          .includes(searchInput.value.toLowerCase().trim())
      ) {
        row.innerHTML += ` <div class="col-3 my-4">
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${singer.imageLink}"
          alt="Card image cap" 
          style="height:250px; object-fit:cover"
        />
        <div class="card-body">
          <h5 class="card-title">${singer.name}</h5>
          <p class="card-text">${singer.name} is <b> ${singer.nationality}</b>
          
          </p>
          <a href="./detail.html?id=${singer.id}" name="${singer.id}" class="btn btn-outline-primary detailBtn">Detail</a>
          <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></a>
          <a href="#" class="btn btn-outline-danger"><i class="fa-regular fa-heart favBtn" name="${singer.id}"></i></a>
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