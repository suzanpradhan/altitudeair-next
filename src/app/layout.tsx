import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import Footer from './(components)/(modules)/Footer';
import './globals.css';
// Import Swiper styles
import Provider from '@/core/redux/provider';
import Notification from '@/core/ui/components/notification';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from './(components)/(modules)/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Altitude Air Nepal',
  description:
    'Altitude Air offers top-rated helicopter services and scenic package tours to beautiful destinations.',
  keywords:
    'helicopter flights, helicopter tours, helicopter rescue, Altitude Air, Nepal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <Notification />
        <Provider>
          <main>
            {/* <Header /> */}
            <Navbar />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
