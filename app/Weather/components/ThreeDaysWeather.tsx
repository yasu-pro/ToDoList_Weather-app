"use client";
import React from "react";
// import ThreeDaysWeather from "./ThreeDaysWeatherParts";
import Styles from "../styles/threeDaysWeather.module.scss";
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
}

const groupedWeatherData = (weatherByToday: DailyData[]) => {
    const groupedData: GroupedData[] = [];

    weatherByToday.forEach((data) => {
        const date = new Date(data.dt * 1000);
        const today = new Date();

        // 今日を含めて明日、明後日までのデータしか取得しない
        const futureDateLimit = new Date(today);
        futureDateLimit.setDate(today.getDate() + 2);

        // 時間部分をゼロに設定
        const currentDate = new Date(date);
        const futureDatesCopy = new Date(futureDateLimit);
        currentDate.setHours(0, 0, 0, 0);
        futureDatesCopy.setHours(0, 0, 0, 0);

        // 今日の日付を含むデータを取得する条件
        if (currentDate <= futureDatesCopy) {
            const precipitationProbability = Math.round(data.pop * 100);
            const roundedPercentage = Math.round(precipitationProbability / 10) * 10;

            // apiから必要なデータを新規作成
            groupedData.push({
                dateString: currentDate.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
                weekdayString: `(${currentDate.toLocaleDateString("ja-JP", { weekday: "short" })})`,
                dateObj: currentDate,
                weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                weatherDescription: data.weather[0].description,
                maxTemp: Math.round(data.temp.max - 273.15),
                minTemp: Math.round(data.temp.min - 273.15),
                pop: roundedPercentage,
            });
        }
    });

    return groupedData;
};

const TodaysWeather: React.FC<WeatherInfoProps> = ({ data }) => {
    const weatherByHours: DailyData[] = data.daily;

    const groupedData = groupedWeatherData(weatherByHours);

    return (
        <div className={`${Styles.todaysWeatherContainer}`}>
            <h2>3日間の天気</h2>
            <div className={`${Styles.todaysWeatherInner}`}>
                {groupedData.map((dailyWeatherData, index) => (
                    <React.Fragment key={index}>
                        <div className={`${Styles.todaysWeatherBox}`}>
                            <div className={`${Styles.date}`}>
                                <span className={`${Styles.date__text}`}>{getDayLabel(dailyWeatherData.dateObj).label}</span>
                                <span className={`${Styles.date__day}`}>
                                    {dailyWeatherData.dateString}
                                    <span className={`${getDayLabel(dailyWeatherData.dateObj).isSaturday ? Styles.date__day_blue : ""} ${getDayLabel(dailyWeatherData.dateObj).isSunday ? Styles.date__day_red : ""}`}>{dailyWeatherData.weekdayString}</span>
                                </span>
                            </div>
                            <div className={`${Styles.weatherIcon}`}>
                                <span className={`${Styles.weatherIcon__Box}`}>
                                    <img src={`${dailyWeatherData.weatherIcon}`} alt={`${dailyWeatherData.weatherDescription}`} />
                                </span>
                            </div>
                            <div className={`${Styles.popWeather}`}>
                                <span className={`${Styles.popWeather__weather}`}>{`${dailyWeatherData.weatherDescription}`}</span>
                                <span className={`${Styles.popWeather__pop}`}>
                                    {`${dailyWeatherData.pop}`}
                                    <span className={`${Styles.popWeather__pop_obj}`}>%</span>
                                </span>
                            </div>
                            <div className={`${Styles.temp}`}>
                                <span className={`${Styles.temp__max}`}>
                                    {`${dailyWeatherData.maxTemp}`}
                                    <span className={`${Styles.temp__obj}`}>℃</span>
                                </span>
                                <span className={`${Styles.temp__min}`}>
                                    {`${dailyWeatherData.minTemp}`}
                                    <span className={`${Styles.temp__obj}`}>℃</span>
                                </span>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default TodaysWeather;
