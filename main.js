let addInput = document.querySelector(".add__input");
let addBtn = document.querySelector(".add__btn");
let itemList = document.querySelector(".items__list");
let delBtn = document.querySelector(".delete__btn");

// Localstorage
let toStorage = () =>
  localStorage.setItem("Shopping List", JSON.stringify(itemStore)) || [];
let fromStorage = () => JSON.parse(localStorage.getItem("Shopping List")) || [];

const itemStore = fromStorage();

addBtn.addEventListener("click", () => {
  itemStore.push(addInput.value);
  toStorage();
  //alert(`${addInput.value} a été rajouté`);
  addInput.value = "";
  showItems(); // To show new items on click
});

delBtn.addEventListener("click", () => {
  deleteItems();
});

const showItems = () => {
  itemList.innerHTML = ""; //Show nothing as default
  for (item of itemStore) {
    itemList.innerHTML += `<li class="items__elm">${item}</li>`;
  }
};

const deleteItems = () => {
  localStorage.clear();
  location.reload();
};
showItems();
