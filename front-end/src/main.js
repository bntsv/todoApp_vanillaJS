let domEl = {
    // todoTitle : document.querySelector(".todo-add > input").value,
    addBtn : document.querySelector(".todo-add-btn"),
    ul : document.querySelector(".todo-items"),
    total : document.querySelector(".output")
}

let todosArr = [];

class TodoObj {
    constructor(){
        this.title;
        this.id;
    }
}

TodoObj.prototype.removeTodo = function (evt){
    
    console.log(evt.currentTarget.id);
    console.log(evt.target.id);

    if(evt.target.id === evt.currentTarget.id){

        console.log(`remove`);


        // todosArr[evt.target.id] = {};
            
        // todosArr.length--;
        // domEl.total.innerHTML= `${todosArr.length}`;
    }
    
}

function addTodo(){
    
    let todo = new TodoObj();
    todo.title = document.querySelector(".todo-add > input").value;
    todosArr.push(todo)
    todo.id = (todosArr.indexOf(todo))+1;

    console.log(todo);

    let li = document.createElement("li");
    // li.setAttribute('data-id', `${todo.id}`); 
    li.innerHTML = `<span>${todo.id}. ${todo.title}</span><div class="todo-remove-btn" id = ${todo.id}><i class="far fa-trash-alt"></i></div>`;

    domEl.ul.appendChild(li);

    document.querySelector(".todo-add > input").value = "";
    domEl.total.innerHTML= `${todosArr.length}`;

    return todo;
}

domEl.addBtn.addEventListener("click", addTodo);


if (todosArr.length>0){
    
    // let li = document.querySelector(".todo-items>li");

    // function removeTodo(evt){
    //     console.log(evt.currentTarget.id);
    //     console.log(evt.target.id);

    //     if(evt.target.id === evt.currentTarget.id){

    //         console.log(`remove`);


    //         todosArr[evt.target.id] = {};
            
    //         todosArr.length--;
    //         domEl.total.innerHTML= `${todosArr.length}`;
    //     }
    
    // }
    let removeBtn = document.querySelector(".todo-remove-btn");
    removeBtn.addEventListener("click", addTodo().removeTodo);
}
