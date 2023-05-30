let BASE_URL = "http://localhost:8080/products";
let BASE_URL_FAV = "http://localhost:8080/fav";
let bool = false;
let boxes = document.querySelector(".boxes");
let sort = document.querySelector(".sort");
let load = document.querySelector(".load-more");
let search = document.querySelector("#search");
let num = 3;

async function getData() {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  console.log(data);
  drawBoxes(data);
}
getData();

function drawBoxes(arr) {
  boxes.innerHTML = "";
  arr.slice(0, num).forEach((element) => {
    boxes.innerHTML += `
    <span class="col col-sm-12 col-md-6 col-lg-4">
              <div class="proud mb-5">
                <div class="proud-top d-flex">
                <div class="img d-flex justify-content-center p-1 rounded-3 m-1">
                  <i class="fa-solid fa-plane-up fs-1" style="color: #669c19;"></i>
                </div>
                  <p class="proud-title fs-4 d-flex align-items-center">
                    ${element.title}
                  </p>
                </div>
                <div class="proud-btm">
                  <p class="proud-body">
                    ${element.body}
                  </p>
                </div>
                <div class="btns-proud pt-4 pb-4">
                  <div class="row">
                    <div class="col col-6 d-flex flex-column align-items-center gap-1">
                      <a href="add-edit.html?id=${element.id}" class="text-success">Edit</a>
                      <a class="text-primary" href="#" onclick="favProud(${element.id})">Favorite</a>
                    </div>
                    <div class="col col-6 d-flex flex-column align-items-center gap-1">
                      <a class="text-danger" href="" onclick="deleteProud(${element.id},this)">Delete</a>
                      <a class="text-warning" href="details.html?id=${element.id}">Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </span>`;
  });
}

load.addEventListener("click", function (e) {
  e.preventDefault();
  num = num + 3;
  getData();
});

sort.addEventListener("click", async function () {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  let sorted;
  if (!bool) {
    sorted = data.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sorted = data.sort((a, b) => b.title.localeCompare(a.title));
  }
  drawBoxes(sorted);
  bool = !bool;
});

search.addEventListener("input", async function (e) {
  let res = await axios.get(BASE_URL);
  let data = res.data;
  let filtered = data.filter((item) => {
    return `${item.title}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  drawBoxes(filtered);
});

async function deleteProud(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

async function favProud(id) {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let obj = res.data;
  console.log(id);
  await axios.post(BASE_URL_FAV, obj);
}
