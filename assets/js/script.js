let fetchData = $('#citySearch');
const apiKey = 'bdc060d57bb93d87cde07d183be15db6';

function getCoords() {
    const cityRequest = document.getElementById('cityInput').value;
    const cityName = document.getElementById('cityName');
    let dt = new Date();
    cityName.innerHTML = cityRequest + ' (' + dt.toLocaleDateString("en-US") + ')';    
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityRequest}&appid=${apiKey}`)
    .then((result) => {return result.json()})
    .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;
        // console.log(lat);
        // console.log(lon);
        getWeather(lat, lon);
    })
}

function getWeather(lat, lon) {
    // console.log('Lat: '+ lat + '\nLon: ' + lon );
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=40&units=imperial`)
    .then((result) => {return result.json()})
    .then((data) => {
        // Temperature in Fahrenheit
        const tempId = document.getElementById('tempNow');
        let temp = data.list[0].main.temp;
        tempId.textContent = 'Temp: ' + temp + '\xB0F';

        // Wind Speed in units miles/hour
        const windId = document.getElementById('windNow');
        let wind = data.list[0].wind.speed;
        windId.textContent = 'Wind: ' + wind + '\tMPH';

        // Humidity in units of percentage
        const humidId = document.getElementById('humidNow');
        let humid = data.list[0].main.humidity;
        humidId.textContent = 'Humidity: ' + humid + '\t%';
        // console.log(temp)
        nextDays(data);
    })
}

function nextDays(data){
    console.log(data);
}

fetchData.on('click', getCoords);