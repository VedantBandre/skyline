import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon}: {lat: number; lon: number}) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&lang=de`
    )
    const data = await res.json()
    return weatherSchema.parse(data)
}

export async function getGeoCode( location : string ) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&lang=de`
    )
    const data = await res.json()
    return weatherSchema.parse(data)
}