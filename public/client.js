//we are creating our own ends here so make sure you are using them

async function loadWeather(){
    try{
        const res = await fetch('/api/weather')
        //collecting info from backend
        const weather = await res.json()

        document.getElementById('weather').innerHTML = `
        <h2> ${weather.name} </h2>
        <p>Temperature: ${weather.main.temp} C </p>
        <p>Condition: ${weather.weather[0].description} C </p>
        `
    }
    catch(err){
        document.getElementById('weather').innerHTML = 
        `<p> FAiled to load</p>`
        console.log(err)
    }
}



async function loadChart(){
    try{
        const res = await fetch('/api/weather-log')
        const {timestamps, temps} = await res.json()

        const trace = {
            x: timestamps,
            y: temps,
            type: 'scatter',
            mode: 'line-markers',
            line: {
                color: "orange"
            }
        }

        const layout = {
            title: 'Temperature over time',
            xaxis: { title: 'Data', type: 'data'},
            yaxis: {title: "Temperature"},
            legend: {orientation: 'h', x: 0, y: 1.1}
        }

        Plotly.newPlot('chart', [trace], layout)
    }
    catch(err){
        console.log("failed to load the chart" + err)

    }
}

loadWeather()
loadChart()