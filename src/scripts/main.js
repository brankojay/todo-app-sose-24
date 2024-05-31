import { v4 as uuidv4 } from "uuid";
import "../styles/styles.css";

function setupTodoApp() {
  const todoButton = document.querySelector("#add-todo-button");
  const todoInput = document.querySelector("#todo-title-input");
  const todoList = document.querySelector("#todo-list");
  const todoData = [
    {
      id: "82cd49ca-81a9-47d9-998e-83e5276e02e3",
      title: "Todo 1 Titel"
    },
    {
      id: "a92618ef-9df5-4649-9fb9-3a0389c5e411",
      title: "Todo 2 Titel"
    },
    {
      id: "91be7314-9013-437d-ae54-c51e7c00e4a1",
      title: "Todo 3 Titel"
    },
    {
      id: "5ce640cc-ee05-4da0-9694-e753af7d8029",
      title: "Todo 4 Titel"
    }
  ];

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

  setTodoListData();

  function addTodo() {
    if (todoInput.value !== "") {
      todoData.push({
        id: uuidv4(),
        title: todoInput.value
      });
      setTodoListData();

      todoInput.value = "";
    } else {
      alert("Bitte geben Sie einen Todo-Titel an.");
    }
  }

  function removeTodo(id) {
    const existingItem = todoData.find(function(item) {
      return item.id === id;
    });

    if (existingItem) {
      todoData.splice(todoData.indexOf(existingItem), 1);
      setTodoListData();
    }
  };

  todoButton.addEventListener("click", addTodo);
};

document.addEventListener("DOMContentLoaded", setupTodoApp);
