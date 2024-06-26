import type { ReactNode} from 'react';
import { useEffect, useRef } from 'react';
import LoginButton from '../login-button/login-button';
import DeleteButton from '../delete-button/delete-button';

interface DeleteModalProps {
	onClose: () => void;
  confirmDelete: () => void;
  children: ReactNode
}

export default function DeleteModal(props: DeleteModalProps): JSX.Element {
	const { onClose, confirmDelete, children } = props;

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
						className={`w-[344px] dark:border-netural-400 z-50 inline-block transform overflow-hidden bg-white p-4 px-4 text-left align-bottom shadow-xl transition-all dark:bg-white sm:my-8 sm:w-[344px] sm:max-w-[58rem] sm:gap-6 sm:rounded-lg sm:border-2 sm:px-4 sm:py-4 sm:align-middle
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
							<div className="flex flex-col items-center justify-between rounded-t text-[18px] text-black">
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
										src="/icons/close.svg"
									/>
								</button>
								<div className="text-black font-late text-base font-medium leading-[normal] py-2">
									{children}
								</div>
								<div className="flex flex-row pt-6 justify-between gap-4">
                <LoginButton
										handleClick={() => {
											onClose();
										}}
										label="No, cancelar"
										outlined
										type="button"
									/>
									<DeleteButton
										handleClick={() => {
											confirmDelete();
										}}
										label="Si, eliminar"
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
