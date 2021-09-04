"use strict";

function renderTodos(todosArr) {
    domEl.ul.innerHTML = ``;

    todosArr.forEach(todo => {
        let li = document.createElement("li");

        li.setAttribute('data-id', `${todo.id}`);
        li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
        <div class="todo-remove-btn"><i class="far fa-trash-alt"></i></div>
        <div class="editTodo"><i class="fas fa-check"></i></i></div>
        `;

        domEl.ul.appendChild(li);

        li.querySelector('.todo-remove-btn').addEventListener("click", removeTodo);
        li.querySelector('.editTodo').addEventListener("click", toggleCompleted);
    })
    domEl.total.innerHTML = `${todosArr.length}`;
}

function addTodo() {

    let todoTitle = domEl.userInput.value;
    let todo = {
        title: todoTitle,
        completed: false
    };
    // todo.id = (todosArr.indexOf(todo))+1;

    if (todoTitle !== "") {

        //change server(db) state:
        fetch(`${apiRoot}/todos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then((response) => response.json())
            .then(todo => {
                //change local state:
                todosArr = [...todosArr, todo];
                renderTodos(todosArr);

            })
            .catch(err => console.error(err))
    }

    domEl.userInput.value = "";
    domEl.userInput.focus();
}

function removeTodo(evt) {
    // evt.preventDefault();

    // console.log(`evt.currentTarget : `);
    // console.log(evt.currentTarget);
    // console.log(`evt.currentTarget class is todo-remove-btn : ${evt.currentTarget.classList.contains(`todo-remove-btn`)}`);

    // console.log(`evt.target : `);
    // console.log(evt.target);
    // console.log(`evt.target classes are far and fa-trash-alt : ${evt.target.classList.contains(`far`, `fa-trash-alt`)}`);


    const liNode = evt.currentTarget.parentNode;
    const todoID = +liNode.dataset.id;

    //change server(db) state:

    fetch(`${apiRoot}/todos/${todoID}`, {method: "DELETE"})
        .then((response) => {

            //change local state:

            if (response.status === 200) {

                let idx = todosArr.findIndex(todo => todo.id === todoID);
                idx >= 0 && todosArr.splice(idx, 1);
                renderTodos(todosArr)
            }
        })
        .catch(err => console.error(err))


}

function toggleCompleted(evt) {
    // evt.preventDefault();

    // console.log(`evt.currentTarget : `);
    // console.log(evt.currentTarget);
    // console.log(`evt.currentTarget class is editTodo : ${evt.currentTarget.classList.contains(`editTodo`)}`);

    // console.log(`evt.target : `);
    // console.log(evt.target);
    // console.log(`evt.target classes are fas and fa-check : ${evt.target.classList.contains(`fas`, `fa-check`)}`);
    


    const liNode = evt.currentTarget.parentNode;
    const todoID = +liNode.dataset.id;

    // get todo object to be updated and toggle its completed prop:
	// if we've used the PATCH method that would not be needed, as we can
	// only send the new completed prop and todo id
    let idx = todosArr.findIndex(todo => todo.id === todoID);

    // make copy of updated todo object, because we do not want to modify local state before successfully updating server state
    const todoToggled = {...todosArr[idx]};
	todoToggled.completed = !todoToggled.completed;

    //change server(db) state:

    fetch(`${apiRoot}/todos/${todoID}`, {
        method: "PUT",
        headers: {
			'Content-Type': 'application/json'
		},
		body:JSON.stringify(todoToggled)
    })
        .then((response) => {

            //change local state:

            if (response.status === 200) {

                todosArr[idx] = todoToggled;
                renderTodos(todosArr)
            }
        })
        .catch(err => console.error(err))


}

let fetchTodos = function (apiRoot) {
    fetch(`${apiRoot}/todos`)
        .then((response) => response.json())
        .then(data => {
            todosArr = data;
            renderTodos(todosArr)
        })
        .catch(err => console.error(err))
}

let domEl = {
    userInput: document.querySelector(".todo-add > input"),
    addBtn: document.querySelector(".todo-add-btn"),
    ul: document.querySelector(".todo-items"),
    total: document.querySelector(".output")
}
let todosArr = [];
let apiRoot = `http://localhost:3000`;

window.addEventListener(`DOMContentLoaded`, function () {
    fetchTodos(apiRoot);
});

domEl.addBtn.addEventListener("click", addTodo);