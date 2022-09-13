let buttonMoon = document.querySelector(".btn");
let todolistEl = document.querySelector(".todolistEl");
let divImg = document.querySelector(".divImg");
let colors =[1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
let input = document.querySelector("input");
let itemLeave = document.querySelector(".itemLeave")
let trash = document.querySelector(".trash");
let form = document.querySelector("form")
let edit = document.querySelector(".edit");
let btn = document.querySelector(".add");
let todos = [];
let editId = -1 

//Dark mode 
buttonMoon.addEventListener("click", ()=>{
    document.body.classList.toggle("body");
     buttonMoon.classList.toggle("btnDark");
     divImg.classList.toggle("divImgDark");
     input.classList.toggle("inputDark");
     btn.classList.toggle("addDark");
});

 // Random color 
 const randColor = () =>{
     let col = "#";
     for (let i = 0; i < 6; i++) {
         col = col + colors[Math.floor(Math.random()*15)]
     }
     return col
 }
 if (todos.length == 0) {
    todolistEl.innerHTML = "Nothing task for today"
 }
 //add task
 form.addEventListener("submit", (e)=>{
     e.preventDefault();
     inputValue = input.value;
     isDupplicate = todos.some((todo_item) => todo_item.todoValue == inputValue);
     if (inputValue=="") {
         alert("Input is empty ! ")
        } 
        else if(isDupplicate){
            alert(inputValue + " exist ")
            form.reset()
        } else  if (editId >=0) {
             console.log(editId);
            todos = todos.map((todo, id) =>({
                ...todo,
                todoValue : editId == id ? input.value : todo.todoValue
            }))
            form.reset()
            editId = -1
         }else{
       todos.push({
          todoValue : inputValue,
          checked : false,
          color : randColor()
       })
       form.reset()
    }
    renderTask();
})

//Render task
const renderTask = () =>{
    todolistEl.innerHTML = todos.map((todo,id) =>{
        return `
        <li class="todoElement" id="${id}">
        <i class="bi- ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"  style="font-size:15px; color: ${todo.color}"  data-action="checked"></i>
             <p class="check ${todo.checked ? "checked" : " "}" data-action="checked">${todo.todoValue}</p>
             <i class="bi bi-pencil-square" data-action="edit" style="font-size:15px;"></i>
             <i class="bi bi-trash" data-action="trash" style="font-size:15px"></i>
      </li>     
    `
}).join(" ")
}

//get a task
todolistEl.addEventListener("click", (e) =>{
    let targetEl = e.target.parentNode;
        if (targetEl.className==="todoElement") {
          todoId = Number(targetEl.id);
      } 

 let action = e.target.dataset.action
     action==="checked" && checkedTodo(todoId)
     action==="edit" && editTodo(todoId)
     action==="trash" && trashTodo(todoId) 
})

//
const checkedTodo = (todoId) =>{
     todos = todos.map((items,id) =>({
         ...items,
         checked  :  todoId == id ? !items.checked : items.checked          
        }))
     
        renderTask()
    } 
    
    const editTodo = (todoId) =>{
        input.value = todos[todoId].todoValue;
        editId = todoId
} 

const trashTodo = (todoId) =>{
   todos.splice(todoId,1);
   editId= -1;
   renderTask()
} 