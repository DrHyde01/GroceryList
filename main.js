let addInput = document.querySelector(".add__input");
let addBtn = document.querySelector(".add__btn");
let listContainer = document.querySelector(".items__container");
let itemList = document.querySelector(".items__list");
let itemElm = "";
let delIcon = "";
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
    } else {
      listContainer.style.display = "none";
    }
    for (let item of itemStore) {
      itemElm = document.createElement("li");
      delIcon = document.createElement("ion-icon");
      itemElm.classList.add("items__elm");
      delIcon.classList.add("delete__icon");
      delIcon.setAttribute("name", "close-outline");
      itemElm.textContent = `${item}`;
      itemList.appendChild(itemElm);
      itemElm.appendChild(delIcon);
    }

    delIcon.addEventListener("click", () => {
      storageFunctions.deleteOneItem();
      storageFunctions.showItems();
    });
  },

  deleteOneItem: () => {
    let parentItem = itemElm.parentNode;
    let elmIndex = [...parentItem.children].indexOf(itemElm);
    itemStore.splice(elmIndex, 1);
    storage.toStorage();
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
  storageFunctions.showItems();
});

delBtn.addEventListener("click", () => {
  storageFunctions.deleteItems();
});

storageFunctions.showItems();
