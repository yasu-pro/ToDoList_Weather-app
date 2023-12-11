import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherInfoProps {
    data: any;
}

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

    return (
        <div>
            <h1>{cityName}</h1>
        </div>
    );
};

export default WeatherInfo;
