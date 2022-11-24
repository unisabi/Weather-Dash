const apiKey = "31e9d74d1969cc655cd5d62c1919b31d";
const topDiv = document.querySelector('.right-top')
const bottomDiv = document.querySelector('.right-bottom')


async function getForecast() {
  let city = document.querySelector('input').value;
  if (!city) return;
  
  let url =`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

  let { list } = await fetch(url).then((response) => response.json());
  let { main:{temp, humidity}, dt, wind:{speed}, weather:{icon} } = list[0];

  topDiv.innerHTML = `
    <h1>${city} (${new Date(dt*1000).toLocaleDateString()})</h1>
    <h3>Temp: ${temp}</h3>
    <h3>Wind: ${speed}</h3>
    <h3>Humidity: ${humidity}</h3>
  `;

  console.log(temp,humidity,dt,speed, icon);
  console.log(list[0]);
}

document.querySelector('button').addEventListener('click', getForecast);