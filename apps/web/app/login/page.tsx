'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../_core/components/primitives/input/input';
import Button from '../_core/components/primitives/button/button';
import { useAuth } from '../_core/contexts/auth-context';
import useGetUserViewModel from '@/_presentation/user/get-user-view-model';
import { useSnackbar } from '@/_core/contexts/snackbar-context';

export default function Login(): JSX.Element {
	const addSnackbar = useSnackbar();
	const { getUser, user: userInfo, error, loading } = useGetUserViewModel();
	const { user, accessToken, signInFirebase, signOutFireabase, handleSetUserData } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		event.preventDefault();
		setEmail(event.target.value);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		event.preventDefault();
		setPassword(event.target.value);
	};

	const handleSubmit = async (): Promise<void> => {
		try {
			await signInFirebase(email, password);
		} catch {
			throw new Error('signInFirebase: Unexpected error')
		}
	};

	useEffect(() => {
		async function fetchUserInfo(token: string): Promise<void> {
			try {
				const userUid = user?.uid
				if (userUid) {
					await getUser(token, userUid);
				}
				else {
					addSnackbar({
						key: 'error',
						text: 'Error de autenticacion',
						variant: 'error',
					});
				}
				
			} catch {
				signOutFireabase();
				addSnackbar({
					key: 'error',
					text: 'Error de autenticacion',
					variant: 'error',
				});
			}
		}
		if (user && accessToken) {
			void fetchUserInfo(accessToken);
		}
	}, [user, accessToken]);

	useEffect(() => {
		if (userInfo && !loading && !error) {
			handleSetUserData(userInfo);
			router.push('/chat')
		}
	}, [userInfo]);

	return (
		<form>
			<div className="mt-[24px] 2xl:mt-[54px] text-black font-lato text-[2rem] font-bold leading-[normal]">
				Iniciar sesión
			</div>
			<div className="mb-[24px] 2xl:mb-[34px] w-[319px] 2xl:w-[419px] text-black font-lato text-lg 2xl:text-xl font-medium leading-[normal]">
				¡Te damos la bienvenida! <br /> Ingresá a tu cuenta para comenzar a
				operar
			</div>
			<div className="mb-4">
				<Input
					id="email"
					label="Correo electrónico"
					onChange={handleEmailChange}
					value={email}
				/>
			</div>
			<div className="mb-6">
				<Input
					id="password"
					label="Contraseña"
					onChange={handlePasswordChange}
					type="password"
					value={password}
				/>
			</div>
			<div className="mb-[24px] 2xl:mb-[34px] text-end">
				<label
					className="text-[#828282] font-lato text-md 2xl:text-lg leading-[normal]"
					htmlFor="password-recovery"
				>
					¿Olvidaste la contraseña?
				</label>
			</div>
			<div className="text-center">
				<Button
					handleClick={() => void handleSubmit()}
					label="Ingresar"
					type="button"
				/>
			</div>
		</form>
	);
}
