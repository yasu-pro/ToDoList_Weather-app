import React from "react";
import Styles from "../styles/weeklyWeather.module.scss";
import { DailyData, WeatherData } from "../types/weatherTypes";
import getDayLabel from "./DayLabel";

interface WeatherInfoProps {
    data: WeatherData;
}

interface GroupedData {
    dateString: string;
    weekdayString: string;
    dateObj: Date;
    weatherIcon: string;
    weatherDescription: string;
    maxTemp: number;
    minTemp: number;
    pop: number;
    humidity: number;
}

const groupedWeatherData = (weatherByWeekly: DailyData[]) => {
    const groupedData: GroupedData[] = [];

    weatherByWeekly.forEach((data) => {
        const today = new Date();
        const date = new Date(data.dt * 1000);
        const currentDate = new Date(date);

        // 今日の日付に対応するデータは表示しない
        if (currentDate.getDate() !== today.getDate()) {
            const precipitationProbability = Math.round(data.pop * 100);
            const roundedPercentage = Math.round(precipitationProbability / 10) * 10;

            // apiから必要なデータを新規作成
            groupedData.push({
                dateString: currentDate.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
                weekdayString: `(${currentDate.toLocaleDateString("ja-JP", { weekday: "short" })})`,
                dateObj: date,
                weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                weatherDescription: data.weather[0].description,
                maxTemp: Math.round(data.temp.max - 273.15),
                minTemp: Math.round(data.temp.min - 273.15),
                pop: roundedPercentage,
                humidity: Math.round(data.humidity),
            });
        }
    });

    return groupedData;
};

const WeeklyWeather: React.FC<WeatherInfoProps> = ({ data }) => {
    const weeklyWeatherData: DailyData[] = data.daily;
    const groupedData = groupedWeatherData(weeklyWeatherData);

    return (
        <div className={`${Styles.weekelyWeatherContainer}`}>
            <h2>週間天気</h2>
            <table>
                <tbody>
                    {groupedData.map((dailyWeatherData, index) => (
                        <tr key={index}>
                            <React.Fragment>
                                <th>
                                    <span>
                                        {dailyWeatherData.dateString}
                                        <span className={`${getDayLabel(dailyWeatherData.dateObj).isSaturday ? Styles.date__day_blue : ""} ${getDayLabel(dailyWeatherData.dateObj).isSunday ? Styles.date__day_red : ""}`}>{dailyWeatherData.weekdayString}</span>
                                    </span>
                                </th>
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
    );
};

export default WeeklyWeather;
