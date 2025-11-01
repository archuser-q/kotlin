import CircularProgressBar from "@/component/CircularProgressBar";
import DashCircularProgressBar from "@/component/DashCircularProgressBar";
import RGBCircularProgressBar from "@/component/RGBCIrcularProgressBar";
import { Wave } from "@/component/wave";
import { useCardStore } from "@/store/cityCardStore";
import { useAirQualityQuery, useWeatherQuery } from "@/utils/axios";
import getUVLevel from "@/utils/getUVLevel";
import getWeatherDescription from "@/utils/getWeatherDescription";
import getWeatherGif from "@/utils/getWeatherGif";
import { WeatherIcon } from "@/utils/getWeatherIcon";
import getWindDirection from "@/utils/getWindDirection";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Droplet, EllipsisVertical, Plus, Thermometer } from 'lucide-react-native';
import { useEffect, useMemo, useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function fullLocationInfo(){
    const params = useLocalSearchParams();
    const cityName = params.cityName as string;
    const latitude = parseFloat(params.latitude as string);
    const longitude = parseFloat(params.longitude as string);
    
    const { data: weather } = useWeatherQuery(latitude, longitude);
    const { data: airQuality } = useAirQualityQuery(latitude, longitude);

    const [isCardExist, setIsCardExist] = useState(false);
    const [existingCardIndex, setExistingCardIndex] = useState(-1);

    const windDirectionPercent = useMemo(() => 
        weather ? (weather.current.wind_direction_10m / 360) * 100 : 0,
        [weather]
    );

    const router = useRouter();
    const { addCard, removeCards, cards} = useCardStore();

    useEffect(() => {
        const index = cards.findIndex(
            card => card.cityName === cityName && 
                    card.latitude === latitude && 
                    card.longitude === longitude
        );
        setIsCardExist(index !== -1);
        setExistingCardIndex(index);
    }, [cards, cityName, latitude, longitude]);

    const dataHourly = useMemo(() => {
        if (!weather?.hourly?.time) return [];
        
        const now = new Date();
        const currentHour = now.getHours();
        
        return weather.hourly.time
            .map((time: string, index: number) => {
                const hour = new Date(time).getHours();
                const isToday = new Date(time).getDate() === now.getDate();
                const isCurrentHour = isToday && hour === currentHour;
                return {
                    time: isCurrentHour ? 'Current' : `${hour}h`,
                    temp: Math.round(weather.hourly.temperature_2m[index]),
                    weathercode: weather.hourly.weathercode[index],
                    timestamp: new Date(time).getTime()
                };
            })
            .filter(item => item.timestamp >= now.getTime())
            .slice(0, 12);
    }, [weather]);

    const dataDaily = useMemo(() => {
        if (!weather?.daily?.time) return [];

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        const now = new Date();
        const currentHour = now.getHours();
        
        return weather.daily.time
            .map((date: string, index: number) => {
                const d = new Date(date);
                const weekday = weekdays[d.getDay()];
                return {
                    time: weekday,
                    min: Math.round(weather.daily.temperature_2m_min[index]),
                    max: Math.round(weather.daily.temperature_2m_max[index]),
                    weathercode: weather.daily.weathercode[index],
                    timestamp: d.getTime(),
                };
            })
            .filter(item => item.timestamp >= now.getTime())
            .slice(0, 12);
    }, [weather]);

    if (!weather || !airQuality) {
        return (
            <View className="">
            </View>
        );
    }
    const gifSource = getWeatherGif({
                isDay: weather.current.is_day,
                weathercode: weather.current.weathercode,
            });
    return(
        <ImageBackground
            source={gifSource}
            resizeMode="cover"
        >
            <ScrollView className="">
                <View className="flex-row justify-between pt-16 px-4">
                    {!isCardExist ? (
                        <>
                            <TouchableOpacity onPress={() => router.push("/addedLocation")}>
                                <View className="font-2xl bg-white/20 rounded-3xl py-2 px-3">
                                    <Text className="text-white">Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async() => {
                                    await addCard( 
                                        cityName,
                                        longitude,
                                        latitude,
                                    );
                                    router.push("/");
                                }}
                            >
                                <View className="font-2xl bg-white/20 rounded-3xl py-2 px-5">
                                    <Text className="text-white">Add</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View>
                            </View>
                            <View className="flex-row gap-5">
                                <TouchableOpacity 
                                    onPress={()=>router.push("/")}    
                                >
                                    <Plus color={'white'} size={30}/>
                                </TouchableOpacity>
                                <EllipsisVertical color={'white'} size={30}/>
                            </View>
                        </>
                    )}
                </View>
                <View className="pt-20 pl-7 gap-5 pb-96">
                    <Text className="text-xl text-white">{cityName}</Text>
                    <Text className="text-9xl text-white">{Math.round(weather.current.temperature_2m)}°</Text>
                    <Text className="text-xl text-white">{getWeatherDescription(weather.current.weathercode)} {Math.round(weather.daily.temperature_2m_max[0])}°/{Math.round(weather.daily.temperature_2m_min[0])}°</Text>
                </View>
                <View className="mt-8 px-4">
                    <View
                        className="bg-black/40 rounded-3xl p-5"
                    >
                        <Text className="text-xl font-medium mb-4 text-white">7-days Forecast</Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                        >
                            {dataDaily.map((item,index)=>(
                                <View
                                    key={index}
                                    className="items-center justify-between p-3 gap-10 flex-row"
                                >
                                    <Text className="font-2xl text-white w-12">{item.time}</Text>
                                    <View>
                                        <WeatherIcon weathercode={item.weathercode}/>
                                    </View>
                                    <Text className="font-2xl text-center text-white">{item.max}° / {item.min}°</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="mt-8 px-4">
                    <View
                        className="bg-black/40 rounded-3xl p-5"
                    >
                        <Text className="text-xl font-medium mb-5 ml-2 text-white">Hourly Forecast</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row"
                        >
                            {dataHourly.map((item,index)=>(
                                <View
                                    key={index}
                                    className="items-center justify-center mr-10 gap-3"
                                >
                                    <Text className="font-2xl text-white">{item.time}</Text>
                                    <WeatherIcon weathercode={item.weathercode}/>
                                    <Text className="font-2xl text-center text-white">{item.temp}°</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="flex-row flex-wrap justify-between px-4 pt-5 pb-10">
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">UV</Text>
                            <Text className="text-2xl font-medium text-white">
                                {getUVLevel(weather.current.uv_index)}
                            </Text>
                        </View>
                        <View className="pt-14">
                            <RGBCircularProgressBar filled={Math.min((weather.current.uv_index / 11) * 100, 100)} />
                        </View>
                    </View>
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Humidity</Text>
                            <Text className="text-2xl font-medium text-white">{Math.round(weather.current.relative_humidity_2m)}%</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={weather.current.relative_humidity_2m} tintColor="#3b82f6">
                                {(fill) => <Droplet size={24} color="#3b82f6" fill="#3b82f6" />}
                            </CircularProgressBar>
                        </View>
                    </View>
                    <View className="w-[100%] h-50 bg-black/40 rounded-2xl mb-5 py-5 pl-5 pr-5">
                        <Text className="text-white text-lg font-semibold mb-3">Wind</Text>

                        <View className="flex-row justify-between items-center">
                            <View className="flex-1 gap-3">
                                <Text className="text-white font-normal">Wind:</Text>
                                <Text className="text-white font-normal">Wind gust:</Text>
                                <Text className="text-white font-normal">Direction:</Text>
                            </View>
                            <View className="flex-1 gap-3">
                                <Text className="text-white font-normal">{weather.current.wind_speed_10m} km/h</Text>
                                <Text className="text-white font-normal">{weather.current.wind_gusts_10m} km/h</Text>
                                <Text className="text-white font-normal">{weather.current.wind_direction_10m}° {getWindDirection(weather.current.wind_direction_10m)}</Text>
                            </View>
                            <View>
                                <DashCircularProgressBar fill={windDirectionPercent}/>
                            </View>
                        </View>
                    </View>

                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row items-center pr-5">
                        <View className="pb-20 flex-1">
                            <Text className="text-white">Rainfall</Text>
                            <Text className="text-2xl font-medium text-white">{weather.daily.showers_sum[0]}mm</Text>
                        </View>
                        <View className="pt-10">
                            <Wave size={67} value={Math.min((weather.daily.showers_sum[0] / 50) * 100, 100)}/>
                        </View>
                    </View>
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row items-center pr-5">
                        <View className="pb-20 flex-1">
                            <Text className="text-white">Real feel</Text>
                            <Text className="text-2xl font-medium text-white">{Math.round((weather.daily.apparent_temperature_max[0] + weather.daily.apparent_temperature_min[0]) / 2)}°</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={Math.round(weather.daily.apparent_temperature_max[0])} tintColor="#3b82f6">
                                {(fill) => <Thermometer size={24} color="#3b82f6" />}
                            </CircularProgressBar>
                        </View>
                    </View>
                    <View className="w-[100%] h-50 bg-black/40 rounded-2xl mb-5 py-5 pl-5 pr-5">
                        <Text className="text-white text-lg font-semibold mb-3">Vision</Text>

                        <View className="flex-row justify-between items-center">
                            <View className="flex-1 gap-3">
                                <Text className="text-white font-normal">Sunset:</Text>
                                <Text className="text-white font-normal">Sunrise:</Text>
                                <Text className="text-white font-normal">Vision:</Text>
                            </View>
                            <View className="flex-1 gap-3">
                                <Text className="text-white font-normal">
                                    {new Date(weather.daily.sunset[0]).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </Text>
                                <Text className="text-white font-normal">
                                    {new Date(weather.daily.sunrise[0]).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </Text>
                                <Text className="text-white font-normal">{weather.current.visibility/1000} km</Text>
                            </View>
                        </View>
                    </View>
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Air quality</Text>
                            <Text className="text-2xl font-medium text-white">{airQuality.hourly.european_aqi[0]}</Text>
                        </View>
                    </View>
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Pressure</Text>
                            <Text className="text-2xl font-medium text-white">{Math.round(weather.current.pressure_msl)}</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={61} tintColor="#3b82f6">
                                {(fill) => (
                                    <Text className="text-blue-500 text-base font-bold pt-4">
                                        hPa
                                    </Text>
                                )}
                            </CircularProgressBar>
                        </View>
                    </View>
                    <View className="w-[49%] h-44 bg-black/40 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Cloud</Text>
                            <Text className="text-2xl font-medium text-white">{Math.round(weather.current.cloud_cover)}</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={Math.round(weather.current.cloud_cover)} tintColor="#3b82f6">
                            </CircularProgressBar>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}