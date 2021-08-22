let todosArr = [];
let apiUrl = `https://jsonplaceholder.typicode.com/todos`;

function renderTodos(todosArr) {
    domEl.ul.innerHTML = ``;
    todosArr.forEach( todo =>{
        let li = document.createElement("li");

        li.setAttribute('data-id', `${todo.id}`); 
        li.innerHTML = `
        <span class="${todo.completed?'completed':''}">${todo.title}</span>
        <div class="todo-remove-btn" id = ${todo.id}><i class="far fa-trash-alt"></i></div>
        `;
    
        domEl.ul.appendChild(li);
        li.addEventListener("click", removeTodo);
    })
    domEl.total.innerHTML= `${todosArr.length}`;
}

function addTodo(){
    
    let todoTitle = domEl.userInput.value;

    if(todoTitle !== ""){
        let todo = {
            title: todoTitle,
            completed: false
        };
    
        todosArr.push(todo)
        todo.id = (todosArr.indexOf(todo))+1;
    }

    domEl.userInput.value = "";
    domEl.userInput.focus();
    renderTodos(todosArr);
}

function removeTodo (evt){

    console.log(evt.currentTarget);
    console.log(evt.target);

    const liNode = evt.currentTarget;
	const todoID = +liNode.dataset.id;
	const removeBtnID = +evt.target.parentNode.id;
    

    if( removeBtnID === todoID){

        console.log(`remove`);
        let idx = todosArr.findIndex( todo => todo.id === todoID );
        console.log(idx);
		idx>=0 && todosArr.splice(idx,1);
        
        renderTodos(todosArr);
    }
    
}

fetch(`${apiUrl}`)
	.then( response => response.json() )
	.then( data => {
		todosArr = [...todosArr,...data];
		renderTodos(todosArr)
	} )
	.catch(err => console.error(err))

let domEl = {
    userInput : document.querySelector(".todo-add > input"),
    addBtn : document.querySelector(".todo-add-btn"),
    ul : document.querySelector(".todo-items"),
    total : document.querySelector(".output")
}

domEl.addBtn.addEventListener("click", addTodo);
