import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function addedLocation(){
    return(
        <ScrollView className="bg-white">
            <View className="pt-12">
                <View className="flex-row items-center bg-gray-100 rounded-3xl mx-4 px-4">
                    <Ionicons 
                        name="search-outline" 
                        size={20} 
                        color="#9ca3af" 
                    />
                    <TextInput
                        placeholder="Enter location ..."
                        placeholderTextColor="#9ca3af"
                        className="flex-1 ml-2 text-gray-800 text-base"
                    />
                    <TouchableOpacity>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="py-5 gap-3">
                <View className="mx-5">
                    <Text 
                        className="text-lg pl-2 text-gray-400"
                    >
                        Current location
                    </Text>
                </View>
                <TouchableOpacity>
                    <View className="flex-row justify-center items-center bg-gray-100 rounded-2xl mx-4 py-6 gap-2">
                        <Ionicons 
                            name="location-outline" 
                            size={30} 
                            color="#3b82f6" 
                        />
                        <Text className="text-xl text-blue-500">Get current location</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex-1 flex-row pb-5">
                <View className="mx-5">
                    <View className="flex-row justify-between items-center pb-4">
                        <Text 
                            className="text-lg pl-2 text-gray-400"
                        >
                            Search history
                        </Text>
                        <TouchableOpacity className="pr-2">
                            <Ionicons 
                                name="trash-outline" 
                                size={20} 
                                color="#9ca3af" 
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row flex-wrap gap-3">
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Hanoi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Hue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Saigon</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Saigon</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Saigon</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Saigon</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="items-end flex-1">
                    <TouchableOpacity 
                        className="text-lg pr-7"
                    >
                        <Ionicons 
                            name="trash" 
                            size={20} 
                            color="#9ca3af" 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-1 flex-row">
                <View className="mx-5">
                    <Text 
                        className="text-lg pl-2 text-gray-400 pb-4"
                    >
                        Popular location
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Saudi Arabi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">New Delhi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Sydney</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Tokyo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Seoul</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-100 py-3 px-5 rounded-xl">
                            <Text className="text-center">Beijing</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}