import { useCardStore } from "@/store/cityCardStore";
import { getAirQuality, getWeather } from "@/utils/axios";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { cards } = useCardStore();
  return (
    <ScrollView className="bg-white">
      <View className="pt-12 pl-5 pb-10">
        <TouchableOpacity
          onPress={() => console.log("Go back")}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-4xl pl-7 pb-3 leading-relaxed">Managing cities</Text>
      <View className="flex-row items-center bg-gray-100 rounded-3xl mx-4 px-4">
        <Ionicons name="search-outline" size={20} color="#9ca3af" />
        <TextInput
          placeholder="Enter location ..."
          placeholderTextColor="#9ca3af"
          className="flex-1 ml-2 text-gray-800 text-base"
          onPressIn={() => router.push("/addedLocation")}
        />
      </View>
      <View 
        className="pl-7 pt-4"
      >
        <Text 
          className="text-gray-400"
        >
          Added location
        </Text>
      </View>
      <View className="pt-4 px-7 gap-4">
          {cards.map((card, index) => (
            <TouchableOpacity
                key={index}
                onPress={async () => {
                    const weatherData = await getWeather(card.latitude, card.longitude);
                    const airQualityData = await getAirQuality(card.latitude, card.longitude);
                    
                    if (weatherData && airQualityData) {
                        router.push({
                            pathname: '/fullLocationInfo',
                            params: {
                                cityName: card.cityName,
                                weatherData: JSON.stringify(weatherData),
                                airQualityData: JSON.stringify(airQualityData),
                            }
                        });
                    }
                }}
            >
              <ImageBackground
                  key={index}
                  source={card.gif}
                  resizeMode="cover"
                  className="bg-gray-300 flex-row justify-between py-4 rounded-3xl overflow-hidden"
              >
                  <View className="flex-start pl-3 pt-1">
                      <Text className="text-2xl font-semibold text-white">{card.cityName}</Text>
                      <Text className="text-xl text-white">{card.description}</Text>
                  </View>
                  <View className="flex-end pr-3">
                      <Text className="text-5xl text-white">{card.currentTemp}°C</Text>
                      <Text className="text-white">{card.maxTemp}°C /{card.minTemp}°C</Text>
                  </View>
              </ImageBackground>
            </TouchableOpacity>
              
          ))}
      </View>
    </ScrollView>
  );
}
