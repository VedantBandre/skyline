import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {}

export function DailySkeleton ({} : Props) {
  return (
    <Card 
        title="Tägliche Vorhersage" 
        childrenClassName="flex flex-col">
            {Array.from({length: 3}).map((_, index) => (
                <div key={index} className="flex justify-between items-center py-0.25">
                    
                    <Skeleton className="w-9 h-6"/>
                    {/* <p className="w-9">{formatDate(day.date)}</p> */}
                    
                    <Skeleton className="w-8 h-8"/>
                    {/* <WeatherIcon src={day.day.condition.icon}/> */}
                    
                    <Skeleton className="w-10 h-6"/>
                    {/* <p className="items-center">{Math.round(day.day.avgtemp_c)} °C</p> */}
                    
                    <Skeleton className="w-10 h-6"/>
                    {/* <p className="text-gray-300/75 items-center">{Math.round(day.day.mintemp_c)} °C</p> */}
                    
                    <Skeleton className="w-10 h-6"/>
                    {/* <p className="text-gray-300/75 items-center">{Math.round(day.day.maxtemp_c)} °C</p> */}

                </div>
        ))}
    </Card>
  );
}
