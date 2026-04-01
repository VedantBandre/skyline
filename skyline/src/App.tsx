import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 49.2333, lon: 7.0, days:7 }),
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="flex flex-col items-center justify-center p-4 py-5 rounded-xl bg-cyan-300 shadow-md gap-4 text-5xl">
          Skyline
        </h1>
      </div>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </div>
  )
}

export default App
