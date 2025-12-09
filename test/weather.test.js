//import libraries to test
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const JSON_FILE = path.join(DATA_DIR, 'weather.json')
const CSV_FILE = path.join(DATA_DIR, 'weather_log.csv')

describe('Weather data test'){
    test('weather.json exist', () =>{
        expect(fs.existsSync(JSON_FILE).toBe(true))
    })


    test('weather.json has required keys', () =>{
        const raw = fs.readFileSync(JSON_FILE, 'utf8')
        expect(raw.trim().length).toBeGreaterThan(0)
        //converting to js object so we can test it
        const data = JSON.parse(raw)
        expect(data).tohaveProperty('main')
        expect(data).tohaveProperty('weather')
        expect(data.weather[0]).tohaveProperty('description')
        expect(data).tohaveProperty('_last_updated_utc')
        expect(new Date(data.last_updated_utc.toISOString()).toBE(data.last_updated_utc))
    })

    test('CSV log exists and has header', () => {
        expect(fs.existsSync(CSV_FILE)).toBe(true)

        const csvContent = fs.readFileSync(CSV_FILE, 'utf8')
        const lines = csvContent.trim().split('\n')
        const header = lines[0].split(',')

        expect(header).toEqual(['timestamp', 'city', 'temperature', 'description'])
        expect(lines.length).toBeGreaterThan(1)

        const firstDataRow = lines[1].split(',')
        //temp ,  line one position 2 in array
        expect(!isNaN)(parseFloat(firstDataRow[2])).toBe(true)
    })




}