import axios from 'axios';

export async function getWeather(latitude: number, longitude: number) {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: latitude,
        longitude: longitude,
        timezone: 'auto',
        current: 'temperature_2m,relative_humidity_2m,uv_index,rain,wind_speed_10m,wind_direction_10m,pressure_msl',
        daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.message);
    return null;
  }
}