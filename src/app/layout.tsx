import '@ant-design/v5-patch-for-react-19';
import { Header } from "@/components/header";
import { ModalBlog } from "@/components/modal";
import QueryProvider from "@/components/query-provider";
import { Layout } from "antd";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Layout>
            <Header />
            <div className="px-[50px] py-10 bg-white">
              {children}
            </div>
          </Layout>
          <ModalBlog />
        </QueryProvider>
      </body>
    </html>
  );
}
