'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Loading from './_core/components/primitives/loading/loading';
import { useAuth } from './_core/contexts/auth-context';

export default function Home(): JSX.Element {
	const { handleRefetchUserInfo } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function refetchUserInfo(currentUser: User): Promise<void> {
			try {
				const idTokenResult = await currentUser.getIdTokenResult();
				const token = idTokenResult.token;
				if (token) {
					await handleRefetchUserInfo(token, currentUser.uid);
				}
			} catch {
				throw new Error('refetchUserInfo: Unexpected error');
			} finally {
				setIsLoading(false);
			}
		}
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
			if (userAuth) {
				void refetchUserInfo(userAuth);
				router.push('/dashboard');
			} else {
				router.push('/login');
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

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
