'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './_core/components/primitives/loading/loading';

export default function Home(): JSX.Element {
	const router = useRouter()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- N/A
	const [isLoading, setIsLoading] = useState(true);

	if (isLoading) {
		return (
			<div className='bg-white flex flex-row justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	}

	return (
		<div className="bg-white">
			<p className="text-black">home page</p>
		</div>
	);
}
