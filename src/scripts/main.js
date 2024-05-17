import "../styles/styles.css";

function setupTodoApp() {
  const todoButton = document.querySelector("#add-todo-button");
  const todoInput = document.querySelector("#todo-title-input");
  const todoList = document.querySelector("#todo-list");

  function addTodo() {
    const newListItem = document.createElement("li");

    newListItem.innerText = todoInput.value;
    todoList.appendChild(newListItem);
  }

  todoButton.addEventListener("click", addTodo);
};

document.addEventListener("DOMContentLoaded", setupTodoApp);
