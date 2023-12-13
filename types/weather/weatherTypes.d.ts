export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface MainData {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}

export interface ListData {
    dt_txt: string;
    main: MainData;
    pop: number,
    weather: Weather[],
    wind: {
        deg: number,
        gust: number,
        speed: number,
    }
}

export interface WeatherData {
    city: {
        coord: {
            lat: number,
            lon: number,
        }
        country: string,
        id: number,
        name: string,
        population: number,
        sunrise: number,
        sunset: number,
        timezone: number,
    },
    cnt: 40,
    cod: string,
    list: ListData[];
}

