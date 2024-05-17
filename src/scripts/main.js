import "../styles/styles.css";

function setupTodoApp() {
  const todoButton = document.querySelector("#add-todo-button");
  const todoInput = document.querySelector("#todo-title-input");
  const todoList = document.querySelector("#todo-list");

  function addTodo() {
    const newListItem = document.createElement("li");

    if (todoInput.value !== "") {
      newListItem.innerText = todoInput.value;
      todoList.appendChild(newListItem);
  
      todoInput.value = "";
    } else {
      alert("Bitte geben Sie einen Todo-Titel an.");
    }
  }

  todoButton.addEventListener("click", addTodo);
};

document.addEventListener("DOMContentLoaded", setupTodoApp);
