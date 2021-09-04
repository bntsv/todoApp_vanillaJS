function renderTodos(todosArr) {
    domEl.ul.innerHTML = ``;
    todosArr.forEach(todo => {
        let li = document.createElement("li");

        li.setAttribute('data-id', `${todo.id}`);
        li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
        <div class="todo-remove-btn" id = ${todo.id}><i class="far fa-trash-alt"></i></div>
        <div class="editTodo"><i class="fas fa-check"></i></div>
        `;

        domEl.ul.appendChild(li);
        li.addEventListener("click", removeTodo);
        li.addEventListener("click", toggleCompleted);
    })
    domEl.total.innerHTML = `${todosArr.length}`;
}

function addTodo() {

    let todoTitle = domEl.userInput.value;
    if (!todoTitle) return;

    let currentLastTodoID = todosArr[todosArr.length-1].id;

    let todo = {
        id: currentLastTodoID+1,
        title: todoTitle,
        completed: false
    };

    console.log(todo.id);
    todosArr.push(todo)

    domEl.userInput.value = "";
    domEl.userInput.focus();
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

        // console.log(`remove`);
        let idx = todosArr.findIndex(todo => todo.id === todoID);
        // console.log(idx);
        idx >= 0 && todosArr.splice(idx, 1);

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

        renderTodos(todosArr);
    }
}

let apiUrl = `https://jsonplaceholder.typicode.com/todos`;
(function(){
    fetch(`${apiUrl}`)
    .then(response => response.json())
    .then(data => {
        todosArr = [...todosArr, ...data];
        renderTodos(todosArr)
    })
    .catch(err => console.error(err))
})();

let domEl = {
    userInput: document.querySelector(".todo-add > input"),
    addBtn: document.querySelector(".todo-add-btn"),
    ul: document.querySelector(".todo-items"),
    total: document.querySelector(".output")
}
let todosArr = [];

domEl.addBtn.addEventListener("click", addTodo);