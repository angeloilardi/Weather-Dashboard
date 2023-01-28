let key = "e8d54aa916b42d7a0757ed85e6afcf68";



function getWeather(city) {
let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=metric";
$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
    let todayDate = moment().format("YYYY-MM-DD HH:mm:ss");
    let results = response.list;
    console.log(results);
    let todayTemp = results[0].main.temp;
    let todayHumidity = results[0].main.humidity;
    let todayWind = results[0].wind.speed;
    let icon = results[0].weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
    let todayHeading = `${city} ${moment().format("DD/MM/YY")}`;
    console.log(todayHeading);
    $("#today").html(
        `<h2>${todayHeading}<img src= ${iconUrl} alt=weather icon}></h2>
        <p>Temperature: ${todayTemp} °C</p>
        <p>Humidity: ${todayHumidity}%</p>
        <p>Wind Speed: ${todayWind} KPH</p>`);

    for (i=8; i< results.lnegth; i+=8) {
        let temp = results[i].main.temp;
        let humidity = results[i].main.humidity;
        let wind = results[i].wind.speed;
        let icon = results[i].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
    }
})
};

getWeather("Amsterdam");
