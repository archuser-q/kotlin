type WeatherGifProps = {
  isDay: number;
  cloud_cover: number;
  rain: number;
  visibility: number;
  wind_gusts_10m: number;
  uv_index: number;
};

export default function getWeatherGif({
  isDay,
  cloud_cover,
  rain,
  visibility,
  wind_gusts_10m,
  uv_index,
}: WeatherGifProps) {
  const currentHour = new Date().getHours();
  if (isDay && (currentHour >= 5 && currentHour <= 7)) {
    return require('../assets/sunrise.gif');
  }
  if (isDay && (currentHour >= 17 && currentHour <= 19)) {
    return require('../assets/sunset.gif');
  }

  if (rain > 5 && wind_gusts_10m > 20) {
    return require('../assets/storm.gif');
  }

  if (rain > 2) {
    return isDay 
      ? require('../assets/rain.gif') 
      : require('../assets/Night_Sky_Rain.gif');
  }

  if (visibility < 1000) {
    return isDay 
      ? require('../assets/fog.gif') 
      : require('../assets/fogNight.gif');
  }

  if (!isDay) {
    if (cloud_cover > 50) {
      return require('../assets/nighttime.gif'); 
    }
    return require('../assets/clearSkyNight.gif');
  }

  if (uv_index >= 6) {
    return require('../assets/sunnyday.gif');
  }

  if (cloud_cover > 70 && currentHour >= 12 && currentHour < 17) {
    return require('../assets/afternoonCloud.gif');
  }

  if (cloud_cover > 70) {
    return require('../assets/daytimeWithCloud.gif');
  }

  if (cloud_cover > 30 && currentHour >= 12 && currentHour < 17) {
    return require('../assets/afternoonCloud.gif');
  }

  return require('../assets/daytime.gif');
}