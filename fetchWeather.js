// ! this part only calls information
//fetch data from api use json savr as csv file to buld the graph
//import librarys
import fs from 'fs' // read and write from files
import path from 'path'
import dotenv from 'dotenv' /// read values from env

dotenv.config()

//direction of data, full path to folder named data in json csv file, dir creates a folder
const DATA_DIR = path.join(import.meta.dirname, 'data')
if (!fs.existsSync(DATA_DIR)){
    fs.mkdirSync(DATA_DIR)
}


//files to store data as variable
const WEATHER_FILE = path.join(DATA_DIR, 'weather.json')
const LOG_FILE = path.join(DATA_DIR, 'weather_log.csv')
console.log("running")

export async function fetchWeather(){
    const apiKey = process.env.WEATHER_APP_KEY
    const city = process.env.CITY || 'London'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
            
        }
        const data = await response.json()
        //timestamp of the date, using date object with method to create specific data
        const nowUTC = new Date().toISOString()
        //add property to data
        data._last_updated_utc = nowUTC
        //writing data object into json file and formatted to json string, 2-readible
        fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2))
        console.log("running")

        //parth for csv
        const header = 'timestamp,city,temperature,desciption\n'
        if(!fs.existsSync(LOG_FILE)){
            fs.writeFileSync(LOG_FILE, header)
        }
    else{
        const firstLine = fs.readFileSync(LOG_FILE, 'utf8').split('\n')[0]
        if (firstLine !== 'timestamp,city,temperature,desciption'){
            /// write lines and read again
            fs.writeFileSync(LOG_FILE, header +fs.readFileSync(LOG_FILE, 'utf8'))
        }
    }
        ///values that will be added each time we call api
        const logEntry = `${nowUTC},${city},${data.main.temp},${data.weather[0].description}\n`
        fs.appendFileSync(LOG_FILE, logEntry)

        console.log(`Weather data update for ${city}`)

    }
    catch(err){
        console.log(`Error catching weather`, err)
    }}
    /// checking checks where the file is = where the node file is running from , if on the same path call the function

// if(import.meta.url === `file://${process.argv[1]}`){
//         fetchWeather()
// }

if(process.argv[1] === import.meta.filename){
        fetchWeather()
}
//find api call in documents api website
// fetchWeather()
