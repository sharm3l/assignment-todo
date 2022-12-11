async function main() {
  const addButton = document.getElementById("addButton");
  const list = document.getElementById("list");
  const text = document.getElementById("typed-text");

  // when user adds a todo list item
  async function addListItem() {
    const typedText = text.value;

    // when user didnt give me any value i will not proceed
    if (typedText === "") {
      return Promise.resolve([]);
    }

    return addItem(typedText);
  }

  // I render the list of items and add listener to each one of them
  function renderList(data) {
    // I make the list empty first
    list.innerHTML = "";

    // then Im going trough all list items
    data.forEach((item) => {
      const newLi = document.createElement("li");

      newLi.setAttribute("data-id", item._id);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("fa-solid", "fa-trash-can");

      newLi.innerHTML = "<input type='checkbox'>" + item.description;

      list.appendChild(newLi);
      newLi.appendChild(deleteButton);

      // add event listener
      addRemoveListener(deleteButton);
    });
  }

  // I retrieve all data and start rendering them
  async function createList() {
    // get the list data
    const data = await getData();
    // render the data given by endpoint
    renderList(data);
  }

  function addRemoveListener(element) {
    element.addEventListener("click", async (event) => {
      event.stopPropagation();

      const parent = event.target.closest("li");
      const id = parent.getAttribute("data-id");

      const response = await deleteItem(id);
      if (response) {
        parent.remove();
      }
    });
  }

  // I store the todo item given only when the user clicks the button
  addButton.addEventListener("click", async function () {
    await addListItem();
    createList();
    text.value = "";
  });

  // when load/refresh the page shows all items in the todo list
  createList();
}

document.addEventListener("load", main());
