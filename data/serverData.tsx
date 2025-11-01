import { useAirQualityQuery, useWeatherQuery } from "@/utils/axios";
import { useLocalSearchParams } from "expo-router";

export const useData = () => {
  const params = useLocalSearchParams();
  const cityName = params.cityName as string;
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);

  const {data: weather} = useWeatherQuery(latitude, longitude);
  const {data: airQuality} = useAirQualityQuery(latitude, longitude);

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

  return { 
    cityName,
    latitude,
    longitude, 
    weather, 
    airQuality, 
    windDirectionPercent, 
    data 
  };
};
