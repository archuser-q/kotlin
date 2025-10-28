export default function getUVLevel(uv: number): string {
    if (uv < 20) return 'Low';
    if (uv < 40) return 'Mod';
    if (uv < 60) return 'High';
    if (uv < 80) return 'V.High';
    return 'Danger';
}