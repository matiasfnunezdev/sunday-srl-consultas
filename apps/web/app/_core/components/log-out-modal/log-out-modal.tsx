import { useEffect, useRef } from 'react';
import LoginButton from '../login-button/login-button';
import { useAuth } from '@/_core/contexts/auth-context';

interface LogOutModalProps {
	onClose: () => void;
}

export default function LogOutModal(props: LogOutModalProps): JSX.Element {
	const { signOutFireabase } = useAuth();
	const { onClose } = props;

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onKeyDown(event: { keyCode: number }): void {
			if (event.keyCode === 27) {
				onClose();
			}
		}

		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-linear">
			<div
				className="fixed inset-0 z-50 overflow-hidden 
      transform transition-all duration-300 ease-linear"
			>
				<div
					className="flex min-h-screen items-start justify-center text-center sm:h-screen sm:items-center sm:justify-center sm:p-0"
					style={{ height: '-webkit-fill-available' }}
				>
					<div
						className={`w-[344px] dark:border-netural-400 z-50 inline-block transform overflow-hidden bg-[#202123] p-4 px-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:w-[344px] sm:max-w-[58rem] sm:gap-6 sm:rounded-lg sm:border-2 sm:px-4 sm:py-4 sm:align-middle
              }`}
						ref={modalRef}
						role="dialog"
						style={{
							height: 'auto',
							maxHeight: 'auto',
							display: 'block',
							flexDirection: '-moz-initial',
						}}
					>
						<div>
							<div className="flex flex-col items-center justify-between rounded-t text-[18px] text-white">
								<button
									className="w-full flex justify-end items-right"
									onClick={() => {
										onClose();
									}}
									type="button"
								>
									<img
										alt="Home"
										className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] text-[#d9d9d9]"
										src="/icons/close-white.svg"
									/>
								</button>
								<div className="text-white font-late text-xl font-medium leading-[normal] py-2">
									¿Deseas cerrar sesión?
								</div>
								<div className="flex flex-row pt-6 justify-between gap-4">
									<LoginButton
										handleClick={() => {
											signOutFireabase();
										}}
										label="Si, cerrar"
										type="button"
									/>
									<LoginButton
										handleClick={() => {
											onClose();
										}}
										label="No, cancelar"
										outlined
										type="button"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
