// import { WeatherSchema } from "./schemas/WeatherSchema";

import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon, days}: {lat: number; lon: number, days:number}) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&lang=de`
    )
    const data = await res.json()
    return weatherSchema.parse(data)
}