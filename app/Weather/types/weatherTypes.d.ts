export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Wind {
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export interface CurrentData {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    temp: number,
    uvi: number,
    visibility: number,
    weather: Weather[],
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export interface DailyData {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: {
        day: number,
        eve: number,
        morn: number,
        night: number,
    },
    humidity: number,
    moon_phase: number,
    moonrise: number,
    moonset: number,
    pop: number,
    pressure: number,
    rain: number,
    summary: string,
    sunrise: number,
    sunset: number,
    temp: {
        day: number,
        eve: number,
        max: number,
        min: number,
        morn: number,
        night: number,
        uvi: number,
    },
    weather: Weather[],
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export interface HourlyData {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: number,
    humidity: number,
    pop: number,
    pressure: number,
    temp: number,
    uvi: number,
    visibility: number,
    weather: Weather[],
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export interface WeatherData {
    current: CurrentData[],
    daily: DailyData[],
    hourly: HourlyData[],
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
}

