// Get the location of the user with longitude and latitude
function getLocation() {
    if (navigator.geolocation) {
        //check if the user is not using an older browser
        navigator.geolocation.getCurrentPosition(getPos, errorMsg);
    } else {
        //older browsers
        alert("Your browser does not support this feature.");
    }
}

async function getPos(pos) {
    const coordinates = pos.coords;

    const long = coordinates.longitude.toFixed(2);
    const lat = coordinates.latitude.toFixed(2);
    getCityWeather(long, lat);
}

function errorMsg(err) {
    alert("Something went wrong.Please enable location access");
    console.log(err);
}

// based on the location identify the city

async function getCityWeather(long, lat) {
    try {
        const loader = document.createElement('div');
        loader.className = 'loader';

        domElements.app.appendChild(loader);

        const data = await (
            await fetch(
                `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
            )
        ).json();
        const locationID = data[0].woeid;
        const cityData = await (
            await fetch(
                `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${locationID}/`
            )
        ).json();

        loader.remove();

        //render weather
        renderWeather(cityData);
        console.log(cityData);
    } catch (err) {
        console.log(err);
    }
}

function renderWeather(data) {
    /// top right
    const weatherData = data.consolidated_weather;
    const currentDay = weatherData[0];

    domElements.cityName.textContent = data.title;
    domElements.cityTemp.textContent = `${Math.round(
        (currentDay.min_temp + currentDay.max_temp) / 2
    )}°`;

    // Weather Today
    domElements.weatherText.textContent = `Wind speed: ${Math.round(
        currentDay.wind_speed
    )} mph`;
    domElements.humidity.textContent = `Humidity: ${currentDay.humidity}%`;
    renderFollowingDays(weatherData);
}

function renderFollowingDays(days) {
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const date = new Date();
    let today = date.getDay();

    console.log(today);
    let markup = "";

    days.forEach((day, i) => {
        if (i === 0) return;
        else {
            const minTemp = Math.round(day.min_temp);
            const maxTemp = Math.round(day.max_temp);
            today++;
            markup += `
            <div class="app__day">
                <h3 class="app__dayname">${dayNames[today]}</h3>
                <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" class="app__dayicon" alt="${day.weather_state}">
                <p class="app__daytemp">${minTemp}°/${maxTemp}°</p>
            </div>
            `;
        }
    });

    domElements.days.innerHTML = markup;
}
getLocation();
