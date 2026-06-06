let habits = JSON.parse(localStorage.getItem("habits")) || [];

let currentFilter = "all";
let habitName = document.querySelector('#habitName');

let addBtn = document.querySelector('#addBtn');
let habitContainer = document.querySelector('#habitContainer');
let totalHabits = document.querySelector("#totalHabits");
let completedHabits = document.querySelector("#completedHabits");
let pendingHabits = document.querySelector("#pendingHabits");

let allBtn = document.querySelector("#allBtn");
let completedBtn = document.querySelector("#completedBtn");
let pendingBtn = document.querySelector("#pendingBtn");

renderHabits(currentFilter);

addBtn.addEventListener('click', function () {

    let name = habitName.value;


    if (name.trim() === "") {
        return;
    }

    let habit = {
        name: name,
        complete: false,
        createdAt: new Date().toLocaleDateString()
    };

    habits.push(habit);

    

    refreshApp();

    habitName.value = "";

});


function createHabit(habit) {
    let div = document.createElement("div");
    let statusText = document.createElement("span");

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    doneBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        habit.complete = !habit.complete;


        updateStatusText(habit, statusText);
        
        updateCounts();

        refreshApp();
    });

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        
        habits = habits.filter(function (thing) {
            return thing !== habit;
        });
       refreshApp();
    });

    editBtn.addEventListener("click", function () {
        let newName = prompt("Edit habit:", habit.name);

        if (newName === null) {
            return;
        }
        if (newName.trim() === "") {
            return;
        }

        habit.name = newName;

        refreshApp();
    });



    updateStatusText(habit, statusText);

    div.appendChild(statusText);
    div.appendChild(doneBtn);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);

    habitContainer.appendChild(div);
    
}


function updateStatusText(habit, statusText) {
    if (habit.complete) {
        statusText.textContent = habit.name + " - " + 'done, ' + 'Added:' + habit.createdAt;
    } else {
        statusText.textContent = habit.name + " - " + 'pending, ' + 'Added:' + habit.createdAt;
    }
}

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function updateCounts() {
    totalHabits.textContent = "Total Habits: " + habits.length;

    let completedHabitCount = 0;
    let pendingHabitCount = 0;
    for (let i = 0; i < habits.length; i++) {
        if (habits[i].complete) {
            completedHabitCount += 1;
        } else {
            pendingHabitCount += 1;
        }
    }
    completedHabits.textContent = "Completed Habits: " + completedHabitCount;
    pendingHabits.textContent = "pending Habits: " + pendingHabitCount;
}

clearAll.addEventListener('click', function () {
    habits = [];
    habitContainer.innerHTML = "";

    updateCounts();

    refreshApp();
});

function renderHabits(filterType) {
    habitContainer.innerHTML = "";

    for (let i = 0; i < habits.length; i++) {
        let habit = habits[i];
        if (filterType === "all") {
            createHabit(habit);

        }
        if (filterType === "completed" && habit.complete) {
            createHabit(habit);
        }
        if (filterType === "pending" && !habit.complete) {
            createHabit(habit);
        }

    }
     updateCounts();
}

allBtn.addEventListener("click", function () {
    currentFilter = "all";
    renderHabits(currentFilter);
});

completedBtn.addEventListener("click", function () {
    currentFilter = "completed";
    renderHabits(currentFilter);
});

pendingBtn.addEventListener("click", function () {
    currentFilter = "pending";
    renderHabits(currentFilter);
});

function refreshApp() {
    saveHabits();
    renderHabits(currentFilter);
}