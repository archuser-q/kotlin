export default function getWeatherGif({ isDay}: { isDay: number;}) {
  if (isDay === 1) {
    return require('../assets/sunnyday.gif');
  }

  return require('../assets/clearSkyNight.gif');
}
