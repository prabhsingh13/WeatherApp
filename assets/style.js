document.addEventListener('DOMContentLoaded', function() {
    // Assuming there's only one element with this class
    const cityInput = document.getElementById('cityInput');
    // Assuming there's only one element with these classes
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    console.log(leftSide);
    console.log(cityInput);
    console.log(rightSide);

    if (cityInput && leftSide && rightSide) {
        if (cityInput.value === '') {
            leftSide.style.display = 'none';
            rightSide.style.display = 'none';
        } else {
            // If the cityInput is not an empty string, display the left and right sides
            leftSide.style.display = 'block';
            rightSide.style.display = 'block';
            // Add any other logic or function calls you need here
        }
    } else {
        console.error('One or more elements not found');
    }
});

function fetchWeatherData() {
    const dateObj = new Date();
    const getDayName = (dayType, dateVal = dateObj) => dateVal.toLocaleDateString('en-US', { weekday: dayType });
    const cityInput = document.getElementById('cityInput').value;
    const apiKey = 'ec23ba55b64047adb46220844230812';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=7`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Update the HTML content based on the fetched data
            document.getElementById('city').innerText = data.location.name;
            document.getElementById('state').innerText = data.location.region;
            document.getElementById('country').innerText = data.location.country;
            document.getElementById('condition').innerText = data.current.condition.text;
            document.getElementById('temperature').innerText = data.current.temp_c;

            // Format the date to the desired format
            var formattedDate = new Date(data.location.localtime).toLocaleString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            document.getElementById('date').innerText = formattedDate;
            document.getElementById('day').innerText = getDayName('long');
            document.getElementById('wind').innerText = data.current.wind_kph;
            document.getElementById('avgTemp').innerText = data.current.feelslike_c;
            document.getElementById('avgHumidity').innerText = data.current.humidity;
            
            document.getElementById('d-city').innerText = data.location.name;
            document.getElementById("d-condition").innerText = data.current.condition.text;
            document.getElementById("d-temperature").innerText = data.current.temp_c;
            document.getElementById("d-feel-temperature").innerText = data.current.feelslike_c;
            document.getElementById('d-time').innerText = data.location.localtime;
            document.getElementById("d-pressure").innerText = data.current.pressure_mb;
            document.getElementById("d-humidity").innerText = data.current.humidity;
            document.getElementById("d-visibility").innerText = data.current.vis_km;
            document.getElementById("d-windSpeed").innerText = data.current.wind_kph;
            document.getElementById("d-windDegree").innerText = data.current.wind_kph;
            document.getElementById("d-windDirection").innerText = data.current.wind_dir;
            document.getElementById("d-uvIndex").innerText = data.current.uv;
            document.getElementById("d-gustSpeed").innerText = data.current.gust_kph;
            if(data.current.is_day == 1){
                document.getElementById("d-Currently").innerText = 'Day';
            }
            else{
                document.getElementById("d-Currently").innerText = 'Night';
            }
            if(data.current.cloud >= 1){
                document.getElementById("d-cloud").innerText = 'Yes,'+ ' ' + data.current.cloud;
            }
            else{
                document.getElementById("d-cloud").innerText = 'No';
            }

            // Update the weather icon based on the condition
            const image = document.getElementById('current-weather-icon');
            updateWeatherIcon(image, data.current.condition.text);

            const icon = document.getElementById('weather-icon');
            updateWeatherIcon(icon, data.current.condition.text);

            // Show the left and right columns
            const leftSide = document.querySelector('.left-side');
            const rightSide = document.querySelector('.right-side');
            leftSide.style.display = 'block';
            rightSide.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);

            // If there is an error, you may want to hide the left and right columns
            const leftSide = document.querySelector('.left-side');
            const rightSide = document.querySelector('.right-side');
            leftSide.style.display = 'none';
            rightSide.style.display = 'none';
        });
}

// Function to update the weather icon based on the condition
function updateWeatherIcon(imageElement, condition) {
    switch (condition) {
        case 'Clear':
        case 'Sunny':
            imageElement.src = './assets/images/weather-icons/clear.png';
            break;

        case 'Patchy rain possible':
            imageElement.src = './assets/images/icons/rain3.png';
            break;
        case 'Rain':
            imageElement.src = './assets/images/weather-icons/rain.png';
            break;

        case 'Snow':
            imageElement.src = './assets/images/weather-icons/snow.png';
            break;

        case 'Patchy light snow':
            imageElement.src = './assets/images/icons/snow-cloud.png';
            break;

        case 'Light snow':
            imageElement.src = './assets/images/icons/snow.png';
            break;

        case 'Cloudy':
        case 'Partly cloudy':
            imageElement.src = './assets/images/weather-icons/cloud.png';
            break;

        case 'Mist':
        case 'Haze':
        case 'Fog':
            imageElement.src = './assets/images/weather-icons/mist.png';
            break;

        case 'Overcast':
            imageElement.src = './assets/images/weather-icons/overcast.png';
            break;

        default:
            imageElement.src = './assets/images/weather-icons/404.png';
            break;
    }
}
