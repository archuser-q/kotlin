export default function getWindDirection(degree: number): string {
  if (degree === null || degree === undefined) return 'N/A';
  
  const directions = [
    'North', 'N.East', 'East', 'S.East', 
    'South', 'S.West', 'West', 'N.West'
  ];
  const index = Math.round(((degree % 360) / 45)) % 8;
  return directions[index];
}