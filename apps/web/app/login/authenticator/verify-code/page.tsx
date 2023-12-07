'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authenticator } from 'otplib';
import Button from '../../../_core/components/primitives/button/button';
import QRCodeInput from '../../../_core/components/primitives/qr-input/qr-input';
import { useAuth } from '@/_core/contexts/auth-context';

export default function Verifier(): JSX.Element {
	const { secret } = useAuth();
	const router = useRouter();
	const [qrCodeValues, setQRCodeValues] = useState<string[]>([]);
	const [isValidCode, setIsValidCode] = useState(false);
	const [isReadyToValidate, setIsReadyToValidate] = useState(false);

	const handleQRCodeChange = (values: string[]): void => {
		setQRCodeValues(values);
	};

	const handleSubmit = (): void => {
		const token = qrCodeValues.join('');

		const isValid = secret ? authenticator.verify({ token, secret }) : false;
		setIsValidCode(isValid);
		setIsReadyToValidate(true);
	};

	useEffect(() => {
		if (isReadyToValidate) {
			if (isValidCode) {
				router.push('/dashboard');
			} else {
				router.push('/login/authenticator');
			}
		}
	}, [isReadyToValidate, isValidCode]);

	return (
		<form onSubmit={handleSubmit}>
			<div className="mt-[24px] 2xl:mt-[54px] text-black font-lato text-[2rem] font-bold leading-[normal]">
				Verificar codigo
			</div>
			<div className="mb-[24px] 2xl:mb-[34px] w-full 2xl:w-[419px] text-black font-lato text-lg 2xl:text-xl font-medium leading-[normal]">
				Ingresa el codigo generado en el authenticador.
			</div>
			<div>
				<QRCodeInput onValueChange={handleQRCodeChange} />
			</div>
			<div className="text-center">
				<Button handleClick={handleSubmit} label="Continuar" type="button" />
			</div>
		</form>
	);
}
