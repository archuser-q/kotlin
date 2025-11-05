import { useWeatherQuery } from '@/utils/axios';
import getWeatherDescription from '@/utils/getWeatherDescription';
import getWeatherGif from '@/utils/getWeatherGif';
import { ImageBackground, Text, View } from 'react-native';

interface WeatherCardProps {
  cityName: string;
  latitude: number;
  longitude: number;
}

export function WeatherCard({ cityName, latitude, longitude }: WeatherCardProps) {
  const { data: weather} = useWeatherQuery(latitude, longitude);
  if (!weather) {
    return (
        <View className="">
        </View>
    );
  }

  const currentTemp = Math.round(weather.current.temperature_2m);
  const maxTemp = Math.round(weather.daily.temperature_2m_max[0]);
  const minTemp = Math.round(weather.daily.temperature_2m_min[0]);
  const description = getWeatherDescription(weather.current.weathercode);
  const gifSource = getWeatherGif({
    isDay: weather.current.is_day,
    weathercode: weather.current.weathercode,
    weather: weather
  });

  return (
    <ImageBackground
      source={gifSource}
      resizeMode="cover"
      className="bg-gray-300 flex-row justify-between py-4 rounded-3xl overflow-hidden"
    >
      <View className="flex-start pl-3 pt-1">
        <Text className="text-2xl font-semibold text-white">{cityName}</Text>
        <Text className="text-xl text-white">{description}</Text>
      </View>
      <View className="flex-end pr-3">
        <Text className="text-5xl text-white">{currentTemp}°C</Text>
        <Text className="text-white">{maxTemp}°C /{minTemp}°C</Text>
      </View>
    </ImageBackground>
  );
}