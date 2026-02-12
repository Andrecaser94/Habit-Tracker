var realDate = new Date();
var realMonth = realDate.getMonth();
var realYear = realDate.getFullYear();
 
 /*GET THE DATE*/
var date = new Date();
console.log(date);

/*EXTRACT THE CURRENT*/
var currentMonth = date.getMonth();
var currentDay = date.getDate();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth);
console.log(currentDay);
console.log(currentDate);
console.log(currentYear);

/*IMPOTANT DATE INFO*/
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


/*SET THE CORRECT MONTH*/
var title = document.getElementById("title");
title.innerHTML = "🌸" + months[currentMonth] + "🌸";

/*UPDATE THE CALENDAR INFO*/
var habitTitle = document.getElementById("habitTitle");

window.onload = function() {
    let savedHabit = localStorage.getItem("myHabit");
    if (savedHabit) {
        habitTitle.innerHTML = savedHabit;
    }
};

habitTitle.onclick = function () {
    let habits = prompt(`What's your habit?`, habitTitle.innerHTML);

    if(!habits || habits.trim().length === 0){
        habitTitle.innerHTML = "Clic to set your habit";
        localStorage.removeItem("myHabit");
    } else {
        habitTitle.innerHTML = habits;
        localStorage.setItem("myHabit", habits);
    }
};

/* SET THE TOTAL DAYS */
var daysInTheMonthList = [31,28,31,30,31,30,31,31,30,31,30,31];
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");

/*SET UP CALENDAR DAYS*/
var dayCount = 0;
var rowcount = 0;
var days = document.getElementsByClassName("days");

for (var i = 0; i < days.length; i++) {
    var day = days[i].getElementsByClassName("day");

    for (var j = 0; j < day.length; j++) {

        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].id = "day" + (dayCount + 1);

            if (dayCount === currentDate - 1) {
                day[j].style.color = "rgb(234, 1, 144)";
                day[j].style.border = "2px solid black";
            }
          dayCount++;
        } else {
            day[j].innerHTML = "";
            day[j].style.backgroundColor = "white";
        }
    }
}

/* INITIALIZED COMPLETED ARRAY*/

var completed = new Array(31);
for (var i = 0; i < dayCount; i++) {
    var tempString = 
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

console.log("completed array: " + completed);
console.log("total days completed: " + daysCompleted);

/*CHECK STORAGE AND UPDATE COMPLETED ARRAY*/

for(var i = 0; i < dayCount; i++) {
    var tempString =
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ": " + chosenDay);
    var chosenDayDiv = document.getElementById("day" + (i + 1));
    if (chosenDayDiv) { 
    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "pink";
    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "white";
    }
  }
}
/*UPDATE COMPLETED ON CALENDAR*/
var dayDivs = document.querySelectorAll(".day");
for (var i = 0; i < dayCount; i++){
    dayDivs[i].onclick = function (e) {
        var today = new Date();
        today.setHours(0,0,0,0);

        var clickedDay = parseInt(e.target.innerText);
        var clickedDate = new Date(currentYear, currentMonth, clickedDay);

      if (clickedDate > today) {
      return; 
}

        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = 
        "" + (currentMonth + 1) + "-" + num + "-" + currentYear;

        if (localStorage.getItem(storageString) === "false"){
           selectedDate.style.backgroundColor = "pink";
           localStorage.setItem(storageString, true);
           daysCompleted++;
        } else if(localStorage.getItem(storageString) === "true"){
          selectedDate.style.backgroundColor = "white";
          localStorage.setItem(storageString, false);
          daysCompleted--;
        }

        totalDays.innerHTML = daysCompleted + "/" + dayCount;
        console.log(daysCompleted, currentDate);
        if (daysCompleted === dayCount) {
        alert("Great progress");
      }
    }
    
}



/*RESET BUTTON*/

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
        var tempStrings =
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        console.log(tempStrings);
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor = "white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
};

/*BACK TO THE LAST MONTH*/
function renderCalendar(month, year) {
    currentMonth = month;
    currentYear = year;
    title.innerHTML = "🌸" + months[currentMonth] + "🌸";
    daysInThisMonth = daysInTheMonthList[currentMonth];
    daysCompleted = 0;
    dayCount = 0;
    var dayDivs = document.querySelectorAll(".day");
    dayDivs.forEach(day => {
        day.innerHTML = "";
        day.style.backgroundColor = "white";
        day.style.border = "none";
        day.style.color = "black";
    });
    
     for (let i = 0; i < dayDivs.length; i++) {
        if (dayCount < daysInThisMonth) {
            let num = dayCount + 1;
            dayDivs[i].innerHTML = num;
            dayDivs[i].id = "day" + num;

            if (
            currentMonth === realMonth &&
            currentYear === realYear &&
            num === today.getDate()
            ) {
            dayDivs[i].style.color = "rgb(234, 1, 144)";
            dayDivs[i].style.border = "2px solid black";
          }


            let key = (currentMonth + 1) + "-" + num + "-" + currentYear;
            if (localStorage.getItem(key) === "true") {
                dayDivs[i].style.backgroundColor = "pink";
                daysCompleted++;
            }

            dayCount++;
        }
    }

    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
    addClickEvents(daysInThisMonth);
}

function addClickEvents(daysInMonth) {

    var dayDivs = document.querySelectorAll(".day");

    for (let i = 0; i < daysInMonth; i++) {

        dayDivs[i].onclick = function (e) {

            var today = new Date();
            today.setHours(0,0,0,0);

            var clickedDay = parseInt(e.target.innerText);
            var clickedDate = new Date(currentYear, currentMonth, clickedDay);

            if (clickedDate > today) return;

            var storageString =
                (currentMonth + 1) + "-" + clickedDay + "-" + currentYear;

            if (localStorage.getItem(storageString) === "true") {
                e.target.style.backgroundColor = "white";
                localStorage.setItem(storageString, "false");
                daysCompleted--;
            } else {
                e.target.style.backgroundColor = "pink";
                localStorage.setItem(storageString, "true");
                daysCompleted++;
            }

            totalDays.innerHTML = daysCompleted + "/" + daysInMonth;
        };
    }
}

   

var backButton = document.getElementById("backButton");
backButton.onclick = function () {

let visibleDate = new Date(currentYear, currentMonth);
let limitDate = new Date(realYear, realMonth - 1);

    if (visibleDate <= limitDate) {
        return;
    }

    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentMonth, currentYear);
};


var nextButton = document.getElementById("nextButton");
nextButton.onclick = function () {

 if (currentMonth === realMonth && currentYear === realYear) {
        return;
}

currentMonth++;

  if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

renderCalendar(currentMonth, currentYear);
};
