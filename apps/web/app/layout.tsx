"use client"
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from './_core/contexts/auth-context';

const gothicBold = localFont({
	src: [
		{
			path: '../public/fonts/copperplate_gothic_bold.ttf',
			weight: '400',
		},
	],
	variable: '--font-gothic',
});

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	viewportFit: 'cover',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<AuthProvider>
		<html className="bg-white" lang="en">
			<body className={`${inter.className} ${gothicBold.variable}`}>
				{children}
			</body>
		</html>
		</AuthProvider>
	);
}
