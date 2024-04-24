function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiKey = 'YOUR_API_KEY'; // Replace with your API key
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById("weatherInfo").innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp} &deg;C</p>
          <p>Humidity: ${data.main.humidity}%</p>
        `;
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        document.getElementById("weatherInfo").innerHTML = "Error fetching weather data";
      });
  }
  