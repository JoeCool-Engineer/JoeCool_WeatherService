const searchBtn = $('.btnSearch');
const saveCities = $('.savedCity');
const apiKey = 'bdc060d57bb93d87cde07d183be15db6';

// Display cities that have been saved to localStorage after refreshing the screen
(function () {
    // console.log(Object.keys(localStorage));
    const cityInLocal = Object.keys(localStorage);
    
    for (let i = 0; i < cityInLocal.length; i++) {
        let cityName = cityInLocal[i];
        $(".savedCity").append(`<button class="btn btn-secondary citySearch" type="button">${cityName}</button>`);
    }
})();

function init() {
    toLocalStorage()
}

searchBtn.on('click', init);

saveCities.on('click', '.citySearch', function(e) {
    // console.log(e.target.textContent);
    getCoords(e.target.textContent);
})

// Save city to localStorage and assign key (Check to ensure that city exist)
function toLocalStorage(){
    const cityRequest = document.getElementById('cityInput').value;
    let keys = Object.keys(localStorage);
    if (!keys.includes(cityRequest)) {
        localStorage.setItem(`${cityRequest}`, JSON.stringify({name: cityRequest}));
        $(".savedCity").append(`<button class="btn btn-secondary citySearch" type="button">${cityRequest}</button>`);
        getCoords(cityRequest)
    } else {
        getCoords(cityRequest)
    }
    // console.log($('.citySearch'))
}

// Provide city name and retreive coordinates
function getCoords(cityRequest) {
    const getKey = JSON.parse(localStorage.getItem('cityRequest'));
    const cityName = document.getElementById('cityName');
    let dt = new Date();
    cityName.innerHTML = cityRequest + ' (' + dt.toLocaleDateString("en-US") + ')';    
    
    // console.log(getKey);
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

// Povide coodinates retrieve api call data
function getWeather(lat, lon) {
    // console.log('Lat: '+ lat + '\nLon: ' + lon );

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=40&units=imperial`)
    .then((result) => {return result.json()})
    .then((data) => {
        var cardEl = $('.fiveCards');
        const indexDay = [7, 15, 23, 31, 39]
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
        // console.log(data)
        // nextDays(data);
        // console.log(data.list[3].main.temp + ' Third Temp')
        $('.dayCard').remove();
        $.each(indexDay, function (i, day) {
            const numCard = ['dayOne', 'dayTwo', 'dayThree', 'dayFour', 'dayFive']
            const cardID = numCard[i];
            const tempSlot = $('.tempClass');
            const temp = 'Temp: ' + data.list[day].main.temp + '\xB0F';

            const windSlot = $('.windClass');
            const wind = 'Wind: ' + data.list[day].wind.speed + '\tMPH';

            const humidSlot = $('.humidClass');
            const humid = 'Humidity: ' + data.list[day].main.humidity + '\t%';; 

            $('.fiveCards').append(`<div class="container-lg col-2 p-2 dayCard text-light" id="${numCard[i]}"></div>`);
            $(`#${cardID}`).append(`<p class="dateClass">Date</p>`);
            $(`#${cardID}`).append(`<p class="tempClass">${temp}</p>`);
            $(`#${cardID}`).append(`<p class="windClass">${wind}</p>`);
            $(`#${cardID}`).append(`<p class="humidClass">${humid}</p>`);  
        })
    })
}

 