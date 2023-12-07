'use client';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';
import { useEffect } from 'react';
import { authenticator } from 'otplib';
import Button from '../../_core/components/primitives/button/button';
import { useAuth } from '@/_core/contexts/auth-context';
import useSetAuthSecretViewModel from '@/_presentation/user/set-auth-secret-view-model';

export default function Verifier(): JSX.Element {
	const { accessToken, secret, handleSetSecret, userInfo } = useAuth();
	const { setAuthSecret } = useSetAuthSecretViewModel();
	const router = useRouter();

	const handleSubmit = (): void => {
		router.push('/login/authenticator/verify-code');
	};

	useEffect(() => {
		async function setUserAuthSecret(): Promise<void> {
			if (accessToken) {
				const secretToSet = authenticator.generateSecret();
				handleSetSecret(secretToSet);
				await setAuthSecret(accessToken, secretToSet);
			} else {
				throw new Error('Invalid access token.');
			}
		}
		if (!userInfo?.authSecret) {
			void setUserAuthSecret();
		}
		else {
			router.push('/login/authenticator/verify-code');
		}
	}, []);

	const renderQRCode = secret ? (
		<QRCode
			size={200}
			value={`otpauth://totp/ArduaSolution:${'mattarg16@gmail.com'}?secret=${secret}&issuer=ArduaSolution`}
		/>
	) : null;

	return (
		<form onSubmit={handleSubmit}>
			<div className="mt-[24px] 2xl:mt-[54px] text-black font-lato text-[2rem] font-bold leading-[normal]">
				Validar Autenticacion
			</div>
			<div className="w-full 2xl:w-[419px] text-black font-lato text-lg 2xl:text-xl font-medium leading-[normal]">
				Escanea este codigo QR con <b>Google Authenticator</b> y presiona
				continuar.
			</div>
			<div className="flex flex-row justify-center p-4 items-center">
				{renderQRCode}
			</div>
			<div className="text-center">
				<Button handleClick={handleSubmit} label="Continuar" type="button" />
			</div>
		</form>
	);
}
