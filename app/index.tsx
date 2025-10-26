import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
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
    </ScrollView>
  );
}
