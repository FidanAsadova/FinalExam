let BASE_URL_FAV = "http://localhost:8080/fav";
let boxes = document.querySelector(".boxes");


async function getData() {
    let res = await axios.get(BASE_URL_FAV);
    let data = res.data;
    console.log(data);
    drawBoxes(data);
  }
  getData();

  function drawBoxes(arr) {
    boxes.innerHTML = "";
    arr.forEach((element) => {
      boxes.innerHTML += `
      <span class="col col-sm-12 col-md-6 col-lg-4">
                <div class="proud border p-5 mb-5">
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
                        <a class="btn btn-primary" href="" onclick="deleteProud(${element.id},this)">Remove</a>
                      </div>
                    </div>
                  </div>
                </div>
              </span>`;
    });
  }

  async function deleteProud(id, btn) {
    await axios.delete(`${BASE_URL_FAV}/${id}`);
    btn.closest("span").remove();
  }