import axios from 'axios';

export async function getWeather(latitude: number, longitude: number) {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: latitude,
        longitude: longitude,
        timezone: 'auto',
        current: 'temperature_2m,relative_humidity_2m,uv_index,rain,wind_speed_10m,wind_gusts_10m,wind_direction_10m,pressure_msl,is_day,visibility,cloud_cover',
        daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,apparent_temperature_max,apparent_temperature_min',
        hourly: 'temperature_2m'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.message);
    return null;
  }
}

export async function getAirQuality(latitude: number, longitude: number) {
  try {
    const response = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
      params: {
        latitude: latitude,
        longitude: longitude,
        timezone: 'auto',
        hourly: 'pm10,pm2_5,nitrogen_dioxide,ozone,european_aqi'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi Air Quality API:', error.message);
    return null;
  }
}