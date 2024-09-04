
let weatherSection = document.querySelector("#weather-section");
let img = document.querySelector("#weatherImg");
let city = document.querySelector("#city");
let description = document.querySelector("#description");
let temp = document.querySelector("#temp");
let feelsLike = document.querySelector("#feels-like");
let otherCityInp = document.querySelector("#input-other-city");
let otherCityBtn = document.querySelector("#check-other-city-btn");
let otherCityVal;
let longtermWeatherDiv = document.querySelector("#longterm-weather-wrapper");
let longtermOneDayWeatherDiv;

let myApiKey = "96b01a1f2ccf430696217afa3bdbfd1a"
let urlBydefault = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Warsaw&lat=52.2296756&lon=21.0122287&appid=${myApiKey}&lang=pl`;

function fetchData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((jsoneddata) => renderWeather(jsoneddata))
      .catch((error) => console.log(error.message)); 
}


function renderWeather(data) {
    let icon = data.weather[0].icon;
    img.src = `http://openweathermap.org/img/w/${icon}.png`;
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    feelsLike.innerHTML = "odczuwalna: " + Math.round(data.main.feels_like) + "°C";
}

fetchData(urlBydefault); 


let urlBydefaultLongterm = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=Warsaw&appid=96b01a1f2ccf430696217afa3bdbfd1a&lang=pl`;

function fetchLongtermData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((jsoneddata) => {
            return weatherDailyHandler(jsoneddata);
        })
        .then((finalArray) => {
            renderLongtermData(finalArray);
        })
        .catch((error) => console.log(error.message));
}


function weatherDailyHandler(jsoneddata) {
    let list = jsoneddata.list;
    let uniqueObjs = {};
    let finalArray;

    list.forEach((element) => {
      let date = new Date(element.dt * 1000).toLocaleDateString("pl-PL", {
        month: "numeric",
        weekday: "short",
        day: "numeric",
      });
        let temp = element.main.temp;
    
      if (!uniqueObjs[date]) {
        uniqueObjs[date] = {
          count: 1,
          summarytemp: temp,
        };
      } else {
        uniqueObjs[date].count += 1;
        uniqueObjs[date].summarytemp += temp;
      }

      finalArray = Object.keys(uniqueObjs).map((date) => {
        return {
          date: date,
          avgTemp: (
            uniqueObjs[date].summarytemp / uniqueObjs[date].count
          ).toFixed(2),
        };
      });
    });



 return finalArray;
}


function renderLongtermData(finalArray) {
    
    finalArray.forEach(el => {
       
        longtermOneDayWeatherDiv = document.createElement("div");
        longtermOneDayWeatherDiv.classList.add("longtermOneDayWeatherDiv");

        let dateDiv = document.createElement("div");
        dateDiv.innerHTML = el.date;

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = Math.round(el.avgTemp) + "°C";
        tempDiv.classList.add("tempDiv")

        longtermOneDayWeatherDiv.append(dateDiv);
        longtermOneDayWeatherDiv.append(tempDiv);
        longtermWeatherDiv.append(longtermOneDayWeatherDiv)
    })
} 
 
fetchLongtermData(urlBydefaultLongterm);


otherCityInp.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    showOtherCity();
  }
});

otherCityBtn.addEventListener("click",showOtherCity)
    
function showOtherCity() {
  if (!city.innerHTML || otherCityInp == "") return;
  otherCityVal = otherCityInp.value;
  otherCityInp.value = "";
  longtermWeatherDiv.innerHTML = "";

  let newurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${otherCityVal}&lat=52.2296756&lon=21.0122287&appid=${myApiKey}&lang=pl`;
  fetchData(newurl);

  let newLongtermUlr = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${otherCityVal}&appid=96b01a1f2ccf430696217afa3bdbfd1a&lang=pl`;
  fetchLongtermData(newLongtermUlr);
}