import CircularProgressBar from "@/component/CircularProgressBar";
import DashCircularProgressBar from "@/component/DashCircularProgressBar";
import RGBCircularProgressBar from "@/component/RGBCIrcularProgressBar";
import { Wave } from "@/component/wave";
import getUVLevel from "@/utils/getUVLevel";
import getWeatherGif from "@/utils/getWeatherGif";
import getWindDirection from "@/utils/getWindDirection";
import { useLocalSearchParams } from "expo-router";
import { Droplet, Sun, Thermometer } from 'lucide-react-native';
import { ImageBackground, ScrollView, Text, View } from "react-native";

export default function fullLocationInfo(){
    const { cityName, weatherData, airQualityData } = useLocalSearchParams();
    const weather = JSON.parse(weatherData as string); 
    const airQuality = JSON.parse(airQualityData as string);
    const windDirectionPercent = (weather.current.wind_direction_10m / 360) * 100;
    const data = [
        { time: "06:00", temp: "22" },
        { time: "09:00", temp: "25" },
        { time: "12:00", temp: "28" },
        { time: "15:00", temp: "27" },
        { time: "18:00", temp: "24" },
        { time: "21:00", temp: "23" },
        { time: "00:00", temp: "22" },
    ];
    return(
        <ImageBackground
            source={getWeatherGif({
                isDay: weather.current.is_day,
                cloud_cover: weather.current.cloud_cover,
                rain: weather.current.rain,
                visibility: weather.current.visibility,
                wind_gusts_10m: weather.current.wind_gusts_10m,
                uv_index: weather.current.uv_index,
            })}
            resizeMode="cover"
        >
            <ScrollView className="">
                <View className="pt-36 pl-7 gap-5 pb-96">
                    <Text className="text-xl text-white">{cityName}</Text>
                    <Text className="text-9xl text-white">{Math.round(weather.current.temperature_2m)}°</Text>
                    <Text className="text-xl text-white">Clear {Math.round(weather.daily.temperature_2m_max[0])}°/{Math.round(weather.daily.temperature_2m_min[0])}°</Text>
                </View>
                <View className="mt-8 px-6">
                    <View
                        className="bg-white/20 rounded-3xl p-5"
                    >
                        <Text className="text-xl font-medium mb-3 text-white">Hourly Forecast</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row"
                        >
                            {data.map((item,index)=>(
                                <View
                                    key={index}
                                    className="items-center justify-center mr-4 gap-3"
                                >
                                    <Text className="font-medium text-white">{item.time}</Text>
                                    <Sun size={30} color="white" fill="white" />
                                    <Text className="font-medium text-center text-white">{item.temp}°</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="flex-row flex-wrap justify-between px-6 pt-5 pb-10">
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
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
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
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
                    <View className="w-[100%] h-38 bg-white/20 rounded-2xl mb-5 py-5 pl-5 pr-5">
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

                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row items-center pr-5">
                        <View className="pb-20 flex-1">
                            <Text className="text-white">Rainfall</Text>
                            <Text className="text-2xl font-medium text-white">{weather.current.rain}mm</Text>
                        </View>
                        <View className="pt-10">
                            <Wave size={67} value={Math.min((weather.current.rain /10) * 100, 100)}/>
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row items-center pr-5">
                        <View className="pb-20 flex-1">
                            <Text className="text-white">Real feel</Text>
                            <Text className="text-2xl font-medium text-white">{Math.round(weather.daily.apparent_temperature_max[0])}°</Text>
                        </View>
                        <View className="pt-10">
                            <CircularProgressBar fill={weather.daily.apparent_temperature_max} tintColor="#3b82f6">
                                {(fill) => <Thermometer size={24} color="#3b82f6" />}
                            </CircularProgressBar>
                        </View>
                    </View>
                    <View className="w-[100%] h-38 bg-white/20 rounded-2xl mb-5 py-5 pl-5 pr-5">
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
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
                        <View className="pb-20">
                            <Text className="text-white">Air quality</Text>
                            <Text className="text-2xl font-medium text-white">{airQuality.hourly.european_aqi[0]}</Text>
                        </View>
                    </View>
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
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
                    <View className="w-[49%] h-38 bg-white/20 rounded-2xl mb-5 pt-5 pl-5 flex-row justify-between items-center pr-5">
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