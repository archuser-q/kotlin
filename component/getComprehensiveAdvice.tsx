import { AdviceResult } from "@/type/AdviceResult";

// UV Index Advice
export function getUVAdvice(uvIndex: number): AdviceResult {
  if (uvIndex <= 2) {
    return {
      level: 'Low',
      color: '#22c55e',
      advice: 'No protection required. You can safely stay outside.',
      icon: '☀️'
    };
  } else if (uvIndex <= 5) {
    return {
      level: 'Moderate',
      color: '#eab308',
      advice: 'Seek shade during midday hours. Wear sunscreen and sunglasses.',
      icon: '🕶️'
    };
  } else if (uvIndex <= 7) {
    return {
      level: 'High',
      color: '#f97316',
      advice: 'Protection required. Wear sunscreen SPF 30+, hat, and sunglasses. Reduce time in the sun between 10 AM - 4 PM.',
      icon: '🧴'
    };
  } else if (uvIndex <= 10) {
    return {
      level: 'Very High',
      color: '#ef4444',
      advice: 'Extra protection needed. Minimize sun exposure between 10 AM - 4 PM. Wear protective clothing, sunscreen SPF 50+.',
      icon: '⚠️'
    };
  } else {
    return {
      level: 'Extreme',
      color: '#991b1b',
      advice: 'Take full precautions. Unprotected skin will burn quickly. Avoid sun exposure during midday hours. Wear full protection.',
      icon: '🚫'
    };
  }
}

// Humidity Advice
export function getHumidityAdvice(humidity: number): AdviceResult {
  if (humidity < 30) {
    return {
      level: 'Dry',
      color: '#f59e0b',
      advice: 'Low humidity may cause dry skin and irritated airways. Stay hydrated and use moisturizer.',
      icon: '💧'
    };
  } else if (humidity <= 60) {
    return {
      level: 'Comfortable',
      color: '#22c55e',
      advice: 'Ideal humidity levels. Comfortable conditions for most activities.',
      icon: '✅'
    };
  } else {
    return {
      level: 'Humid',
      color: '#3b82f6',
      advice: 'High humidity may feel uncomfortable. Stay cool, wear breathable fabrics, and stay hydrated.',
      icon: '💦'
    };
  }
}

// Real Feel Temperature Advice
export function getRealFeelAdvice(realFeel: number, actualTemp: number): AdviceResult {
  const difference = Math.abs(realFeel - actualTemp);
  
  if (realFeel < 0) {
    return {
      level: 'Extreme Cold',
      color: '#3b82f6',
      advice: 'Frostbite risk. Wear multiple layers, cover all exposed skin. Limit outdoor time.',
      icon: '🥶'
    };
  } else if (realFeel < 10) {
    return {
      level: 'Cold',
      color: '#60a5fa',
      advice: 'Dress warmly in layers. Wear gloves, hat, and warm jacket.',
      icon: '🧥'
    };
  } else if (realFeel < 20) {
    return {
      level: 'Cool',
      color: '#22c55e',
      advice: 'Light jacket recommended. Comfortable for most outdoor activities.',
      icon: '🌤️'
    };
  } else if (realFeel < 30) {
    return {
      level: 'Comfortable',
      color: '#22c55e',
      advice: 'Pleasant temperature. Great weather for outdoor activities.',
      icon: '😊'
    };
  } else if (realFeel < 35) {
    return {
      level: 'Warm',
      color: '#f59e0b',
      advice: 'Stay hydrated. Wear light, breathable clothing. Seek shade when possible.',
      icon: '☀️'
    };
  } else if (realFeel < 40) {
    return {
      level: 'Hot',
      color: '#f97316',
      advice: 'Heat stress possible. Drink plenty of water, avoid strenuous activity during peak heat.',
      icon: '🥵'
    };
  } else {
    return {
      level: 'Extreme Heat',
      color: '#ef4444',
      advice: 'Dangerous heat levels. Stay indoors if possible. Risk of heat exhaustion and heat stroke.',
      icon: '🌡️'
    };
  }
}

// Atmospheric Pressure Advice
export function getPressureAdvice(pressure: number): AdviceResult {
  if (pressure < 980) {
    return {
      level: 'Very Low',
      color: '#ef4444',
      advice: 'Storm system likely. Expect rain or severe weather. People with joint pain may experience discomfort.',
      icon: '⛈️'
    };
  } else if (pressure < 1000) {
    return {
      level: 'Low',
      color: '#f97316',
      advice: 'Unsettled weather possible. Rain likely. Some people may experience headaches.',
      icon: '🌧️'
    };
  } else if (pressure < 1020) {
    return {
      level: 'Normal',
      color: '#22c55e',
      advice: 'Stable weather conditions. Generally pleasant weather expected.',
      icon: '✅'
    };
  } else if (pressure < 1040) {
    return {
      level: 'High',
      color: '#3b82f6',
      advice: 'Fair weather expected. Clear skies and calm conditions likely.',
      icon: '☀️'
    };
  } else {
    return {
      level: 'Very High',
      color: '#60a5fa',
      advice: 'Very stable conditions. Expect clear, calm weather. May be unusually still.',
      icon: '🌤️'
    };
  }
}

// Cloud Cover Advice
export function getCloudCoverAdvice(cloudCover: number): AdviceResult {
  if (cloudCover < 20) {
    return {
      level: 'Clear',
      color: '#22c55e',
      advice: 'Clear skies. Great visibility. Remember sun protection if during daytime.',
      icon: '☀️'
    };
  } else if (cloudCover < 50) {
    return {
      level: 'Partly Cloudy',
      color: '#60a5fa',
      advice: 'Partly cloudy conditions. Mix of sun and clouds. Pleasant weather for outdoor activities.',
      icon: '⛅'
    };
  } else if (cloudCover < 80) {
    return {
      level: 'Mostly Cloudy',
      color: '#6b7280',
      advice: 'Mostly cloudy skies. Reduced sunlight. Good conditions for outdoor activities without intense sun.',
      icon: '☁️'
    };
  } else {
    return {
      level: 'Overcast',
      color: '#4b5563',
      advice: 'Completely overcast. Limited sunlight. May feel gloomy, but no sun protection needed.',
      icon: '☁️☁️'
    };
  }
}

// Combined Weather Advice - considers multiple factors
export function getComprehensiveAdvice(weather: any, airQuality: any): string {
  const advices: string[] = [];
  
  // Check UV
  const uvAdvice = getUVAdvice(weather.current.uv_index);
  if (weather.current.uv_index > 6) {
    advices.push(uvAdvice.advice);
  }
  
  // Check temperature
  const realFeelAdvice = getRealFeelAdvice(
    weather.hourly.apparent_temperature[0], 
    weather.current.temperature_2m
  );
  if (weather.hourly.apparent_temperature[0] < 10 || weather.hourly.apparent_temperature[0] > 30) {
    advices.push(realFeelAdvice.advice);
  }
  
  if (advices.length === 0) {
    return 'Weather conditions are favorable. Enjoy your day!';
  }
  
  return advices.join(' ');
}