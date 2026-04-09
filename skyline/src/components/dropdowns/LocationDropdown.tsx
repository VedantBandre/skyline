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
      <SelectTrigger className="min-w-[140px]">
            <SelectValue>
                {displayValue}
            </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-1001">
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
    "Bangkok",
    "Tokyo",
    "Seoul",
    "Dubai",
    "Manila",
    "London",
    "New York",
    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
    "Lisbon",
]
