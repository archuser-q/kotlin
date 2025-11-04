type tempUnit = '°C' | '°F';
type windUnit = 'km/h' | 'm/s' | 'mph';

export const temperatureConverted = (temp: number, unit: tempUnit): number => {
    if (unit === '°F'){
        return Math.round((temp*1.8)+32);
    }
    return Math.round(temp);
};

export const windSpeedConverted = (speed: number, unit: windUnit): number => {
    switch (unit){
        case 'm/s':
            return Math.round((speed/3.6)*10)/10;
        case 'mph':
            return Math.round((speed*0.621371)*10)/10;
        default: 
            return Math.round(speed*10)/10;
    }
};