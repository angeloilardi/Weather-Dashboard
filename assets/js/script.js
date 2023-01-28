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
        console.log(results);
        let todayTemp = results[0].main.temp;
        let todayHumidity = results[0].main.humidity;
        let todayWind = results[0].wind.speed;
        let icon = results[0].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        let todayHeading = `${city} ${date}`;
        $("#today").html(
            `<h2>${todayHeading}<img src= ${iconUrl} alt= "weather icon"}></h2>
        <p>Temperature: ${todayTemp} °C</p>
        <p>Humidity: ${todayHumidity}%</p>
        <p>Wind Speed: ${todayWind} KPH</p>`);
let forecastDate = date;
        let temp, humidity, forecastIcon, wind, forecastIconUrl;
        console.log(results.length);
        for (var i = 7; i < results.length; i += 8) {
            forecastDate = moment(forecastDate, "DD/MM/YY").add(1, "d").format("DD/MM/YY")
            temp = results[i].main.temp;
            console.log(temp);
            humidity = results[i].main.humidity;
            console.log(humidity);
            wind = results[i].wind.speed;
            console.log(wind);
            forecastIcon = results[i].weather[0].icon;
            forecastIconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
            console.log(forecastIconUrl);
            let forecastCard = $("<div>");
            
            forecastCard.addClass("card p-3 forecast-card bg-primary m-2")
            console.log(forecastCard);
          forecastCard.html(
            `<h3>${forecastDate}</h3>
            <img class = "weather-icon" src= ${iconUrl} alt= "weather icon"}>
            <p>Temperature: ${temp} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${wind} KPH</p>`);
          $("#forecast").append(forecastCard);
          
        };
        $("#history").append("<button>")
          .text(city)
          .addClass("bg-light history-button");     
          let historyList = JSON.parse(localStorage.getItem("cities"));
          console.log(historyList);
          if (historyList === null){
             historyList = [];
          }
          console.log(historyList);
          localStorage.setItem("city", city);
          historyList.push(city);       
          localStorage.setItem("cities", JSON.stringify(historyList));
    })
};

// getWeather("Amsterdam");

$("#search-button").on("click", function(event){
    event.preventDefault();
    let searchedCity = $("#search-input").val();
    getWeather(searchedCity);
})
