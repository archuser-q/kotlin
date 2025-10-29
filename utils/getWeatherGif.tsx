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
  if (rain > 5) {
    if (wind_gusts_10m > 10) return require('../assets/storm.gif');
    return isDay ? require('../assets/rain.gif') : require('../assets/Night_Sky_Rain.gif');
  }

  if (visibility < 1000) {
    return isDay ? require('../assets/fog.gif') : require('../assets/fogNight.gif');
  }

  if (cloud_cover > 70) {
    return isDay ? require('../assets/daytimeWithCloud.gif') : require('../assets/nighttime.gif');
  }

  if (cloud_cover > 30) {
    return isDay ? require('../assets/afternoonCloud.gif') : require('../assets/nighttime.gif');
  }
  if (uv_index >= 6) {
    return require('../assets/sunnyday.gif');
  }

  return isDay ? require('../assets/daytime.gif') : require('../assets/clearSkyNight.gif');
}