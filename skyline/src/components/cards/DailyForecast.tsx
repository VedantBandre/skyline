import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr.replace(/-/g, "/"));
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return date.toLocaleString("de-DE", options);
};

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  // 🔹 Compute global min/max for scaling
  const temps = data.forecast.forecastday.flatMap((day) => [
    day.day.mintemp_c,
    day.day.maxtemp_c,
  ]);

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1; // avoid division by 0

  return (
    <Card
      title="Tägliche Vorhersage"
      childrenClassName="flex flex-col h-full justify-between"
    >
      {data.forecast.forecastday.map((day) => (
        <div
          key={day.date}
        className="flex items-center justify-between gap-3">

          {/* Day */}
          <p className="w-18 flex items-center gap-2">
            {formatDate(day.date)}
          </p>

          {/* Icon */}
          <div className="w-8 flex items-center gap-2">
            <WeatherIcon src={day.day.condition.icon} />
          </div>

          {/* Avg temp */}
          <p className="w-8 text-right font-mono">
            {Math.round(day.day.avgtemp_c)}°C
          </p>

          {/* Temperature range graph */}
          <div className="flex items-center gap-2 flex-1 max-w-[240px]">
            {/* Min temp */}
            <span className="w-10 text-right font-mono text-sm text-gray-500">
              {Math.round(day.day.mintemp_c)}°C
            </span>

            {/* Graph */}
            <div className="relative flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {/* Range bar */}
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-cyan-400 via-yellow-300 to-orange-400 transition-all duration-500"
                style={{
                  left: `${
                    ((day.day.mintemp_c - minTemp) / range) * 100
                  }%`,
                  width: `${
                    ((day.day.maxtemp_c - day.day.mintemp_c) / range) *
                    100
                  }%`,
                }}
              />

              {/* Avg temp marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-gray-400 rounded-full"
                style={{
                  left: `${
                    ((day.day.avgtemp_c - minTemp) / range) * 100
                  }%`,
                }}
              />
            </div>

            {/* Max temp */}
            <span className="w-10 text-left font-mono text-sm text-gray-500">
              {Math.round(day.day.maxtemp_c)}°C
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
}