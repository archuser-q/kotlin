import { useAirQualityQuery, useWeatherQuery } from "@/utils/axios";
import { useLocalSearchParams } from "expo-router";

export const useData = () => {
  const params = useLocalSearchParams();
  const cityName = params.cityName as string;
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);

  const {data: weather} = useWeatherQuery(latitude, longitude);
  const {data: airQuality} = useAirQualityQuery(latitude, longitude);

  return { 
    cityName,
    latitude,
    longitude, 
    weather, 
    airQuality,
  };
};
