
let lightmode = document.querySelector("#light");
let darkmode = document.querySelector("#dark");


let savedMode = localStorage.getItem("mode");

if (savedMode === "dark") {
    document.body.style.background = "radial-gradient(circle, #c1a5ce, #a18dc2, rgb(37, 18, 57))";
    document.body.style.color = "antiquewhite";

} else if (savedMode === "light") {
    document.body.style.background = "radial-gradient(circle, #c1a5ce, #a18dc2, rgb(130, 36, 231))";
document.body.style.color = "white";

}


darkmode.addEventListener("click", darkModeHandler);

function darkModeHandler() {
  let darkColor = "radial-gradient(circle, #c1a5ce, #a18dc2, rgb(37, 18, 57))";
    localStorage.setItem("mode", "dark");
    document.body.style.background = darkColor;
    document.body.style.color = "antiquewhite";
}


lightmode.addEventListener("click", lightModeHandler);

function lightModeHandler() {
    let lightColor = "radial-gradient(circle, #c1a5ce, #a18dc2, rgb(130, 36, 231))";
    localStorage.setItem("mode", "light");
    document.body.style.background = lightColor;
    document.body.style.color = "white";
}

