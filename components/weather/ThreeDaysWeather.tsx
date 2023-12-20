import React from 'react';
// import ThreeDaysWeather from "./ThreeDaysWeatherParts";
import Styles from "../../styles/weather/threeDaysWeather.module.scss";
import { DailyData,  WeatherData } from '../../types/weather/weatherTypes';


interface WeatherInfoProps {
    data: WeatherData;
}

interface GroupedData {
    dateString: string;
    weekdayString: string;
    dateObj: Date,
    weatherIcon: string;
    weatherDescription: string;
    maxTemp: number;
    minTemp: number;
    pop: number;
}

interface DayLabel {
    label: string;
    isSaturday: boolean;
    isSunday: boolean;
}

// 日付の判定
const getDayLabel = (date: Date): DayLabel => {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const isSaturday = targetDate.getDay() === 6; // 土曜日
    const isSunday = targetDate.getDay() === 0; // 日曜日

    let label = '';
    if (targetDate.getDate() === currentDate.getDate()) {
        label = targetDate.getHours() < 24 ? '今日' : '明日';
    } else if (targetDate.getDate() === currentDate.getDate() + 1) {
        label = '明日';
    } else if (targetDate.getDate() === currentDate.getDate() + 2) {
        label = '明後日';
    }

    return { label, isSaturday, isSunday };
};

const groupedWeatherData = (weatherByToday: DailyData[]) => {
    const groupedData: GroupedData[] = [];

    weatherByToday.forEach((data) => {
        const date = new Date(data.dt * 1000);
        const today = new Date();

        // 今日を含めて明日、明後日までのデータしか取得しない
        const futureDates = new Date(today);
        futureDates.setDate(today.getDate() + 2);

        // 今日の日付を含むデータを取得する条件
        if (date <= futureDates) {
            const precipitationProbability = Math.round(data.pop * 100);
            const roundedPercentage = Math.round(precipitationProbability / 10) * 10;

            // apiから必要なデータを新規作成
            groupedData.push({
                dateString: date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
                weekdayString: `(${date.toLocaleDateString('ja-JP', { weekday: 'short' })})`,
                dateObj: date,
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
            <div className={`${Styles.todaysWeatherInner}`}>
                {groupedData.map((dailyWeatherData, index) => (
                    <React.Fragment key={index}>
                        <div className={`${Styles.todaysWeatherBox}`}>
                            <div className={`${Styles.date}`}>
                                <span className={`${Styles.date__text}`}>
                                    {getDayLabel(dailyWeatherData.dateObj).label}
                                </span>
                                <span className={`${Styles.date__day}`}>
                                    {dailyWeatherData.dateString}
                                    <span className={`${getDayLabel(dailyWeatherData.dateObj).isSaturday ? Styles.date__day_blue : ''} ${getDayLabel(dailyWeatherData.dateObj).isSunday ? Styles.date__day_red : ''}`}>
                                        {dailyWeatherData.weekdayString}
                                    </span>
                                </span>
                            </div>
                            <div className={`${Styles.weatherIcon}`}>
                                <span className={`${Styles.weatherIcon__Box}`}>
                                    <img src={`${dailyWeatherData.weatherIcon}`} alt={`${dailyWeatherData.weatherDescription}`} />
                                </span>
                            </div>
                            <div className={`${Styles.popWeather}`}>
                                <span className={`${Styles.popWeather__weather}`}>
                                    {`${dailyWeatherData.weatherDescription}`}
                                </span>
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
    )
};

export default TodaysWeather;
