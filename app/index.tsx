import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
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
          <ImageBackground
            source={require("../assets/sunnyday.gif")}
            resizeMode="cover"
            className="bg-gray-300 flex-row justify-between py-4 rounded-3xl overflow-hidden"
          >
            <View className="flex-start pl-3 pt-1">
              <Text className="text-2xl font-semibold text-white">Hanoi</Text>
              <Text className="text-xl text-white">Clear</Text>
            </View>
            <View className="flex-end pr-3">
              <Text className="text-5xl text-white">25℃</Text>
              <Text className="text-white">32℃ /28℃</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require("../assets/sunnyday.gif")}
            resizeMode="cover"
            className="bg-gray-300 flex-row justify-between py-4 rounded-3xl overflow-hidden"
          >
            <View className="flex-start pl-3 pt-1">
              <Text className="text-2xl font-semibold text-white">Ho Chi Minh</Text>
              <Text className="text-xl text-white">Clear</Text>
            </View>
            <View className="flex-end pr-3">
              <Text className="text-5xl text-white">28℃</Text>
              <Text className="text-white">30℃ /23℃</Text>
            </View>
          </ImageBackground>
      </View>
    </ScrollView>
  );
}
