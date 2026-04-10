import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    location : string
    setLocation : Dispatch<SetStateAction<string>>
}

export function LocationDropdown ({ location, setLocation } : Props) {
  // If the state is 'custom', we want to show 'Custom' (Capitalized)
  // Otherwise, we show the city name
  const displayValue = location === 'custom' ? 'Custom' : location;
    
  return (
    <Select value={location} onValueChange={(value) => value && setLocation(value)}>
      <SelectTrigger className="min-w-[120px]">
            <SelectValue>
                {displayValue}
            </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-1001 p-2 max-h-45 overflow-y-auto">
            {locations.map((city) => (
                <SelectItem key={city} value={city}>
                    {city}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

const locations = [
    "New York",
    "Reykjavik",
    "Lisbon",
    "London",
    "Madrid",
    "Paris",
    "Rome",
    "Berlin",
    "Saarbrücken",
    "Oslo",
    "Stockholm",
    "Copenhagen",
    "Helsinki",
    "Istanbul",
    "Moscow",
    "Dubai",
    "Mumbai",
    "Bangkok",
    "Singapore",
    "Hong Kong",
    "Shanghai",
    "Beijing",
    "Manila",
    "Seoul",
    "Tokyo",
    "Sydney",
    "Melbourne",
];
