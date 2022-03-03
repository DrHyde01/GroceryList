let addInput = document.querySelector(".add__input");
let addBtn = document.querySelector(".add__btn");
let infoContainer = document.querySelector(".info");
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
      infoContainer.style.display = "none";
    } else {
      listContainer.style.display = "none";
      delBtn.style.display = "none";
      infoContainer.style.display = "flex";
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

      delIcon.addEventListener("click", (e) => {
        storageFunctions.deleteOneItem(e);
      });
    }
  },

  deleteOneItem: (e) => {
    const valueToDelete = e.target.parentNode.textContent; // Target the parent value
    const valueIndex = itemStore.indexOf(valueToDelete); // Search the index of the value in the array
    itemStore.splice(valueIndex, 1); // Delete the value and update the array
    storage.toStorage(); // Update the localStorage
    storageFunctions.showItems();
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
