"use strict";

function storeLocally(todosArr){
    localStorage.setItem('todos',JSON.stringify(todosArr));
}

function renderTodos(todosArr) {
    domEl.ol.innerHTML = ``;
    domEl.ol.type.value

    todosArr.forEach(todo => {
        let li = document.createElement("li");

        li.setAttribute('data-id', `${todo.id}`);
        li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
        <div class="todo-remove-btn" id = ${todo.id}><i class="far fa-trash-alt"></i></div>
        <div class="editTodo"><i class="fas fa-check"></i></div>
        `;

        domEl.ol.appendChild(li);
        li.addEventListener("click", removeTodo);
        li.addEventListener("click", toggleCompleted);
    })
    domEl.total.innerHTML = `${todosArr.length}`;
}

function addTodo() {

    let todoTitle = domEl.userInput.value;
    if (!todoTitle) return;

    // let currentLastTodoID = todosArr[todosArr.length-1].id;
    const id = todosArr.length ? todosArr[todosArr.length-1].id + 1 : 1;

    let todo = {
        // id: currentLastTodoID+1,
        id: id,
        title: todoTitle,
        completed: false
    };

    todosArr = [...todosArr, todo];

    domEl.userInput.value = "";
    domEl.userInput.focus();

    storeLocally(todosArr);
    renderTodos(todosArr);
}

function removeTodo(evt) {

    console.log(evt.currentTarget);
    console.log(evt.target);

    const liNode = evt.currentTarget;
    const todoID = +liNode.dataset.id;
    const removeBtnID = +evt.target.parentNode.id;

    // if({evt.target.classList.contains(`fas`, `fa-check`)){

    // }
    if (removeBtnID === todoID) {

        let idx = todosArr.findIndex(todo => todo.id === todoID);
        
        idx >= 0 && todosArr.splice(idx, 1);
        
        storeLocally(todosArr);
        renderTodos(todosArr);
    }
}

function toggleCompleted(evt) {

    console.log(evt.currentTarget);
    console.log(evt.target);

    const liNode = evt.currentTarget;
    const todoID = +liNode.dataset.id;

    if(evt.target.classList.contains(`fas`, `fa-check`)){

        let idx = todosArr.findIndex(todo => todo.id === todoID);
        todosArr[idx].completed = !todosArr[idx].completed;

        storeLocally(todosArr);
        renderTodos(todosArr);
    }
}

// let apiUrl = `https://jsonplaceholder.typicode.com/todos`;
// (function fetchTodos(){
//     fetch(`${apiUrl}`)
//     .then(response => response.json())
//     .then(data => {

//         //if the following code is used undefined is added to the end of the array?! (todosArr = undefined)
//         todosArr = [...todosArr, data];
//         console.log(todosArr);
        
//         //if the following code is used upon refresh the changes are not rendered BUT are still kept in Local Storage...
//         todosArr = data;
//         console.log(todosArr);

//         // localStorage.setItem('todos',JSON.stringify(todosArr));

//         renderTodos(todosArr)
//     })
//     .catch(err => console.error(err))
// })();

let domEl = {
    userInput: document.querySelector(".todo-add > input"),
    addBtn: document.querySelector(".todo-add-btn"),
    ol: document.querySelector(".todo-items"),
    total: document.querySelector(".output")
}
let localStorage = window.localStorage;
let todosArr = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', event=>{
	renderTodos(todosArr);
});

domEl.addBtn.addEventListener("click", addTodo);