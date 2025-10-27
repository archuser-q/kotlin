import { cities, DataType } from "@/data/locationData";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddedLocation() {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<DataType[]>([]);

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
              <TouchableOpacity onPress={() => handleSearch("")}>
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
            <TouchableOpacity>
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
                <TouchableOpacity className="pr-2">
                  <Ionicons name="trash-outline" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {["Hanoi", "Hue", "Saigon"].map((city, i) => (
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
                {["Saudi Arabia", "New Delhi", "Sydney", "Tokyo", "Seoul", "Beijing"].map(
                  (city, i) => (
                    <TouchableOpacity key={i} className="bg-gray-100 py-3 px-5 rounded-xl">
                      <Text className="text-center">{city}</Text>
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