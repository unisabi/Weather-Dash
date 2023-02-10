const apiKey = "31e9d74d1969cc655cd5d62c1919b31d";
const topDiv = document.querySelector('.right-top')
const bottomDiv = document.querySelector('.right-bottom')
const cardDiv = document.getElementById('cardDiv');
// creating a local storage for the cities
let store = localStorage.cities ? JSON.parse(localStorage.cities) : [];
// taking the infor from the cities and fetching the info
const handleCities = city => {
  document.querySelector('input').value = city;
  getForecast();
}

const handleStore = () => {
  document.querySelector('.history').innerHTML='';

  store.forEach(city => {
    document.querySelector('.history').innerHTML += `<button onclick="handleCities('${city}')">${city}</button>`;
  });
}

handleStore();

async function getForecast() {
  let city = document.querySelector('input').value;
  if (!city) return;
  // calling the api key we have
  let url =`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

  let { list } = await fetch(url).then((response) => response.json());
// pushing the local storage to save
  if(!store.includes(city)) {
    store.push(city);
    localStorage.cities = JSON.stringify(store);
    handleStore();
  };

  let { main:{temp, humidity}, dt, wind:{speed}, weather:[{icon}] } = list[0];
// the right top div will show all the temp,wind and humidity and pulled the image source to pop up next to it
  topDiv.innerHTML = `
  <div>
    <h1>${city} (${new Date(dt*1000).toLocaleDateString()})</h1>
    <h3>Temp: ${temp}</h3>
    <h3>Wind: ${speed}</h3>
    <h3>Humidity: ${humidity}</h3>
  </div>
  <img src="http://openweathermap.org/img/w/${icon}.png">
  `;

  cardDiv.innerHTML = '';

  for (let i = 7; i < list.length; i+=8) {
    let { main:{temp, humidity}, dt, wind:{speed}, weather:[{icon}] } = list[i];
    // again called the weather api for the card divs to show the temp wind and humidity
    cardDiv.innerHTML += `
    <div class="card">
      <h3>(${new Date(dt*1000).toLocaleDateString()})</h3> 
      <img src="http://openweathermap.org/img/w/${icon}.png">
      <h5>Temp: ${temp}</h5>
      <h5>Wind: ${speed}</h5>
      <h5>Humidity: ${humidity}</h5>
    </div>`
  }
};
// we are always "listening" when someone clicks a button
document.querySelector('button').addEventListener('click', getForecast);