import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { lat, lon } = req.query;

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${apiKey}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
