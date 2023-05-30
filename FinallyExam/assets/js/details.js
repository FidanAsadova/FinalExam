let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = "http://localhost:8080/products";
let boxes = document.querySelector(".boxes");

async function getData() {
  let res = await axios.get(`${BASE_URL}/${id}`);
  let data = res.data;
  console.log(data);
  detailsProud(data);
}
getData();

function detailsProud(element) {
  boxes.innerHTML = `
    <span class="col col-sm-12 col-md-6 col-lg-4">
              <div class="proud border mb-5 p-5">
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
                
              </div>
            </span>`;
}
