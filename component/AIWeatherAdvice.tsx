import { getWeatherAdvice } from '@/services/weatherAdvisor';
import { RefreshCw } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface AIWeatherAdviceProps {
  weather: any;
  airQuality: any;
  cityName: string;
}

export default function AIWeatherAdvice({ 
  weather, 
  airQuality, 
  cityName 
}: AIWeatherAdviceProps) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(false);

    try {
      const adviceData = {
        temperature: Math.round(weather.current.temperature_2m),
        apparentTemperature: Math.round(weather.hourly.apparent_temperature[0]),
        humidity: Math.round(weather.current.relative_humidity_2m),
        uvIndex: weather.current.uv_index,
        pressure: Math.round(weather.current.pressure_msl),
        cloudCover: Math.round(weather.current.cloud_cover),
        visibility: weather.current.visibility,
        windSpeed: weather.current.wind_speed_10m,
        windGusts: weather.current.wind_gusts_10m,
        isDay: weather.current.is_day,
        weatherCode: weather.current.weathercode,
        rainfall: weather.daily.showers_sum[0],
        airQuality: airQuality.hourly.european_aqi[0],
        tempMax: Math.round(weather.daily.temperature_2m_max[0]),
        tempMin: Math.round(weather.daily.temperature_2m_min[0]),
        cityName: cityName,
      };

      console.log('Advice data prepared:', adviceData);
      console.log('Calling getWeatherAdvice...');

      const result = await getWeatherAdvice(adviceData);
      console.log('Result received:', result);
      setAdvice(result);
    } catch (err) {
      console.error('Failed to fetch advice:', err);
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
      setError(true);
      setAdvice('Không thể tải lời khuyên. Vui lòng thử lại.');
    } finally {
        console.log('fetchAdvice completed');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [weather, airQuality]);

  return (
    <View className="flex-row items-start mb-5">
      <View className="flex-1">
        {loading ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="white" />
            <Text className="text-white ml-2 opacity-70">
              Analysing weather...
            </Text>
          </View>
        ) : error ? (
          <TouchableOpacity onPress={fetchAdvice}>
            <Text className="text-white opacity-70">
              {advice}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text className="font-medium text-white leading-5">
            {advice}
          </Text>
        )}
      </View>
      {!loading && (
        <TouchableOpacity 
          onPress={fetchAdvice}
          className="ml-2 mt-0.5"
        >
          <RefreshCw size={16} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}