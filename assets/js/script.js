let key = "e8d54aa916b42d7a0757ed85e6afcf68";
function getWeather(city) {
    $("#today").empty();
    $("#forecast").empty();
    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=metric";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        date = moment().format("DD/MM/YY");
        let results = response.list;
        let todayTemp = results[0].main.temp;
        let todayHumidity = results[0].main.humidity;
        let todayWind = results[0].wind.speed;
        let icon = results[0].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        let todayHeading = `${city} ${date}`;
        $("#today").html(
            `<h2 class=today-heading>${todayHeading}<img src= ${iconUrl} alt= "weather icon"}></h2>
        <p>Temperature: ${todayTemp} °C</p>
        <p>Humidity: ${todayHumidity}%</p>
        <p>Wind Speed: ${todayWind} KPH</p>`);
        let forecastDate = date;
        let temp, humidity, forecastIcon, wind, forecastIconUrl;
        let forecastHeading = $("<h4>5-Day Forecast</h4>").addClass("forecast-heading m-2");
        let cardsContainer = $("<div>").addClass("row card-group m-2");
        $("#forecast").append(forecastHeading, cardsContainer);
        for (var i = 7; i < results.length; i += 8) {
            forecastDate = moment(forecastDate, "DD/MM/YY").add(1, "d").format("DD/MM/YY")
            temp = results[i].main.temp;
            humidity = results[i].main.humidity;
            wind = results[i].wind.speed;
            forecastIcon = results[i].weather[0].icon;
            forecastIconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
            let forecastHeading = $("<h3>5-Day Forecast</h3>");
            let forecastCard = $("<div>");
            forecastCard.addClass("card p-3 forecast-card bg-primary")
            forecastCard.html(
            `<h3>${forecastDate}</h3>
            <img class = "weather-icon" src= ${iconUrl} alt= "weather icon"}>
            <p>Temperature: ${temp} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${wind} KPH</p>`);
            $(cardsContainer).append(forecastCard);
        };
        let newButton = $("<button>")
            .text(city)
            .addClass("bg-light history-button m-2");
        $("#history").prepend(newButton);
        let historyList = JSON.parse(localStorage.getItem("cities"));
        if (historyList === null) historyList = [];
        if (historyList.length > 9) {
            historyList.pop();
            $("#history button:last-child").remove();
        }
        historyList.unshift(city);
        localStorage.setItem("cities", JSON.stringify(historyList));
    })
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    let searchedCity = $("#search-input").val();
    getWeather(searchedCity);
});

function renderButtons() {
    let currentEntries = JSON.parse(localStorage.getItem("cities"));
    if (currentEntries !== null) {
        currentEntries.forEach(function (el) {
            createdButton = $("<button>")
                .text(el)
                .addClass("bg-light history-button m-2");
            $("#history").append(createdButton);
        })
    }
    $(".history-button").each(function(){
        $(this).on("click", function(event){
            event.preventDefault();
            getWeather($(this).text())
        })
    })
}

renderButtons();
