import React, { ReactNode } from "react";
import "../_common/styles/global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>
                {/* Layout UI */}
                <main>{children}</main>
            </body>
        </html>
    );
}
