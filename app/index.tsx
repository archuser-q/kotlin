import { WeatherCard } from "@/component/weatherCard";
import { useCardStore } from "@/store/cityCardStore";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React, { useEffect } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';

export default function Index() {
  const router = useRouter();
  const { cards, loadCards, removeCards } = useCardStore();

  const renderRightActions = (index: number) => (
    <TouchableOpacity
      onPress={() => removeCards(index)}
      className="bg-red-500 justify-center items-center px-6 rounded-3xl"
    >
      <Trash2 size={30} color={'white'}/>
    </TouchableOpacity>
  );

  useEffect(()=>{
    loadCards();
  },[])
  return (
    <ScrollView className="bg-white">
      <TouchableOpacity>
        <Text 
          className="pt-20"
          onPress={()=>router.push('/windMap')}
        >Hello</Text>
      </TouchableOpacity>
      <Text className="text-4xl pl-7 pb-3 leading-relaxed  pt-20">Managing cities</Text>
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
      <View className="pt-5 px-7 gap-4 pb-16">
          {cards.map((card, index) => (
            <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  router.push({
                      pathname: '/fullLocationInfo',
                      params: {
                          cityName: card.cityName,
                          latitude: card.latitude, 
                          longitude: card.longitude,
                      }
                  });
                }}
              >
                <WeatherCard
                  cityName={card.cityName}
                  latitude={card.latitude}
                  longitude={card.longitude} 
                />
              </TouchableOpacity>
            </Swipeable>
          ))}
      </View>
    </ScrollView>
  );
}
