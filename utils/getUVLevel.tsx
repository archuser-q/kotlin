export default function getUVLevel(uv: number): string {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Mod';
    if (uv < 8) return 'High';
    if (uv < 11) return 'V.High';
    return 'Danger';
}