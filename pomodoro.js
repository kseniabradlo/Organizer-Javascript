let workBtn = document.querySelector("#work");
let breakBtn = document.querySelector("#break");

let initWorkTime = 25;
let breakTime = 5;

let seconds = "00";

let minutesDiv = document.querySelector("#minutes");
minutesDiv.innerHTML = initWorkTime;

let secondsDiv = document.querySelector("#seconds");
secondsDiv.innerHTML = seconds;

let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
restartBtn.style.display = "none";

let intervalId;

function start() {
    workBtn.style.color = "violet";

    startBtn.style.display = "none";
    restartBtn.style.display = "block";

    seconds = 59;

    let workMinsCounter = initWorkTime - 1;
    let breakMinsCounter = breakTime - 1;

    let breakCount = 0;

    function tick() {
        minutesDiv.innerHTML = workMinsCounter;
        secondsDiv.innerHTML = seconds;

        seconds = seconds - 1;

    
        if (seconds === 0) {
            workMinsCounter = workMinsCounter - 1;
            if (workMinsCounter === -1) {
                if (breakCount % 2 === 0) {
                    workMinsCounter = breakTime;
                    breakCount++;
                    workBtn.style.color = "white";
                    breakBtn.style.color = "violet";

                } else {
                    workMinsCounter = initWorkTime;
                    breakCount++;

                    workBtn.style.color = "violet";
                    breakBtn.style.color = "white";
                }
            }
                    seconds = 59;

        }
    }

  intervalId = setInterval(tick,1000)
}

startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", function () {
    clearInterval(intervalId);
    minutesDiv.innerHTML = initWorkTime;
    secondsDiv.innerHTML = "00";
    start();
});

document.querySelector("#stop").addEventListener("click", function () {
        clearInterval(intervalId);

})