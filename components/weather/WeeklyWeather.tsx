import React from 'react';
import Styles from "../../styles/weather/weeklyWeather.module.scss";
import { DailyData,  WeatherData } from '../../types/weather/weatherTypes';

interface WeatherInfoProps {
    data: WeatherData;
}

interface GroupedData {
    dateString: string;
    dateObj: Date,
    weatherIcon: string;
    weatherDescription: string;
    maxTemp: number;
    minTemp: number;
    pop: number;
    humidity: number;
}

const groupedWeatherData = (weatherByWeekly: DailyData[]) => {
    const groupedData: GroupedData[] = [];

    const today = new Date();

    weatherByWeekly.forEach((data) => {
        const date = new Date(data.dt * 1000);
        const dateString = date.toLocaleDateString('ja-JP', { weekday: 'short', day: 'numeric' });

        // 今日の日付に対応するデータは表示しない
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            return;
        }

        const precipitationProbability = Math.round(data.pop * 100);
        const roundedPercentage = Math.round(precipitationProbability / 10) * 10;

        // apiから必要なデータを新規作成
        groupedData.push({
            dateString,
            dateObj: date,
            weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            weatherDescription: data.weather[0].description,
            maxTemp: Math.round(data.temp.max - 273.15),
            minTemp: Math.round(data.temp.min - 273.15),
            pop: roundedPercentage,
            humidity: Math.round(data.humidity)
        });
    });

    return groupedData;
};

const WeeklyWeather: React.FC<WeatherInfoProps> = ({ data }) => {
    const weeklyWeatherData: DailyData[] = data.daily
    const groupedData = groupedWeatherData(weeklyWeatherData);

    return (
        <div className={`${Styles.weekelyWeatherContainer}`}>
            <h1>週間天気</h1>
            <table>
                <tbody>
                        {groupedData.map((dailyWeatherData, index) => (
                            <tr>
                                <React.Fragment key={index}>
                                    <th>{dailyWeatherData.dateString}</th>
                                    <td>
                                        <div className={`${Styles.weatherIcon}`}>
                                            <span className={`${Styles.weatherIcon}`}>
                                                <img src={dailyWeatherData.weatherIcon} alt={dailyWeatherData.weatherDescription} />
                                            </span>
                                        </div>
                                    </td>
                                    <td>{`${dailyWeatherData.maxTemp}℃`}</td>
                                    <td>{`${dailyWeatherData.minTemp}℃`}</td>
                                    <td>{`${dailyWeatherData.pop}%`}</td>
                                </React.Fragment>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
};

export default WeeklyWeather;
