// Variables
const todoInput = document.getElementById("todo_input");
const todoButton = document.getElementById("todo_btn");
const todoList = document.getElementById("tasks_list");
let todoArray = [];
let selectedIndex = -1;

// Events
todoButton.addEventListener("click" ,function(){
    AddItem();
})

function GetItemsFromLocalStorage(){
    const todoItems = localStorage.getItem("todoList");
    //* convert string into array *//
    todoArray = JSON.parse(todoItems) || [];

    // Invoke DisplayItems Function
    DisplayItems(todoArray);
}

// Get Elements From Local Storage When I Open The Website
GetItemsFromLocalStorage()


function AddItem(){
    if (selectedIndex >= 0) {
        // Edit
        console.log(selectedIndex);
        todoArray[selectedIndex].text = todoInput.value;
        todoButton.innerHTML="Add";
        todoButton.classList.add("btn-outline-primary");
        todoButton.classList.remove("btn-success" , "text-white");
        showToast("Edited Successfully", 5000);
        selectedIndex = -1;
    } else {
        // Insert Tasks To Array
        todoArray.push({text:todoInput.value , isDone:false});
        showToast("Added Successfully", 5000);  // Shows the toaster for 5 seconds
    }


    // Invoke DisplayItems Function
    DisplayItems(todoArray)

    // Invoke SavedItemsInLocalStorage ==> To Save Items In Local Storage
    SavedItemsInLocalStorage()
    
    // Clear The Input
    todoInput.value='';
    
}

function DisplayItems(list){
    let items = "";
    for(let i=0; i<list.length; i++){
        const doneClass = list[i].isDone ? 'done' : '';  // Check if the item is marked as done
        const doneLiClass = list[i].isDone ? 'liDone' : '';  // Check if the item is marked as done
        
        items+=`
        <li class="d-flex justify-content-between align-items-center ${doneLiClass}"> <span class="${doneClass}">${list[i].text}</span>
        <div class="d-flex align-items-center gap-2">
        <i onclick="IsDone(${i})" class="fa-solid fa-check text-success"></i>
        <i onclick="EditItem(${i})" class="fa-solid fa-pen-to-square text-warning"></i>
        <i onclick="RemoveItem(${i})"  class="fa-regular fa-trash-can text-danger text-end d-block"></i> 
        </div></li>
        `
    }
    
    // Add Elements of Li To Ul
    todoList.innerHTML=items;

    if(! todoArray.length){
        todoList.innerHTML = `<p class="alert alert-danger my-3">No Tasks Here</p>`
    }
}

function RemoveItem(index){
    todoArray.splice(index,1);
    DisplayItems(todoArray);
    SavedItemsInLocalStorage();
    showToast("Removed Successfully", 5000);
}

function IsDone(index){
    todoArray[index].isDone = !todoArray[index].isDone;
    DisplayItems(todoArray);
    SavedItemsInLocalStorage();
    showToast("Task Done Successfully", 5000);
}

function EditItem(index){
    selectedIndex = index;
    todoInput.value=todoArray[index].text;
    todoButton.innerHTML="Edit";
    todoButton.classList.add("btn-success" , "text-white");
    todoButton.classList.remove("btn-outline-primary");
    DisplayItems(todoArray);
    SavedItemsInLocalStorage();
}

function SavedItemsInLocalStorage(){
    //* convert array to string *//
    const todoItems = JSON.stringify(todoArray);
    localStorage.setItem("todoList",todoItems);
}

function showToast(message, duration = 3000) {
    const toaster = document.getElementById('toaster');
    toaster.innerText = message;
    toaster.classList.add('show');
  
    setTimeout(() => {
      toaster.classList.remove('show');
    }, duration);
  }
  

  