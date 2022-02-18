let addInput = document.querySelector(".add__input");
let addBtn = document.querySelector(".add__btn");
let listContainer = document.querySelector(".items__container");
let itemList = document.querySelector(".items__list");
let delBtn = document.querySelector(".delete__btn");

// FUNCTIONS ---------------------------------------------------
let storage = {
  toStorage: () =>
    localStorage.setItem("Shopping List", JSON.stringify(itemStore)) || [],

  fromStorage: () => JSON.parse(localStorage.getItem("Shopping List")) || [],
};

let storageFunctions = {
  showItems: () => {
    itemList.innerHTML = ""; //Show nothing as default
    if (itemStore.length > 0) {
      listContainer.style.display = "flex";
      delBtn.style.display = "flex";
    }
    for (item of itemStore) {
      itemList.innerHTML += `<li class="items__elm">${item}</li>`;
    }
  },

  deleteItems: () => {
    localStorage.clear();
    location.reload();
  },
};

const itemStore = storage.fromStorage();

addBtn.addEventListener("click", () => {
  itemStore.push(addInput.value);
  storage.toStorage();
  //alert(`${addInput.value} a été rajouté`);
  addInput.value = "";
  storageFunctions.showItems(); // To show new items on click
});

delBtn.addEventListener("click", () => {
  storageFunctions.deleteItems();
});

storageFunctions.showItems();
