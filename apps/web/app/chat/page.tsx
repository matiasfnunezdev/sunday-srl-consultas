/* eslint-disable @typescript-eslint/no-confusing-void-expression -- N/A */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import type { Unsubscribe } from 'firebase/database';
import {
	getDatabase,
	ref,
	onValue,
	limitToLast,
	query,
} from 'firebase/database';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useConversations } from '../_core/contexts/conversations-context';
import ChatMessages from '../_core/components/chat/chatComponents/chatMessages';
import { FooterComponent } from '../_core/components/chat/chatComponents/FooterComponent';
import { Sidebar } from '../_core/components/chat/chatComponents/sidebar/SideBar';
import { ModalResponder } from '../_core/components/chat/chatComponents/ResponderModal';
import { firebaseCloudMessaging } from '../_core/firebase/firebase-messaging';
import SidebarConversations from '@/_core/components/chat/chatComponents/sidebar/SideBarConversations';
import TagsModal from '@/_core/components/chat/chatComponents/tags/tags-modal';
import Loading from '@/_core/components/primitives/loading/loading';
import { useSnackbar } from '@/_core/contexts/snackbar-context';
import { useAuth } from '@/_core/contexts/auth-context';
import LogOutModal from '@/_core/components/log-out-modal/log-out-modal';
import { getInitials } from '@/_core/utils/get-initials';
import InitialsAvatar from '@/_core/components/initials-avatar/initials-avatar';
import { SubMenuToggleButton } from '@/_core/components/sub-menu-toggle-button/sub-menu-toggle-button';
import {
	fetchConversations,
	sendMessage,
	updateConversation,
} from '@/_core/utils/api-helper';
import useGetMessagesViewModel from '@/_presentation/message/get-messages-view-model';
import type { Message } from '@/_domain/interfaces/message';

export default function Page(): JSX.Element {
	const router = useRouter();
	const {
		handleRefetchUserInfo,
		getAccessToken,
		userInfo,
		isAuthReady,
	} = useAuth();
	const addSnackbar = useSnackbar();
	const {
		conversations,
		selectedConversation,
		setConversations,
		selectedConversationMessages,
		setSelectedConversationMessages,
		isLoading,
		setIsLoading,
	} = useConversations();

	const { getMessages, messages } = useGetMessagesViewModel();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateInfo, setUpdateInfo] = useState<any | null>(null);
	const [isTagModalOpen, setIsTagModalOpen] = useState(false);
	const [showUserContextMenu, setShowUserContextMenu] = useState(false);
	const [showLogOutModal, setShowLogOutModal] = useState(false);

	const menuRef = useRef<any>(null);

	const openMenu = (event: React.MouseEvent): void => {
		event.stopPropagation();
		setShowUserContextMenu(true);
	};

	const closeMenu = (): void => {
		setShowUserContextMenu(false);
	};

	const handleSendMessage = async (message: string): Promise<void> => {
		const sid = selectedConversation?.sid;
		if (sid) {
			const accessToken = await getAccessToken();
			if (accessToken) {
				const result = await sendMessage(
					selectedConversation.sid,
					message,
					accessToken
				);

				const { conversations: conversationsRes } = result;

				setConversations(conversationsRes);

				await getMessages(accessToken, sid);
			}
		}
	};

	const openModal = (): void => {
		setIsModalOpen(true);
	};
	const closeModal = (): void => {
		setIsModalOpen(false);
	};

	const scrollableSectionRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = (): void => {
		setTimeout(() => {
			if (scrollableSectionRef.current) {
				scrollableSectionRef.current.scrollTop =
					scrollableSectionRef.current.scrollHeight;
			} else {
				console.log('Ref not found');
			}
		}, 100);
	};

	const handleFetchConversationMessages = async (): Promise<void> => {
		const accessToken = await getAccessToken();
		if (accessToken) {
			const result = await fetchConversations(accessToken);
			setConversations(result);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			event.stopPropagation();
			if (
				showUserContextMenu &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				closeMenu();
			}
		};

		if (showUserContextMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showUserContextMenu]);

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				setIsLoading(true);
				const accessToken = await getAccessToken();
				if (accessToken) {
					const result = await fetchConversations(accessToken);

					if (result.length) {
						setConversations(result);
					}
				}
			} catch (error) {
				throw new Error('Unexpected error fetching conversations');
			} finally {
				setIsLoading(false);
			}
		}

		if (isAuthReady) {
			void fetchData();
		} else {
			router.push('/');
		}
	}, []);

	useEffect(() => {
		let unsubscribeFromUpdates: Unsubscribe;
		try {
			firebaseCloudMessaging.init();

			const messaging = getMessaging();
			const database = getDatabase();
			if (messaging) {
				onMessage(messaging, () => {
					handleFetchConversationMessages();
				});
			} else {
				console.error('Firebase Messaging is not supported or initialized.');
			}

			const updatesRef = ref(database, 'updates');
			const latestUpdateQuery = query(updatesRef, limitToLast(1));

			unsubscribeFromUpdates = onValue(latestUpdateQuery, (snapshot) => {
				const updates = snapshot.val();
				if (updates) {
					const keys = Object.keys(updates);
					const latestUpdateKey = keys[keys.length - 1];
					const latestUpdate = updates[latestUpdateKey];
					setUpdateInfo(latestUpdate);
				}
			});
		} catch (error) {
			console.error('An error occurred while initializing FCM:', error);
		}

		return () => {
			if (unsubscribeFromUpdates) {
				unsubscribeFromUpdates();
			}
		};
	}, []);

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
			} else {
				router.push('/login');
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (messages?.length) {
			const mappedMessages = messages.map((message: Message) => {
				return {
					index: message.index,
					role: message.author.includes('whatsapp') ? 'user' : 'assistant',
					content: message.body,
					author: message.author,
					dateCreated: message.dateCreated,
					media: message.media,
				};
			});

			setSelectedConversationMessages(mappedMessages);
		}
	}, [messages]);

	useEffect(() => {
		scrollToBottom();
	}, [selectedConversationMessages, conversations]);

	useEffect(() => {
		async function setSelectedConversationAsRead(
			conversationSId: string
		): Promise<void> {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					setIsLoading(true);
					await updateConversation(
						conversationSId,
						{
							inProgress: true,
							unreadMessagesCount: 0,
							unread: false,
						},
						accessToken
					);
					await getMessages(accessToken, conversationSId);
					const conversationsResult = await fetchConversations(accessToken);
					setConversations(conversationsResult);
				}
			} catch {
				throw new Error('Unexpected error updating conversation');
			} finally {
				setIsLoading(false);
			}
		}
		if (selectedConversation?.sid) {
			void setSelectedConversationAsRead(selectedConversation.sid);
		}
	}, [selectedConversation]);

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				const sid = selectedConversation?.sid;

				const accessToken = await getAccessToken();

				if (accessToken) {
					if (sid) {
						await getMessages(accessToken, sid);
					}

					addSnackbar({
						key: 'info',
						text: 'Nuevo mensaje recibido',
						variant: 'info',
					});

					const conversationsResult = await fetchConversations(accessToken);
					console.log('conversationsResult', conversationsResult)
					if (conversationsResult?.length) {
						setConversations(conversationsResult);
					}
				}
			} catch (error) {
				throw new Error('Unexpected error fetching conversations');
			}
		}

		if (updateInfo) {
			if (updateInfo?.type === 'inbound-message' && updateInfo?.timestamp) {
				const currentTimeStamp = localStorage.getItem('timestamp');
				if (currentTimeStamp) {
					const parsedTimeStamp = parseInt(currentTimeStamp);
					if (parsedTimeStamp < updateInfo?.timestamp) {
						localStorage.setItem('timestamp', updateInfo?.timestamp);
						void fetchData();
					}
				} else {
					localStorage.setItem('timestamp', updateInfo?.timestamp);
					void fetchData();
				}
			}
		}
	}, [updateInfo]);

	const renderFullName = `${userInfo?.displayName}`;

	const fullNameInitials = userInfo?.displayName
		? getInitials(
				userInfo.displayName?.split(' ')[0],
				userInfo.displayName?.split(' ')[1]
		  )
		: undefined;

	const renderLogOutModal = showLogOutModal ? (
		<LogOutModal
			onClose={() => {
				setShowLogOutModal(false);
			}}
		/>
	) : null;

	return (
		<div className="w-full flex flex-col justify-center items-center bg-[#202123]">
			{userInfo ? (
				<div className="w-full">
					<div className="flex justify-between items-center px-2 2xl:px-6 py-2 2xl:py-4">
						<p className="text-lg font-bold text-white ml-2">SundaySocial</p>
						<div className="flex flex-row">
							{fullNameInitials ? (
								<InitialsAvatar initials={fullNameInitials} />
							) : null}
							<div
								className="flex items-center justify-start py-2 px-0.5 rounded"
								onClick={openMenu}
								onKeyDown={undefined}
								role="button"
								tabIndex={0}
							>
								<div className="pl-4 text-sm 2xl:text-base text-white font-lato font-medium leading-[normal]">
									{renderFullName}
								</div>
								<div>
									<SubMenuToggleButton
										color="white"
										toggled={showUserContextMenu}
									/>
								</div>
							</div>
						</div>
						{showUserContextMenu ? (
							<div
								className="absolute z-20 w-[150px] divide-y divide-gray-100 border border-neutral-500 rounded-lg bg-[#202123] text-right shadow dark:divide-gray-600 dark:bg-[#202123]"
								ref={menuRef}
								style={{
									top: 60,
									right: 30,
								}}
							>
								<ul className="py-2 text-base font-lato text-white dark:text-white">
									<li>
										<button
											className="flex justify-start items-center block w-full cursor-pointer px-4 py-2 text-left font-lato"
											onClick={() => {
												setShowUserContextMenu(false);
												router.push('dashboard');
											}}
											type="button"
										>
											Backoffice
										</button>
									</li>
									<hr className="border-neutral-500 dark:border-neutral-500" />
									<li className="flex justify-center items-center mt-1">
										<button
											className="flex justify-start items-center text-[#df4848] font-lato leading-[normal] block w-full cursor-pointer px-4 py-2 text-left"
											onClick={() => {
												setShowLogOutModal(true);
												setShowUserContextMenu(false);
											}}
											type="button"
										>
											Cerrar sesion
										</button>
									</li>
								</ul>
							</div>
						) : null}
					</div>
				</div>
			) : null}
			<div className="w-full flex flex-col md:flex-row bg-[#202123] min-h-screen">
				<aside className="bg-gray-900 h-screen md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
					{/* Sidebar content here */}
					<div>
						<Sidebar />
					</div>
				</aside>
				{/* Main content area */}
				<main className="flex flex-col flex-1 pt-4 min-h-[600px] max-h-[600px] 2xl:min-h-[700px] 2xl:max-h-[700px]">
					{/* Main content: list of messages */}
					{isLoading ? (
						<section className="flex-1 flex justify-center items-center overflow-y-auto">
							<Loading />
						</section>
					) : (
						<section
							className="flex-1 overflow-y-auto rounded-lg border border-neutral-600"
							ref={scrollableSectionRef}
						>
							{selectedConversationMessages.map((message) => (
								<ChatMessages key={message.index} message={message} />
							))}
						</section>
					)}
					{selectedConversationMessages.length > 0 && (
						<FooterComponent
							onEtiquetar={() => setIsTagModalOpen((prev) => !prev)}
							onRespond={openModal}
						/>
					)}

					<ModalResponder
						onClose={closeModal}
						onSend={handleSendMessage}
						show={isModalOpen}
					/>
					{isTagModalOpen ? (
						<TagsModal onClose={() => setIsTagModalOpen((prev) => !prev)} />
					) : null}
					{renderLogOutModal}
				</main>

				{/* Sidebar: hidden on mobile, visible on medium screens and up, on the right */}
				<aside className="bg-gray-900 md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
					{/* Sidebar content here */}
					<div>
						<SidebarConversations />
					</div>
				</aside>
			</div>
		</div>
		// <div>
		//   <Chat />
		// </div>
	);
}
