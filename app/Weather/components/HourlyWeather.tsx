import React from "react";
import Styles from "../styles/hourlyWeather.module.scss";
import { HourlyData, WeatherData } from "../types/weatherTypes";

interface WeatherInfoProps {
    data: WeatherData;
}

interface GroupedData {
    dateString: string;
    dateObj: Date;
    time: string;
    weatherIcon: string;
    weatherDescription: string;
    temp: number;
    pop: number;
    humidity: number;
    windDirectionIconStyle: React.CSSProperties;
    windDirection: string;
    speed: number;
}

// 風の方向
const windDirection = (deg: number) => {
    const directions = ["北", "北北東", "北東", "東北東", "東", "東南東", "南東", "南南東", "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
};

// 風向きのアイコンcss
const windDirectionIconStyle = (deg: number) => {
    return {
        display: "inline-block",
        transform: `rotate(${Math.round((deg % 360) / 22.5) * 22.5}deg)`, // 16方向に変更
    };
};

// 日付の判定
const getDayLabel = (date: Date): string => {
    const currentDate = new Date();
    const targetDate = new Date(date);

    if (targetDate.getDate() === currentDate.getDate()) {
        return targetDate.getHours() < 24 ? "今日" : "明日";
    } else if (targetDate.getDate() === currentDate.getDate() + 1) {
        return "明日";
    } else if (targetDate.getDate() === currentDate.getDate() + 2) {
        return "明後日";
    }

    return "";
};

// 日時ごとにデータをグループ化するユーティリティ関数
const groupedWeatherData = (weatherByHours: HourlyData[]) => {
    const groupedData: GroupedData[] = [];

    weatherByHours.forEach((data) => {
        const date = new Date(data.dt * 1000);

        const dateString = date.toLocaleDateString("ja-JP", { weekday: "short", hour: "numeric" });
        const time = `${date.getHours()}時`;

        // apiから必要なデータを新規作成
        groupedData.push({
            dateString,
            dateObj: date,
            time,
            weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            weatherDescription: data.weather[0].description,
            temp: Math.round(data.temp - 273.15),
            pop: Math.round(data.pop / 10) * 100,
            humidity: Math.round(data.humidity),
            windDirectionIconStyle: windDirectionIconStyle(data.wind_deg),
            windDirection: windDirection(data.wind_deg),
            speed: Math.round(data.wind_speed),
        });
    });

    return groupedData;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data }) => {
    const weatherByHours: HourlyData[] = data.hourly;

    const groupedData = groupedWeatherData(weatherByHours);

    return (
        <div className={`${Styles.hourlyWeatherContainer}`}>
            <h2>1時間ごとの天気</h2>
            <div className={`${Styles.hourlyWeatherTable}`}>
                <table>
                    <tbody>
                        <tr id="time">
                            <th rowSpan={2}>時刻</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    {index === 0 || (index > 0 && groupedData[index - 1].dateObj.getDate() !== hourlyWeatherData.dateObj.getDate()) ? (
                                        <td rowSpan={8} className={`${Styles.dateObj}`}>
                                            {getDayLabel(hourlyWeatherData.dateObj)}
                                        </td>
                                    ) : null}
                                    <td>{hourlyWeatherData.time}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id="weatherIcon">
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>
                                        <img src={`${hourlyWeatherData.weatherIcon}`} alt={`${hourlyWeatherData.weatherDescription}`} />
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id="temp">
                            <th>気温</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.temp}℃`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id="pop">
                            <th>降水</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.pop}%`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id="humidity">
                            <th>湿度</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.humidity}℃`}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr id="wind">
                            <th rowSpan={3}>風</th>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>
                                        <span style={hourlyWeatherData.windDirectionIconStyle}>↓</span>
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {groupedData.map((hourlyWeatherData, index) => (
                                <React.Fragment key={index}>
                                    <td>{`${hourlyWeatherData.windDirection}`}</td>
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
