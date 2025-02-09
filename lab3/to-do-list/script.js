const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-group");
const form = document.querySelector(".card-body form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
})

function addTask() {
    if(inputBox.value === ''){
        alert("Start working!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.prepend(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener('click', (e) =>{

    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();

});

  

const saveData = () => localStorage.setItem("data", listContainer.innerHTML);

const showTask = () => listContainer.innerHTML = localStorage.getItem("data");


showTask();

