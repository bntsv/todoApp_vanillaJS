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
    let todo = {
        title: todoTitle,
        completed: false
    };
    // todo.id = (todosArr.indexOf(todo))+1;

    if(todoTitle !== ""){
        
        //change server(db) state:
        fetch(`${apiRoot}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(todo)
                })
            .then((response)=>response.json())
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

function removeTodo (evt){

    // console.log(evt.currentTarget);
    // console.log(evt.target);

    const liNode = evt.currentTarget;
	const todoID = +liNode.dataset.id;
	// const removeBtnID = +evt.target.parentNode.id;
    
    //change server(db) state:

    fetch(`${apiRoot}/todos/${todoID}`, {
        method: "DELETE"
    })
        .then((response)=>{

            //change local state:
    
            if( response.status === 200){
                let idx = todosArr.findIndex( todo=> todo.id === todoID);
                idx >=0 && todosArr.splice(idx,1);
                renderTodos(todosArr) 
            }
        })
        .catch(err => console.error(err))
}

let fetchTodos = function(apiRoot){
    fetch(`${apiRoot}/todos`)
        .then((response)=>response.json())
        .then( data=> {
            todosArr = data;
            renderTodos(todosArr)
        } )
        .catch(err => console.error(err))
}

// let apiUrl = `https://jsonplaceholder.typicode.com/todos`;

// fetch(`${apiUrl}`)
// 	.then( response => response.json() )
// 	.then( data => {
// 		todosArr = [...todosArr,...data];
// 		renderTodos(todosArr)
// 	} )
// 	.catch(err => console.error(err))

let domEl = {
    userInput : document.querySelector(".todo-add > input"),
    addBtn : document.querySelector(".todo-add-btn"),
    ul : document.querySelector(".todo-items"),
    total : document.querySelector(".output")
}
let todosArr = [];
let apiRoot = `http://localhost:3000`;

window.addEventListener(`DOMContentLoaded`, function(){
    fetchTodos(apiRoot);
});

domEl.addBtn.addEventListener("click", addTodo);
