"use client";
import React, { useEffect, useState } from "react";
import ThreeDaysWeather from "./components/ThreeDaysWeather";
import HourlyWeather from "./components/HourlyWeather";
import WeeklyWeather from "./components/WeeklyWeather";
import { WeatherData } from "./types/weatherTypes";

const WeatherLocationPage: React.FC = () => {
    const [locationName, setLocationName] = useState<string | null>(null);
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lon: number } | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // 位置情報を取得してpositionステートを更新
                const positionData = await getCurrentPosition();
                setCurrentPosition(positionData);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Failed to fetch weather data");
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // currentPositionがnullでないことを確認してからfetch
            if (currentPosition) {
                try {
                    // 位置情報を含めてサーバーサイドに送信
                    const response = await fetch(`/api/weather?lat=${currentPosition.lat}&lon=${currentPosition.lon}`);

                    if (!response.ok) {
                        throw new Error("Failed to fetch weather data");
                    }

                    const data = await response.json();

                    setWeatherData(data);
                    setError(null);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                    setError("Failed to fetch weather data");
                }
            }
        };

        // 緯度経度から地名に変換
        const fetchLocation = async () => {
            if (currentPosition) {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${currentPosition.lat}&lon=${currentPosition.lon}`);
                    const data = await response.json();

                    const { city } = data.address;

                    setLocationName(city);
                } catch (error) {
                    console.error("Error fetching location name:", error);
                }
            }
        };

        fetchData();
        fetchLocation();
    }, [currentPosition]);

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

    // locationName から特定のプロパティを取得して表示する
    const cityName = typeof locationName === "string" ? locationName : "位置情報取得中...";
    return (
        <>
            {error ? (
                <div>Error: {error}</div>
            ) : weatherData ? (
                <>
                    <h1 className="text-2xl text-center">{cityName}</h1>
                    <div className="mt-20"></div>
                    <ThreeDaysWeather data={weatherData} />
                    <div className="mt-20"></div>
                    <HourlyWeather data={weatherData} />
                    <div className="mt-20"></div>
                    <WeeklyWeather data={weatherData} />
                </>
            ) : (
                <div>天気情報取得中...</div>
            )}
        </>
    );
};

export default WeatherLocationPage;
