import { weatherSchema } from "./schemas/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  const data = await res.json();
  return weatherSchema.parse(data);
}

export async function getGeoCode(location: string) {
  const res = await fetch(`/api/weather?location=${location}`);
  const data = await res.json();
  return weatherSchema.parse(data);
}