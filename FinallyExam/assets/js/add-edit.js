let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8080/products";
let boxes = document.querySelector(".boxes");
let titleInput = document.querySelector("#title");
let bodyInput = document.querySelector("#body");
let btn = document.querySelector(".btn-primary");
let form = document.querySelector("form");
let formTitle = document.querySelector(".formTitle");

async function getData() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = res.data;
  console.log(data);
  titleInput.value = data.title;
  bodyInput.value = data.body;
}
getData();

function titleForm() {
  if (id) {
    formTitle.innerHTML = `Edit Product`;
    btn.innerHTML=`Edit`
  } else {
    formTitle.innerHTML = `Add Product`;
    btn.innerHTML=`Add`
  }
}
titleForm();

function newProud() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      title: titleInput.value,
      body: bodyInput.value,
    };
    if (id) {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location = "index.html";
    } else {
      await axios.post(BASE_URL, obj);
      window.location = "index.html";
    }
  });
}
newProud()
