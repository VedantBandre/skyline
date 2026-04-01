// in order to modify WeatherIcon size (from default) when needed
import clsx from "clsx";

type Props = {
    src: string,
    className?: string
}

export default function WeatherIcon ({ src, className } : Props) {
  return (
    <div>
      <img 
        className={clsx("size-8", className)}
        src={`https:${src}`}
        alt="Weather Icon"
        />
    </div>
  );
}
