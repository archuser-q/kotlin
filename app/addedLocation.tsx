import { cities, DataType } from "@/data/locationData";
import { getWeather } from "@/utils/axios";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const SEARCH_HISTORY_KEY = '@search_history';

export default function AddedLocation() {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<DataType[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const router = useRouter();

  useEffect(()=>{
    const getPermissions = async()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status!=='granted'){
        console.log('Permission is not granted');
        return;
      }
      let currentlocation = await Location.getCurrentPositionAsync();
      setLocation(currentlocation);
    };
    getPermissions();
  },[]);

  /*Load search history*/
  useEffect(()=>{
    loadSearchHistory();
  },[])

  const loadSearchHistory = async () => {
    try{
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    } catch(error){
      console.error();
    }
  };

  const saveToHistory = async (cityName: string) => {
    try {
      const newHistory = [cityName, ...searchHistory.filter(c => c !== cityName)].slice(0, 10);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      setSearchHistory(newHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setFilteredCities([]);
    } else {
      const result = cities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(result);
    }
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="pt-12">
          <View className="flex-row items-center justify-between mx-4">
              <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 flex-1 mr-3">
                <Ionicons name="search-outline" size={20} color="#9ca3af" />
                <TextInput
                    value={query}
                    onChangeText={handleSearch}
                    placeholder="Enter location ..."
                    placeholderTextColor="#9ca3af"
                    className="flex-1 ml-2 text-gray-800 text-base"
                />
              </View>
              <TouchableOpacity onPressIn={() => router.push("/")}>
                <Text className="text-blue-500 text-base">Cancel</Text>
              </TouchableOpacity>
          </View>
      </View>

      {filteredCities.length > 0 ? (
        <View className="mx-4 mt-6 bg-gray-50 rounded-3xl p-4 shadow-sm">
          {filteredCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row justify-between items-center py-3 border-gray-200"
              onPress={async()=>{
                const weatherData = await getWeather(city.latitude, city.longitude);
                if (weatherData){
                  await saveToHistory(city.name);
                  router.push({
                    pathname: '/fullLocationInfo',
                    params: {
                      cityName: city.name,
                      weatherData: JSON.stringify(weatherData),
                    }
                  })
                }
              }}
            >
              <View>
                <Text className="text-lg text-gray-800">{city.name}</Text>
                <Text className="text-sm text-gray-400">{city.region}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <View className="py-5 gap-3">
            <View className="mx-5">
              <Text className="text-lg pl-2 text-gray-400">Current location</Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                if (!location) return;

                const [geo] = await Location.reverseGeocodeAsync({
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
                });

                const region = geo?.region || "Unknown";
                const { latitude, longitude } = location.coords;

                const weatherData = await getWeather(latitude, longitude);

                router.push({
                  pathname: "/fullLocationInfo",
                  params: {
                    cityName: region,
                    region,
                    latitude: String(latitude),
                    longitude: String(longitude),
                    weatherData: JSON.stringify(weatherData),
                  },
                });
              }}
            >
              <View className="flex-row justify-center items-center bg-gray-100 rounded-2xl mx-4 py-6 gap-2">
                <Ionicons name="location-outline" size={30} color="#3b82f6" />
                <Text className="text-xl text-blue-500">Get current location</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1 flex-row pb-5">
            <View className="mx-5 flex-1">
              <View className="flex-row justify-between items-center pb-4">
                <Text className="text-lg pl-2 text-gray-400">Search history</Text>
                <TouchableOpacity className="pr-2" onPress={clearHistory}>
                  <Ionicons name="trash-outline" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {searchHistory.map((city, i) => (
                  <TouchableOpacity key={i} className="bg-gray-100 py-3 px-5 rounded-xl">
                    <Text className="text-center">{city}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View className="flex-1 flex-row">
            <View className="mx-5">
              <Text className="text-lg pl-2 text-gray-400 pb-4">Popular location</Text>
              <View className="flex-row flex-wrap gap-3">
                {cities.slice(0, 5).map(
                  (city, i) => (
                    <TouchableOpacity 
                      key={i} 
                      className="bg-gray-100 py-3 px-5 rounded-xl"
                      onPress={async () => {
                      const weatherData = await getWeather(city.latitude, city.longitude);
                      if (weatherData) {
                        router.push({
                          pathname: '/fullLocationInfo',
                          params: {
                            cityName: city.name,
                            weatherData: JSON.stringify(weatherData),
                          }
                        });
                      }
                    }}>
                      <Text className="text-center">{city.name}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}