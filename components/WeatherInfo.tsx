import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from "../styles/weatherInfo.module.scss";

interface WeatherInfoProps {
    data: any;
}

// 風の方向
const windDirection = (deg: number) => {
    const directions = ["北", "北北東", "北東", "東北東", "東", "東南東", "南東", "南南東", "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
};

// 風向きのアイコンcss
const windDirectionIconStyle = (deg:number) => {
    return {
        display: 'inline-block',
        transform: `rotate(${Math.round((deg % 360) / 22.5) * 22.5}deg)`, // 16方向に変更
    }
}

// 日時ごとにデータをグループ化するユーティリティ関数
const groupDataByDate = (weatherData) => {
    const groupedData = [];
    
    weatherData.forEach((data) => {
        const date = new Date(data.dt_txt);
        const dateString = date.toLocaleDateString('ja-JP', { weekday: 'short', hour: 'numeric' });
    
        const existingDateIndex = groupedData.findIndex((group) => group.dateString === dateString);
    
        if (existingDateIndex === -1) {
        // 新しい日時
        groupedData.push({
            dateString,
            time: date.toLocaleTimeString('ja-JP', { hour: 'numeric' }),
            weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            weatherDescription: data.weather[0].description,
            temp: Math.round(data.main.temp - 273.15),
            pop: Math.round(data.pop / 10) * 100,
            humidity: Math.round(data.main.humidity),
            windDirectionIconStyle: windDirectionIconStyle(data.wind.deg),
            windDirection: windDirection(data.wind.deg),
            speed: Math.round(data.wind.speed)
        });
        }
    });
    
    return groupedData;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data }) => {
    const [locationName, setLocationName] = useState<string | null>(null);

    useEffect(() => {
        // 緯度経度から地名に変換
        const fetchLocation = async () => {
            try {
                const lat = data.city.coord.lat;
                const lon = data.city.coord.lon;

                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
                const { city } = response.data.address;

                setLocationName(city);
            } catch (error) {
                console.error('Error fetching location name:', error);
            }
        };

        if (data && data.city) {
            fetchLocation();
        }
    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }

    // locationName から特定のプロパティを取得して表示する
    const cityName = typeof locationName === 'string' ? locationName : 'Loading...';

    const weatherBy3Hours = data.list;

    const groupedData = groupDataByDate(weatherBy3Hours);

    return (
        <div className={`${Styles.weathercontainer}`}>
            <h1>3時間ごとの {cityName} の天気</h1>

            <div className={`${Styles.weatherTable}`}>
                <table>
                    <tbody>
                        <tr id='time'>
                            <th rowSpan="2">時刻</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{hourlyWeatherData.time}</td>
                                    {/* 1日に8つのセル（24時間 / 3時間） */}
                                    {index === groupedData.length - 34 && <td rowSpan={8}>明日</td>}
                                    {index === groupedData.length - 26 && <td rowSpan={8}>明後日</td>}
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id='weatherIcon'>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>
                                        <img
                                            src={`${hourlyWeatherData.weatherIcon}`}
                                            alt={`${hourlyWeatherData.weatherDescription}`}
                                        />
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id='temp'>
                            <th>気温</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.temp}℃`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id='pop'>
                            <th>降水</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.pop}%`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id='humidity'>
                            <th>湿度</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.humidity}℃`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id='wind'>
                            <th rowSpan="3">風</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td><span style={hourlyWeatherData.windDirectionIconStyle}>↓</span></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.windDirection}℃`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.speed}m`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeatherInfo;
