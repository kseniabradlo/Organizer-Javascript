let date = new Date();

let optionsDate = {
  month: "long",
  weekday: "short",
  day: "numeric",
};

let optionsTime = {
  hour: "numeric",
  minute: "numeric",
};

let dateOnly = date.toLocaleDateString("pl-PL", optionsDate);
let timeOnly = date.toLocaleTimeString("pl-PL", optionsTime);

document.querySelector("#date").innerHTML = dateOnly;
document.querySelector("#time").innerHTML = timeOnly;
