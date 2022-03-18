const getId = (id) => document.getElementById(id);
const className = (className) => document.getElementsByClassName(className);
const querySelect = (querySelect) => document.querySelector(querySelect);
const querySelectAll = (querySelectAll) =>
  document.querySelectorAll(querySelectAll);

const theme = getId("theme"),
  newItemInput = getId("addItem");

const Body = querySelect("body"),
  todoList = querySelect(".content ul"),
  itemsLeft = querySelect(".items-left span");
clear = querySelect(".clear");

const todos=querySelectAll('.list-item input[type="checkbox"]')
filter = querySelectAll(".filter input");

// length of todo's in the list
itemsLeft.innerText = todos.length;

// Event Listener
theme.addEventListener("click", () => {
  Body.classList = [theme.checked ? "theme-light" : "theme-dark"];
});

// Event Listener
newItemInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && newItemInput.value.length > 0) {
    createNewElement(newItemInput.value);
    newItemInput.value = "";
  }
});

function createNewElement(text) {
  const elem = document.createElement("li");
  elem.classList.add("flex-row");

  elem.innerHTML = `
            <label class="list-item">
              <input type="checkbox" name="todoItem" />
              <span class="checkmark"></span>
              <span class="text">${text}</span>
            </label>
            <span class="remove"></span> 
    `;

  if (
    document.querySelector(".filter input[type='radio']:checked").id ===
    "completed"
  ) {
    elem.classList.add("hidden");
  }
  todoList.append(elem);
  updateItemsCount(1);
}

function updateItemsCount(number) {
  itemsLeft.innerText = +itemsLeft.innerText + number;
}

// Remove Todo items
function removeTodoItem(elem) {
  elem.remove();
  updateItemsCount(-1);
}

// Event Listener
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    removeTodoItem(event.target.parentElement);
  }
});

// Clear Completed Items
clear.addEventListener("click", () => {
  document
    .querySelectorAll(".list-item input[type='checkbox']:checked")
    .forEach((item) => {
      removeTodoItem(item.closest("li"));
    });
});

// Filter Todos
filter.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    filterTodos(e.target.id);
  });
});

function filterTodos(id) {
  const allItems = todoList.querySelectAll("li");

  switch (id) {
    case "all":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((item) => {
        item.querySelect("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
    default:
      allItems.forEach((item) => {
        !item.querySelect("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
  }
}
