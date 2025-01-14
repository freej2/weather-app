const weatherForm = document.getElementById('weatherForm');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const locationInput = document.getElementById('location');
    const location = locationInput.value;
    const weatherData = await fetchData(location);
    await displayWeatherData(weatherData);
});

async function fetchData(location) {
    try {
        // 1. Fetch raw data
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=FQM8S29CSY2TUHZAVGK2CJXCR`);
        const data = await response.json();
        
        // 2. Process the data by calling modifyData
        const processedData = await modifyData(data);
        
        // 3. Return the processed data
        return processedData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function modifyData(data) {
    // Extract and transform the data
    const processedData = {
        conditions: data.days.map(day => day.conditions),
        tempmax: data.days.map(day => day.tempmax),
        tempmin: data.days.map(day => day.tempmin)
    };
    
    return processedData;
}

async function displayWeatherData(weatherData) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML = ''; // Clear previous results
    
    // Loop through each day's data
    for (let i = 0; i < weatherData.conditions.length; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-weather';
        dayDiv.innerHTML = `
            <div class="conditions">Conditions: ${weatherData.conditions[i]}</div>
            <div class="temp-max">Max Temperature: ${weatherData.tempmax[i]}°F</div>
            <div class="temp-min">Min Temperature: ${weatherData.tempmin[i]}°F</div>
            <hr>
        `;
        
        weatherInfo.appendChild(dayDiv);
    }
}