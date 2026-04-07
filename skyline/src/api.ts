// import { WeatherSchema } from "./schemas/WeatherSchema";

import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon}: {lat: number; lon: number}) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&lang=de`
    )
    const data = await res.json()
    return weatherSchema.parse(data)
}

export async function getGeoCode( location : string ) {
    const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&lang=de`
    )
    const data = await res.json()
    return weatherSchema.parse(data)
}


// type WeatherRequest = 
// | { lat : number; lon: number; location?: never }
// | { location : string; lat?: never; lon?: never };


// export async function getWeather(params : WeatherRequest) {
//     const query = "location" in params ? params.location : `{$params.lat},${params.lon}`;

//     const res = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&lang=de`
//     );

//     if (!res.ok) throw new Error("Failed to fetch weather");

//     const data = await res.json();
//     return weatherSchema.parse(data);
// }
