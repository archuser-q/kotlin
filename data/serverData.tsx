import { useLocalSearchParams } from "expo-router";

export const useData = () => {
  const { cityName, weatherData, airQualityData, latitude, longtitude } = useLocalSearchParams();
  const weather = JSON.parse(weatherData as string);
  const airQuality = JSON.parse(airQualityData as string);
  const windDirectionPercent = (weather.current.wind_direction_10m / 360) * 100;
  const now = new Date();
  const currentHour = now.getHours();

  const data = weather?.hourly?.time && weather?.hourly?.temperature_2m
    ? weather.hourly.time
        .map((time: string, index: number) => {
          const hour = new Date(time).getHours();
          const isToday = new Date(time).getDate() === now.getDate();
          const isCurrentHour = isToday && hour === currentHour;
          return {
            time: isCurrentHour ? 'Current' : `${hour}h`,
            temp: Math.round(weather.hourly.temperature_2m[index]),
            timestamp: new Date(time).getTime()
          };
        })
        .filter(item => item.timestamp >= now.getTime())
        .slice(0, 12)
    : [];

  return { cityName, weather, airQuality, windDirectionPercent, data, latitude: weather.latitude,longitude: weather.longitude };
};
