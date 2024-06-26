import { v4 as uuidv4 } from "uuid";
import "../styles/styles.css";

function setupTodoApp() {
  const todoButton = document.querySelector("#add-todo-button");
  const todoInput = document.querySelector("#todo-title-input");
  const todoList = document.querySelector("#todo-list");
  let todoData;

  async function fetchToDoData() {
    try {
      const todoRequest = await fetch("http://localhost:8080/todos");
      const extractedTodoData = await todoRequest.json();
  
      console.log(extractedTodoData);
      todoData = extractedTodoData;
      setTodoListData();
    } catch(error) {
      todoData = [];
      console.error(error);
    }
  }

  fetchToDoData();

  async function createToDoData(todo) {
    try {
      const createToDoRequest = await fetch("http://localhost:8080/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const createToDoResponse = await createToDoRequest.json();

      todoData = createToDoResponse;
      setTodoListData();
    } catch(error) {
      console.error(error);
    }
  }

  async function removeTodo(id) {
    try {
      const deleteToDoRequest = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE"
      });
      const deleteToDoResponse = await deleteToDoRequest.json();

      todoData = deleteToDoResponse;
      setTodoListData();
    } catch(error) {
      console.log(error);
    }
  }

  function addItemToList(todo) {
    const listItem = `
    <li class="todo-list-item" data-todo-id="${todo.id}">
      <div class="todo-list-item__container">
        <h3  class="todo-list-item__headline">
        ${todo.title}
        </h3>
        <div class="todo-list-item__controls">
          <button class="todo-list-item__controls__delete" data-todo-id="${todo.id}">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg>
          </button>
        </div>
      </div>
    </li>
    `;

    todoList.insertAdjacentHTML("afterbegin", listItem);
  };

  function setTodoListData() {
    // for (let index = 0; index < todoData.length; index++) {
    //     addItemToList(todoData[index]);
    // }

    todoList.innerHTML = "";
    todoData.forEach(function(item, index) {
      addItemToList(todoData[index]);
    });

    const todoListElements = document.querySelectorAll("#todo-list li .todo-list-item__controls__delete");

    todoListElements.forEach(function(element) {
      element.addEventListener("click", function(event) {
        removeTodo(event.currentTarget.dataset.todoId);
      });
    });
  }

  function addTodo() {
    if (todoInput.value !== "") {
      const newTodo = {
        id: uuidv4(),
        title: todoInput.value
      };

      createToDoData(newTodo);
      todoInput.value = "";
    } else {
      alert("Bitte geben Sie einen Todo-Titel an.");
    }
  }

  todoButton.addEventListener("click", addTodo);
};

document.addEventListener("DOMContentLoaded", setupTodoApp);
