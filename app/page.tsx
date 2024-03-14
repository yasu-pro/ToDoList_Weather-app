import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ToDoリスト 天気アプリ",
    description: "ToDoリスト 天気アプリ",
};

export default function Page() {
    return (
        <div className="flex flex-col">
            <ul>
                <li>
                    <Link className="text-2xl" href="/todolist">
                        To ToDoList Page
                    </Link>
                </li>
                <li>
                    <Link className="text-2xl" href="/weather">
                        To Weather Page
                    </Link>
                </li>
            </ul>
        </div>
    );
}
