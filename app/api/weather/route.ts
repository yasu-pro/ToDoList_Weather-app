import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.WEATHER_API_KEY;

export async function GET(req: NextRequest) {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&lang=ja&APPID=${apiKey}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
