let searchinput = document.querySelector(".searchinput");
let cityElement = document.querySelector(".city");
let searchbtn = document.querySelector(".searchbtn");
let iconurl = document.querySelector(".iconurl");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let description = document.querySelector(".description");

function weatherinfo(response) {
  console.log(response.data.temperature);
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = response.data.temperature.current;
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  description.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  let date = new Date(response.data.time * 1000);
  iconurl.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  let time = document.querySelector(".time");
  time.innerHTML = formatDate(date);
  getapi(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}
function weather(city) {
  let apikey = "de072a3do70f178f6a0bt43f94a33afc";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiurl).then(weatherinfo);
}
function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
}
function getapi(city) {
  let apikey = "de072a3do70f178f6a0bt43f94a33afc";

  let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiurl).then(forcast);
}

function forcast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forcast">
        <div class="forcast-day">${formatday(day.time)}</div>
        <div class="forcast-icon"><img src="${day.condition.icon_url}" </div>
        <div class="forcast-temps">
        <div class="forecast-temp"><strong>${Math.round(
          day.temperature.maximum
        )}°</strong></div>
        <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
      </div>
      </div>
  `;
    }
  });

  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchcity(event) {
  event.preventDefault();
  cityElement.innerHTML = searchinput.value;
  weather(searchinput.value);
}
searchbtn.addEventListener("click", searchcity);
weather("paris");
