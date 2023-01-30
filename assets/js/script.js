$(document).ready(function(){
    renderButtons();
    let key = "e8d54aa916b42d7a0757ed85e6afcf68";
    function getWeather(city) {
        console.log(city);
        // resets the dashboard
        $("#today").empty();
        $("#forecast").empty();
        // API call
        let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=metric";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            // variable for today's date
            date = moment().format("DD/MM/YY");
            // variable for the results array
            let results = response.list;
            // pulls temperature
            let todayTemp = results[0].main.temp;
            // pulls hinidity
            let todayHumidity = results[0].main.humidity;
            // pulls swind peed
            let todayWind = results[0].wind.speed;
            // gets icon id
            let icon = results[0].weather[0].icon;
            // gets icon URL by id
            let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
            // heading with city and date
            let todayHeading = `${city} ${date}`;
            // builds html for today's weather
            $("#today").html(
                `<h2 class=today-heading>${todayHeading}<img src= ${iconUrl} alt= "weather icon"}></h2>
            <p>Temperature: ${todayTemp} °C</p>
            <p>Humidity: ${todayHumidity}%</p>
            <p>Wind Speed: ${todayWind} KPH</p>`);
            // variable for forecast date
            let forecastDate = date;
            // initialises variables for forecast
            let temp, humidity, forecastIcon, wind, forecastIconUrl;
            // heading for forecast
            let forecastHeading = $("<h4>5-Day Forecast</h4>").addClass("forecast-heading m-2");
            //builds a container for the forecast cards
            let cardsContainer = $("<div>").addClass("row card-group m-2");
            $("#forecast").append(forecastHeading, cardsContainer);
            // loops over the results array to get 5-day forecast
            for (var i = 7; i < results.length; i += 8) {
                forecastDate = moment(forecastDate, "DD/MM/YY").add(1, "d").format("DD/MM/YY")
                temp = results[i].main.temp;
                humidity = results[i].main.humidity;
                wind = results[i].wind.speed;
                forecastIcon = results[i].weather[0].icon;
                forecastIconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
                let forecastHeading = $("<h3>5-Day Forecast</h3>");
                // each card will be a div with a card inside
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
            
            let historyList = JSON.parse(localStorage.getItem("cities"));
            if (historyList === null) historyList = [];
            if (historyList.includes((city.toLowerCase()))){
                historyList.splice(historyList.indexOf(city), 1)
                console.log(historyList.indexOf(city));
                console.log("yes");
            }
            // history is hidden on smaller screens
            
            if (historyList.length > 9) {
                historyList.pop();
            }
            historyList.unshift(city);
            localStorage.setItem("cities", JSON.stringify(historyList));
            renderButtons();
        });
    };
    
    //event listener for searh button
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        let searchedCity = $("#search-input").val();
        getWeather(searchedCity.toLowerCase());
        $("#search-input").val('');
    });
    
    // function to render buttons
    function renderButtons() {
        $("#history").empty();
        let currentEntries = JSON.parse(localStorage.getItem("cities"));
        if (currentEntries !== null) {
            currentEntries.forEach(function (el) {
                createdButton = $("<button>")
                    .text(el)
                    .addClass("bg-light history-button m-2");
                $("#history").append(createdButton);
            })
        }
        $(".history-button").each(function () {
            $(this).on("click", function (event) {
                event.preventDefault();
                getWeather($(this).text())
            })
        });
        if ($(window).width() < 768) $("#history").hide();
        ;
        ;
    
    }
    
    
    // adds event listener to the 'show history' button
    $("#history-collapse").click(function () {
        $("#history").toggle();
    })
    
    // hides or unhides history
    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() < 768) {
            $("#history").hide();
            $("#history-collapse").show();
        };
        if (win.width() > 768) {
            $("#history").show();
            $("#history-collapse").hide();
        };
    });
    
    // event listener for the clear history button
    $("#clear-history").on("click", function () {
        $("#history").empty();
        localStorage.removeItem("cities");
    })
    
})


