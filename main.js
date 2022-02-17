let addInput = document.querySelector(".add__input");
let addBtn = document.querySelector(".add__btn");
let itemList = document.querySelector(".items__list");

// Localstorage
let toStorage = () =>
  localStorage.setItem("Shopping List", JSON.stringify(itemStore)) || [];
let fromStorage = () => JSON.parse(localStorage.getItem("Shopping List")) || [];

const itemStore = fromStorage();

addBtn.addEventListener("click", () => {
  let inputValue = addInput.value;
  itemStore.push(inputValue);
  toStorage();
  alert(`${inputValue} a été rajouté`);
  addInput.value = "";
});

const showItems = () => {
  for (item of itemStore) {
    itemList.innerHTML += `<li>${item}</li>`;
  }
};
