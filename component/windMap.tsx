import { createWindyHTML } from '@/component/htmlWindyCom';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface WindMapCardProps {
  latitude: number,
  longitude: number
}

export default function WindMapCard({latitude, longitude}: WindMapCardProps) {
  const htmlContent = createWindyHTML(latitude, longitude);
  return (
    <View className="h-64 w-full overflow-hidden rounded-2xl">
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        scrollEnabled={false}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}