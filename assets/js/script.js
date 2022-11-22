var apiKey = "31e9d74d1969cc655cd5d62c1919b31d";
var lat = 47.6062
var lon = 122.3321

var endPoint =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// console.log(endPoint)

fetch(endPoint)
  .then((response) => response.json())
  .then((data) => console.log(data));