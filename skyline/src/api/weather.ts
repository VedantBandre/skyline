import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { lat, lon, location } = req.query;

  const query =
    typeof location === "string"
      ? location
      : `${lat},${lon}`;

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${query}&days=7&lang=de`
  );

  const data = await response.json();
  res.status(200).json(data);
}