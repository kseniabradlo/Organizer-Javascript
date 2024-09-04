
let prevMonth = document.querySelector("#prev-month");
let currentMonth = document.querySelector("#current-month-year");
let nextMonth = document.querySelector("#next-month");
let daysBox = document.querySelector("#days-box");
let todayBtn = document.querySelector("#today");

let today = new Date();

function showCalendar(today) {
    let todayMonthNumber = today.getMonth();
    let todayYear = today.getFullYear();

    let firstDayOfCurrentWeek = new Date(todayYear, todayMonthNumber, 1).getDay();
    if (firstDayOfCurrentWeek === 0) firstDayOfCurrentWeek = 7; 

    let lastDayofCurrentMonth = new Date(todayYear, todayMonthNumber + 1, 0).getDate();

    let currentMonthName = today.toLocaleDateString("pl-PL", { month: "long", year: "2-digit" });
    currentMonth.textContent = currentMonthName;

    
    for (let i = 1; i < firstDayOfCurrentWeek; i++) {
      daysBox.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= lastDayofCurrentMonth; i++){
        let dayDiv = document.createElement("div");
        dayDiv.textContent = i;
        daysBox.append(dayDiv);

        if (
          i === today.getDate() &&
          todayMonthNumber === new Date().getMonth() &&
          todayYear === new Date().getFullYear()
        ) {
          dayDiv.style.backgroundColor = "rgba(141, 80, 130, 0.5)";
          dayDiv.style.borderRadius = "50%";
          dayDiv.style.padding = "5%";
          dayDiv.style.textAlign = "center";
        }
    }
}

prevMonth.addEventListener("click", function () {
    daysBox.innerHTML = "";
    today.setMonth(today.getMonth() - 1);
    if (currentMonth.textContent == "grudzień") {
      today.setYear(today.getFullYear() - 1);
    }
    showCalendar(today);
    
    
});

nextMonth.addEventListener("click", function () {
  daysBox.innerHTML = "";
    today.setMonth(today.getMonth() + 1);
     if (currentMonth.textContent == "styczeń") {
       today.setYear(today.getFullYear() + 1);
     }
  showCalendar(today);
});

todayBtn.addEventListener("click", function () {
    daysBox.innerHTML = "";
    let today = new Date();
    showCalendar(today);
})


showCalendar(today);