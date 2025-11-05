import { InfoCard } from "@/type/InfoCardProps";

export const INFO_CARDS: Record<string, InfoCard> = {
  uv: {
    title: 'UV Index là gì?',
    description: 'Chỉ số UV đo cường độ bức xạ tia cực tím từ mặt trời.',
    ranges: [
      { label: 'Thấp', range: '0-2', color: '#22c55e' },
      { label: 'Trung bình', range: '3-5', color: '#eab308' },
      { label: 'Cao', range: '6-7', color: '#f97316' },
      { label: 'Rất cao', range: '8-10', color: '#ef4444' },
      { label: 'Cực cao', range: '11+', color: '#991b1b' }
    ]
  },
  humidity: {
    title: 'Độ ẩm là gì?',
    description: 'Độ ẩm tương đối đo lượng hơi nước trong không khí so với lượng tối đa có thể chứa ở nhiệt độ đó.',
    ranges: [
      { label: 'Khô', range: '0-30%', color: '#f59e0b' },
      { label: 'Thoải mái', range: '30-60%', color: '#22c55e' },
      { label: 'Ẩm', range: '60-100%', color: '#3b82f6' }
    ]
  },
  realfeel: {
    title: 'Nhiệt độ cảm nhận là gì?',
    description: 'Nhiệt độ cảm nhận (Apparent Temperature) là nhiệt độ mà cơ thể con người cảm nhận được, tính đến yếu tố gió và độ ẩm.'
  },
  pressure: {
    title: 'Áp suất khí quyển là gì?',
    description: 'Áp suất khí quyển đo lực mà không khí tác động lên bề mặt. Áp suất cao thường báo hiệu thời tiết đẹp, áp suất thấp báo hiệu mưa.'
  },
  cloud: {
    title: 'Độ che phủ mây là gì?',
    description: 'Độ che phủ mây đo phần trăm bầu trời bị che phủ bởi mây. 0% là trời quang đãng, 100% là trời hoàn toàn u ám.'
  },
};