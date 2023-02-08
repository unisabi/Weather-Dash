const apiKey = "31e9d74d1969cc655cd5d62c1919b31d";
const topDiv = document.querySelector('.right-top')
const bottomDiv = document.querySelector('.right-bottom')
const cardDiv = document.getElementById('cardDiv');

let store = localStorage.cities ? JSON.parse(localStorage.cities) : [];

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
  
  let url =`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

  let { list } = await fetch(url).then((response) => response.json());

  if(!store.includes(city)) {
    store.push(city);
    localStorage.cities = JSON.stringify(store);
    handleStore();
  };

  let { main:{temp, humidity}, dt, wind:{speed}, weather:[{icon}] } = list[0];

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

document.querySelector('button').addEventListener('click', getForecast);