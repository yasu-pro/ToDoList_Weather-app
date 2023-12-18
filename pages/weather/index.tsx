import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../components/layout";
import ThreeDaysWeather from '../../components/weather/ThreeDaysWeather';
import HourlyWeather from '../../components/weather/HourlyWeather';
import WeeklyWeather from '../../components/weather/WeeklyWeather';
import { WeatherData } from "../../types/weather/weatherTypes";

const WeatherLocationPage: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // 位置情報を取得
                const position = await getCurrentPosition();

                // 位置情報を含めてサーバーサイドに送信
                const response = await axios.get(`/api/weather?lat=${position.lat}&lon=${position.lon}`);

                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (location) {
            fetchWeatherData();
        }
    }, []);

    const getCurrentPosition = (): Promise<{ lat: number; lon: number }> => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    };

    return (
        <Layout>
            {weatherData ? (
                <>
                    <ThreeDaysWeather data={weatherData} />
                    <div className='mt-20'></div>
                    <HourlyWeather data={weatherData} />
                    <div className='mt-20'></div>
                    <WeeklyWeather data={weatherData} />
                </>
                ) : (
                    <div>Loading...</div>
                )}
        </Layout>
    );
};

export default WeatherLocationPage;
