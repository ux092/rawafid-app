import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "روافد | من الجملة.. إلى بيتك - بغداد",
  description: "تطبيق روافد لتوصيل المواد الغذائية ومسواك الجملة إلى المنازل في بغداد بأسرع وقت وأفضل الأسعار",
  keywords: ["روافد", "مسواك جملة بغداد", "توصيل بقالة بغداد", "تمن عنبر", "مواد غذائية"],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#5A7032",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#54331E] font-[family-name:var(--font-cairo)] antialiased select-none">
        <div className="max-w-md mx-auto min-h-screen bg-[#FAF7F2] shadow-2xl relative overflow-x-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
