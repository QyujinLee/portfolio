import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.scss';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qyujinlee.github.io'),
  title: "Gyujin's Portfolio",
  description: '데이터로 소통하는 개발자 이규진의 포트폴리오',
  keywords: ['Gyujin', 'Portfolio', 'Frontend', 'Backend', 'Next.js'],
  authors: [{ name: 'Gyujin' }],
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: "Gyujin's Portfolio",
    description: '데이터로 소통하는 개발자 이규진의 포트폴리오',
    url: 'https://qyujinlee.github.io/portfolio/',
    siteName: "Gyujin's Portfolio",
    images: [
      {
        url: '/images/home-background.png',
        width: 1200,
        height: 630,
        alt: 'Gyujin portfolio preview',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
