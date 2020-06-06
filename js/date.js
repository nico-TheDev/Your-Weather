const domElements = {
    month:document.querySelector('.app__month'),
    day:document.querySelector('.app__dayCount'),
    cityTemp:document.querySelector('.app__tempCount'),
    cityName:document.querySelector('.app__city'),
    weatherText:document.querySelector('.app__weather-text'),
    windSpeed:document.querySelector('.app__wind'),
    humidity:document.querySelector('.app__humidity'),
    days:document.querySelector('.app__days'),
    app:document.querySelector('.app')
}

function getMonthDay() {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const date = new Date();

    let dayNum = date.getDate();
    const month = months[date.getMonth()];

    if (dayNum < 10) {
        dayNum = `0${dayNum}`;
    }

    return [month, dayNum];
}

function renderDate() {
    // render date

    const [month, day] = getMonthDay();
    domElements.month.textContent = month;
    domElements.day.textContent = day;
}
