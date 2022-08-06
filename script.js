let input = document.querySelector(".inputNumber"),
  button1 = document.querySelector(".btn"),
  selectSort = document.querySelector(".selecter"),
  button2 = document.querySelector(".btn_more"),
  button3 = document.querySelector(".btn_less"),
  data = (newData = []);

button1.addEventListener("click", buttonClick1);
button2.addEventListener("click", buttonClick2);
button3.addEventListener("click", buttonClick3);

function buttonClick1() {
  input.value === ""
    ? alert("Введите число!")
    : input.value === "0"
    ? alert("Так не пойдет!")
    : getList();
  input.value = "";
}
async function getList() {
  let res = await fetch(`https://fakestoreapi.com/products` + `?limit=` + `${input.value}`);
  let data = await res.json();
  newData = data.map((neW) => {
    return neW;
  });
  button1.removeEventListener("click", buttonClick1);
  sort();
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
  printButton();
  let list = document.querySelector(".posts");
  for (key in newData) {
    list.innerHTML += `
        <div class="post">
          <h3 class="post_header">${newData[key].title}</h3>
          <strong class="price">Price: $ ${newData[key].price}</strong>
          <p class="description">Description: ${newData[key].description}</p>
          <img class="image" src="${newData[key].image}" width="200">
        </div>`;
  }
}

function printButton() {
  let cleaner = document.querySelector(".instruction");
  cleaner.innerHTML = "";
  let print = document.querySelector(".form1");
  button2.style.display = "block";
  button3.style.display = "block";
}

function refresh() {
  let list = document.querySelector(".posts");
  list.innerHTML = "";
}

function buttonClick2() {
  refresh();
  newData.sort((a, b) => b.price - a.price);
  print();
}

function buttonClick3() {
  refresh();
  newData.sort((a, b) => a.price - b.price);
  print();
}
