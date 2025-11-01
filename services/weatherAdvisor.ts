import getWeatherDescription from "@/utils/getWeatherDescription";
import Constants from 'expo-constants';

const OPENROUTER_API_KEY = Constants.expoConfig?.extra?.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface WeatherAdviceInput {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  uvIndex: number;
  pressure: number;
  cloudCover: number;
  visibility: number;
  windSpeed: number;
  windGusts: number;
  isDay: number;
  weatherCode: number;
  rainfall: number;
  airQuality: number;
  tempMax: number;
  tempMin: number;
  cityName: string;
}

export async function getWeatherAdvice(
  data: WeatherAdviceInput
): Promise<string> {
  const systemPrompt = `You are a helpful weather advisor. Provide practical, concise advice in English. Keep response to 2-3 SHORT sentences. Be direct and actionable.`;

  const userPrompt = `Today's weather in ${data.cityName}: ${data.temperature}°C (feels like ${data.apparentTemperature}°C), humidity ${data.humidity}%, UV ${data.uvIndex}, rainfall ${data.rainfall}mm, AQI ${data.airQuality}. ${getWeatherDescription(data.weatherCode)}. What should I wear and what activities are suitable? Answer BRIEFLY in 2-3 sentences.`;

  console.log('User Prompt:', userPrompt);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'tngtech/deepseek-r1t2-chimera:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('=== Full API Response ===');
    console.log('Response data:', JSON.stringify(responseData, null, 2));

    if (!responseData.choices || responseData.choices.length === 0) {
      throw new Error('API returned no choices');
    }

    const message = responseData.choices[0].message;

    if (!message) {
      throw new Error('API returned no message');
    }

    let content = message.content?.trim() || '';

    console.log('Content:', content);
    console.log('Reasoning:', message.reasoning);

    if (!content && message.reasoning) {
      content = message.reasoning.trim();
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 5) {
        content = lines.slice(-5).join(' ').trim();
      }
    }

    if (!content) {
      console.error('Both content and reasoning are empty!');
      throw new Error('API returned empty response');
    }

    console.log('Final content:', content);
    return content;

  } catch (error) {
    console.error('Weather Advisor Error:', error);
    console.error('Error details:', error);
    return 'Please check the weather and dress appropriately before going out!';
  }
}