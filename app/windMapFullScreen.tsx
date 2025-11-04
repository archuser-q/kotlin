import { createWindyHTML } from '@/component/htmlWindyCom';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WindMapFullscreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);

  const htmlContent = createWindyHTML(latitude, longitude);

  return (
    <View className="flex-1">
      <View className="absolute top-4 right-4 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-black/60 rounded-full p-3"
        >
          <X color="white" size={24} />
        </TouchableOpacity>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}