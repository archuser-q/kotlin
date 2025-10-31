type WeatherGifProps = {
  isDay: number;
  weathercode: number; 
};

export default function getWeatherGif({ isDay, weathercode }: WeatherGifProps) {
  const currentHour = new Date().getHours();

  if (isDay && currentHour >= 5 && currentHour <= 7) {
    return require('../assets/sunrise.gif');
  }
  if (isDay && currentHour >= 17 && currentHour <= 19) {
    return require('../assets/sunset.gif');
  }

  if ([95, 96, 99].includes(weathercode)) {
    return require('../assets/storm.gif');
  }

  if ([51, 53, 55].includes(weathercode)) {
    return require('../assets/drizzleRain.gif');
  }

  if ([61, 63, 65, 80, 81, 82].includes(weathercode)) {
    if (!isDay) {
      if ([65, 82].includes(weathercode)) {
        return require('../assets/nighttimeHeavyRain.gif');
      }
      return require('../assets/Night_Sky_Rain.gif');
    }
    return require('../assets/drizzleRain.gif');
  }

  if ([71, 73, 75, 85, 86].includes(weathercode)) {
    return isDay
      ? require('../assets/daytimeSnowy.gif')
      : require('../assets/nighttimeSnowy.gif');
  }

  if ([45, 48].includes(weathercode)) {
    return isDay
      ? require('../assets/fog.gif')
      : require('../assets/fogNight.gif');
  }

  if (!isDay) {
    if ([2, 3].includes(weathercode)) {
      return require('../assets/nighttime.gif');
    }
    return require('../assets/clearSkyNight.gif');
  }

  if (weathercode === 2 && currentHour >= 12 && currentHour < 17) {
    return require('../assets/afternoonCloud.gif');
  }

  if (weathercode === 3) {
    return require('../assets/daytimeWithCloud.gif');
  }

  if ([0, 1].includes(weathercode)) {
    return require('../assets/sunnyday.gif');
  }

  return require('../assets/daytime.gif');
}