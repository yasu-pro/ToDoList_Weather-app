import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import WeatherInfo from '../../components/WeatherInfo';

const WeatherLocationPage: React.FC = () => {
    const [weatherData, setWeatherData] = useState(null);

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
        <div>
            <WeatherInfo data={weatherData} />
        </div>
    );
};

export default WeatherLocationPage;
