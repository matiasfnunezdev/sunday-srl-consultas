/* eslint-disable @typescript-eslint/no-confusing-void-expression -- N/A */
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useConversations } from '@/_core/contexts/conversations-context';
import { useAuth } from '@/_core/contexts/auth-context';
import useUpdateClientViewModel from '@/_presentation/client/update-client-view-model';

interface TagsModalProps {
	onClose: () => void;
}
export default function EditClientModal(props: TagsModalProps): JSX.Element {
	const { onClose } = props;
	const { getAccessToken } = useAuth();
	const {
		clientData,
		setClientData,
		selectedConversationMessages,
		setSelectedConversationMessages,
		conversations,
		setConversations,
	} = useConversations();
	const { updateClient } = useUpdateClientViewModel();
	const [fullName, setFullName] = useState(
		clientData?.fullName ?? clientData?.author?.split(':')?.[1]
	);
	const [isUpdated, setIsUpdated] = useState(false);

	async function handleUpdateClient(): Promise<void> {
		try {
			const accessToken = await getAccessToken();
			if (accessToken) {
				await updateClient(
					accessToken,
					{
						fullName,
					},
					clientData.clientId
				);
				setClientData({ ...clientData, fullName });
				setSelectedConversationMessages(
					selectedConversationMessages?.map((message) => {
						return { ...message, fullName };
					})
				);
				setConversations(
					conversations?.map((conversation) => {
						if (conversation.author === clientData.author) {
							return { ...conversation, fullName };
						}
						return conversation;
					})
				);
				onClose();
			}
		} catch {
			throw new Error('fetchTags error: Unexpected error getting users');
		}
	}

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

	useEffect(() => {
		if (fullName !== clientData?.name) {
			setIsUpdated(true);
		} else if (fullName?.length === 0) {
			setIsUpdated(false);
		} else {
			setIsUpdated(false);
		}
	}, [fullName]);

	const handleClose = (): void => {
		onClose();
	};

	return (
		<div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-linear">
			<div
				className="fixed inset-0 z-50 overflow-hidden 
      transform transition-all duration-300 ease-linear"
			>
				<div
					className="flex min-h-screen items-start justify-center text-center sm:h-screen sm:items-center sm:justify-center sm:p-0"
					style={{ height: '-webkit-fill-available' as 'fill-available' }}
				>
					<div
						className="w-full dark:border-netural-400 z-50 inline-block  transform overflow-hidden bg-white p-6 px-4 text-left align-bottom shadow-xl transition-all dark:bg-[#18191B] dark:border-[#ACAEB9] sm:my-8 sm:w-[640px] sm:max-w-[58rem] sm:gap-6 sm:rounded-lg sm:border-2 sm:border-gray-300 sm:px-6 sm:py-6 sm:align-middle"
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
							<div className="flex items-center justify-between rounded-t text-[18px]">
								<div>
									<span className="text-white">
										Editar cliente -{' '}
										{clientData?.fullName ??
											clientData?.author?.split(':')?.[1]}
									</span>
								</div>
								<button
									className="text-2 float-right ml-auto border-0 bg-transparent p-1 font-semibold leading-none text-white outline-none focus:outline-none"
									onClick={handleClose}
									type="button"
								>
									<FontAwesomeIcon icon={faX} />
								</button>
							</div>
						</div>
						<hr className="my-6 border-gray-300 border-opacity-50" />
						<div className="relative w-full flex-auto">
							<span className="block pb-3 text-sm font-medium text-white">
								Nombre
							</span>
							<div className="relative flex-auto">
								<textarea
									className="w-full p-2 border border-[#404040] rounded bg-[#202123] text-white"
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Escriba un nombre..."
									rows={3}
									value={fullName}
								/>
							</div>
						</div>
						<div
							className={`mt-6 flex items-center justify-end rounded-b 'flex-row gap-3'
                `}
						>
							<button
								className={`text-[#18191B]  mb-1 rounded-lg px-14 py-3 text-sm font-bold shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none ${
									!isUpdated ? 'bg-zinc-400' : 'bg-white'
								}`}
								disabled={!isUpdated}
								onClick={() => void handleUpdateClient()}
								type="button"
							>
								<span className="text-sm font-medium leading-none text-zinc-700">
									Guardar
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
