'use client';
import { useRouter } from 'next/navigation';
import Button from '../../_core/components/primitives/button/button';

export default function Verifier(): JSX.Element {
 	const router = useRouter();

	const handleSubmit = (): void => {
		router.push('/login/authenticator')
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mt-[24px] 2xl:mt-[54px] text-black font-lato text-[2rem] font-bold leading-[normal]">
				Hola John
			</div>
			<div className="mb-[44px] 2xl:mb-[54px] w-full 2xl:w-[419px] text-black font-lato text-lg 2xl:text-xl font-medium leading-[normal]">
				Es necesario verificar tu correo electrónico <br /> antes de continuar.
			</div>
			<div className="text-center">
				<Button handleClick={handleSubmit} label="Verificar correo electrónico" type='button' />
			</div>
		</form>
	);
}
