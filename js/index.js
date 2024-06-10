var dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthName = [
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
var days = [];
var loc, current;
var myRow = document.getElementById("myRow");
var find = document.getElementById("findLocation");
// Default Weather
getWeather("cairo");
// Get Location
navigator.geolocation.getCurrentPosition(success);
function success(position) {
  var city = position.coords.latitude + "," + position.coords.longitude;
  getWeather(city);
}
// Search Area
find.addEventListener("input", function () {
  if (find.value.length >= 3) {
    var area = find.value;
    getWeather(area);
  }
});
// Get Data
async function getWeather(info) {
  var res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=4deaed138037489aabd200832240706&q=${info}&days=3`
  );
  var data = await res.json();
  days = data.forecast.forecastday;
  current = data.current;
  loc = data.location;
  display();
}
// Display Data
function display() {
  myRow.innerHTML = `<article class="row g-0 rounded-2 overflow-hidden">
          <section class="col-lg-4">
            <article class="text-white-50 bg-2 h-100">
              <div class="d-flex justify-content-between bg-1 py-2 px-3">
                <span>${dayName[new Date(days[0].date).getDay()]}</span>
                <span>${new Date(days[0].date).getDate()} ${
    monthName[new Date(days[0].date).getMonth()]
  }</span>
              </div>
              <section class="text-center py-2 px-4">
                <p class="fs-4">${loc.name}</p>
                <h1 class="text-white fw-bolder">${
                  current.temp_c
                } <sup>o</sup>C</h1>
                <img class="w-25" src="https:${
                  current.condition.icon
                }" alt="icon" />
                <p class="text-primary">${current.condition.text}</p>
                <div>
                  <span class="me-3"
                    ><i class="fa-solid fa-umbrella"></i> ${
                      days[0].day.daily_chance_of_rain
                    }%</span
                  >
                  <span class="me-3"
                    ><i class="fa-solid fa-wind"></i> ${
                      current.wind_kph
                    }km/h</span
                  >
                  <span class="me-3"
                    ><i class="fa-regular fa-compass"></i> East</span
                  >
                </div>
              </section>
            </article>
          </section>
          <section class="col-lg-4">
            <article class="text-white-50 bg-4 h-100">
              <div class="text-center bg-3 p-2">
                <span>${dayName[new Date(days[1].date).getDay()]}</span>
              </div>
              <section class="text-center mt-5">
                <img src="https:${days[1].day.condition.icon}" alt="icon" />
                <h2 class="text-white">${
                  days[1].day.maxtemp_c
                } <sup>o</sup>C</h2>
                <p>${days[1].day.mintemp_c} <sup>o</sup></p>
                <p class="text-primary">${days[1].day.condition.text}</p>
              </section>
            </article>
          </section>
          <section class="col-lg-4">
            <article class="text-white-50 bg-2 h-100">
              <div class="text-center bg-1 p-2">
                <span>${dayName[new Date(days[2].date).getDay()]}</span>
              </div>
              <section class="text-center mt-5">
                <img src="https:${days[2].day.condition.icon}" alt="icon" />
                <h2 class="text-white">${
                  days[2].day.maxtemp_c
                } <sup>o</sup>C</h2>
                <p>${days[2].day.mintemp_c} <sup>o</sup></p>
                <p class="text-primary">${days[2].day.condition.text}</p>
              </section>
            </article>
          </section>
        </article>`;
}
