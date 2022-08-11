let input = document.querySelector(".inputNumber"),
  selectSort = document.querySelector(".selecter"),
  buttonAdd = document.querySelector("#add"),
  buttonMore = document.querySelector(".more"),
  buttonLess = document.querySelector(".less"),
  buttonClear = document.querySelector(".clear"),
  data = (newData = []);

buttonAdd.addEventListener("click", AddProducts);
buttonMore.addEventListener("click", SortMore);
buttonLess.addEventListener("click", SortLess);
buttonClear.addEventListener("click", ClearProducts);

function AddProducts() {
  input.value === "" ? alert("Введите число от 1 до 20!") : input.value === "0" ? alert("Так не пойдет!") : getList();
  input.value = "";
}
async function getList() {
  let res = await fetch(`https://fakestoreapi.com/products` + `?limit=` + `${input.value}`);
  let data = await res.json();
  newData = data.map((neW) => {
    return neW;
  });
  sort();
  document.querySelector(".f2").style.display="none";
  document.querySelector(".f1").style.display="flex";
}

function ClearProducts() {
  refresh();
  document.querySelector(".f2").style.display="flex";
  document.querySelector(".f1").style.display="none";
}

function sort() {
  selectSort.value === "less$"
    ? newData.sort((a, b) => a.price - b.price)
    : selectSort.value === "more$"
    ? newData.sort((a, b) => b.price - a.price)
    : newData;
  print();
}

function print() {
  let list = document.querySelector(".posts");
  for (key in newData) {
    list.innerHTML += `
        <div class="post">
          <h3 class="post_header">${newData[key].title}</h3>
          <p class="price">Price: $ ${newData[key].price}</p>
          <p class="description">Description: ${newData[key].description}</p>
          <img class="image" src="${newData[key].image}" width="200">
        </div>
        `;
  }
}


function refresh() {
  let list = document.querySelector(".posts");
  list.innerHTML = "";
}

function SortMore() {
  refresh();
  newData.sort((a, b) => b.price - a.price);
  print();
}

function SortLess() {
  refresh();
  newData.sort((a, b) => a.price - b.price);
  print();
}
