import {
    Cloud,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSnow,
    HelpCircle,
    Sun
} from "lucide-react-native";
import React from "react";

const getLucideWeatherIcon = (weathercode: number) => {
  const iconMap: Record<number, React.ComponentType<any>> = {
    0: Sun,
    1: Cloud, 2: Cloud, 3: Cloud,
    45: CloudFog, 48: CloudFog,
    51: CloudRain, 53: CloudRain, 55: CloudRain,
    61: CloudRain, 63: CloudRain, 65: CloudRain,
    71: CloudSnow, 73: CloudSnow, 75: CloudSnow,
    80: CloudRain, 81: CloudRain, 82: CloudRain,
    85: CloudSnow, 86: CloudSnow,
    95: CloudLightning, 96: CloudLightning, 99: CloudLightning
  };

  return iconMap[weathercode] || HelpCircle;
};

export const WeatherIcon = ({ weathercode, size = 32, color = "white" }) => {
  const Icon = getLucideWeatherIcon(weathercode);
  return <Icon size={size} color={color} />;
};
