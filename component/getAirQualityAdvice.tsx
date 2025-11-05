export default function getAirQualityAdvice(aqi: number): { advice: string } {
  if (aqi <= 20) {
    return {
      advice: 'Air quality is excellent. Enjoy outdoor activities freely.',
    };
  }
  if (aqi <= 40) {
    return {
      advice: 'Air quality is acceptable. Sensitive individuals may consider limiting prolonged outdoor exertion.',
    };
  }
  if (aqi <= 60) {
    return {
      advice: 'Air quality may affect sensitive groups. Consider reducing intense outdoor activity.',
    };
  }
  if (aqi <= 80) {
    return {
      advice: 'Air quality is unhealthy for sensitive groups. Avoid outdoor exercise if possible.',
    };
  }
  return {
    advice: 'Air quality is hazardous. Everyone should avoid outdoor activities and stay indoors.',
  };
}
