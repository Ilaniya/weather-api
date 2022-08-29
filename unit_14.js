const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "1a3ed3e242af9ba53b513e8a2f5c0dee",
};

const cities = {
  703448: "Kyiv",
  690548: "Uzhgorod",
  2643743: "London",
  702550: "Lviv",
  5128581: "New York",
  727011: "Sofia",
};
function createSelectWithCities() {
  let selectCities = document.createElement("select");
  selectCities.id = "city";
  for (const key in cities) {
    const option = document.createElement("option");
    option.setAttribute("value", key);
    option.innerHTML = cities[key];
    if (key == 703448) {
      option.setAttribute("selected", true);
    }
    selectCities.appendChild(option);
  }
  document.querySelector(".container-selectCity").appendChild(selectCities);
}
createSelectWithCities();

function getWeather() {
  const idCity = document.querySelector("#city").value;
  fetch(`${param.url}weather?id=${idCity}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  console.log(data);
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".degreese").innerHTML =
    Math.floor(data.main.temp) + "&deg;";
  document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(
    data.main.feels_like
  )}${"&deg;"}`;
  document.querySelector(".sky-state").textContent =
    data.weather[0].description;

  data.weather[0].description;
  document.querySelector(
    ".container-sky-state-img"
  ).innerHTML = `<img class='weather-state-img' src='http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png'>`;
}
getWeather();
document.querySelector("#city").onchange = getWeather;
