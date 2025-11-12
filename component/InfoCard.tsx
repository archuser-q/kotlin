import { InfoCard } from "@/type/InfoCardProps";

export const INFO_CARDS: Record<string, InfoCard> = {
  uv: {
    title: 'What is the UV Index?',
    description: 'The UV Index measures the intensity of ultraviolet radiation from the sun.',
    ranges: [
      { label: 'Low', range: '0-2', color: '#22c55e' },
      { label: 'Moderate', range: '3-5', color: '#eab308' },
      { label: 'High', range: '6-7', color: '#f97316' },
      { label: 'Very High', range: '8-10', color: '#ef4444' },
      { label: 'Extreme', range: '11+', color: '#991b1b' }
    ]
  },
  humidity: {
    title: 'What is Humidity?',
    description: 'Relative humidity measures the amount of water vapor in the air compared to the maximum it can hold at that temperature.',
    ranges: [
      { label: 'Dry', range: '0-30%', color: '#f59e0b' },
      { label: 'Comfortable', range: '30-60%', color: '#22c55e' },
      { label: 'Humid', range: '60-100%', color: '#3b82f6' }
    ]
  },
  realfeel: {
    title: 'What is Real Feel Temperature?',
    description: 'RealFeel (Apparent Temperature) is the temperature perceived by the human body, taking into account wind and humidity.'
  },
  pressure: {
    title: 'What is Atmospheric Pressure?',
    description: 'Atmospheric pressure measures the force exerted by air on the surface. High pressure usually indicates fair weather, while low pressure signals rain.'
  },
  cloud: {
    title: 'What is Cloud Cover?',
    description: 'Cloud cover measures the percentage of the sky covered by clouds. 0% means clear skies, 100% means completely overcast.'
  },
};
