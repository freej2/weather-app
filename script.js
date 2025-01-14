async function fetchData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=FQM8S29CSY2TUHZAVGK2CJXCR`);
    const data = await response.json();
    console.log(data);
}

async function modifyData(){

}

fetchData('London,UK'); // Example call with a location