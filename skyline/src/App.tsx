import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import DailyForecast from "./components/cards/DailyForecast";
import Card from "./components/cards/Card";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 51.508, lon: -0.121 }),
  });

  return (
    <div className="flex flex-col gap-8">
      <Card title="Current Weather">
        {JSON.stringify(data?.current)}
      </Card>
      <DailyForecast />
    </div>
  )
}

export default App
