type Props = {
  mapType: string;
};

interface ColorStop {
  value: number;
  color: string;
}

export default function MapLegend({ mapType }: Props) {
  const data = mapTypeData[mapType];

  // Safety check if mapType is undefined or not in the record
  if (!data) return null;

  const minValue = data.stops[0].value;
  const maxValue = data.stops[data.stops.length - 1].value;
  const range = maxValue - minValue;

  const gradientStops = data.stops
    .map((stop, index) => {
      let percentage = ((stop.value - minValue) / range) * 100;

      if (index === 0) percentage = 0;
      if (index === data.stops.length - 1) percentage = 100;

      return `${stop.color} ${percentage}%, ${stop.color} ${percentage}%`;
    }).join(", ");

  return (
    <div className="absolute bottom-2 left-2 z-[1001] w-42 xs:w-64 rounded-sm shadow-lg p-2.5 bg-background/50 backdrop-blur-sm border dark:boreder-none border-accent/70 flex flex-col gap-1.25">
      <h3 className="text-xs font-semibold text-foreground">{data.title}</h3>
      <div className="w-full h-2.5 rounded-xs border border-accent/30 overflow-hidden">
        <div
          className="h-full w-[calc(100%+6px)] -ml-[3px]"
          style={{
            background: `linear-gradient(90deg, ${gradientStops})`,
          }}
        />
      </div>
      <div className="flex justify-between text-[9px] px-1 h-3 font-medium text-muted-foreground">
        <span>
          {data.stops[0].value}{data.unit}
        </span>
        <span>
          {data.stops[Math.floor(data.stops.length / 2)].value}{data.unit}
        </span>
        <span>
          {data.stops[data.stops.length - 1].value}{data.unit}
        </span>
      </div>
    </div>
  );
}


const mapTypeData: Record<string, { title: string; unit: string; stops: ColorStop[] }> = {
  tmp2m: {
    title: "Temperatur",
    unit: "°C",
    stops: [
      { value: -30, color: "#4c1d95" }, // Deep Purple (visible on dark)
      { value: -10, color: "#2563eb" }, // Bright Blue
      { value: 0, color: "#0ea5e9" },   // Sky Blue
      { value: 10, color: "#22c55e" },  // Leaf Green
      { value: 20, color: "#eab308" },  // Golden Yellow
      { value: 30, color: "#f97316" },  // Vibrant Orange
      { value: 40, color: "#dc2626" },  // Strong Red
    ],
  },
  precip: {
    title: "Niederschlag",
    unit: "mm",
    stops: [
      // 1. Ditch the hidden transparent white for a visible cyan.
      // This tells the user 'This area has zero rain, not no data.'
      { value: 0, color: "rgba(186, 230, 253, 0.2)" }, // Very Faint Cyan

      // 2. Use higher-saturation, mid-range blues
      { value: 0.5, color: "#60a5fa" }, // Light Blue (Vibrant)
      { value: 2, color: "#2563eb" },   // Mid Blue (Vibrant)

      // 3. Keep the dark blue only for the most extreme values
      { value: 10, color: "#1d4ed8" },  // Deep Blue
      { value: 50, color: "#1e3a8a" },  // Dark Navy
    ],
  },
  pressure: {
    title: "Luftdruck",
    unit: "mb",
    stops: [
      { value: 950, color: "#a855f7" },  // Purple
      { value: 1000, color: "#3b82f6" }, // Blue
      { value: 1013, color: "#10b981" }, // Emerald Green (Standard Pressure)
      { value: 1030, color: "#f59e0b" }, // Amber
      { value: 1050, color: "#ef4444" }, // Red
    ],
  },
  wind: {
    title: "Windgeschwindigkeit",
    unit: "km/h",
    stops: [
      // Avoid solid white (#f8fafc) or solid black (#020617)
      { value: 0, color: "#94a3b8" },   // Slate Gray (visible on both)
      { value: 20, color: "#6366f1" },  // Indigo
      { value: 40, color: "#8b5cf6" },  // Violet
      { value: 60, color: "#d946ef" },  // Fuchsia
      { value: 100, color: "#f43f5e" }, // Rose
      { value: 150, color: "#fbbf24" }, // Amber (Hurricane force)
    ],
  },
};