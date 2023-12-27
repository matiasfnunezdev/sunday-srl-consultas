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
import Header from '../_core/components/chat/chatComponents/Header';
import { useConversations } from '../_core/contexts/conversations-context';
import ChatMessages from '../_core/components/chat/chatComponents/chatMessages';
import { FooterComponent } from '../_core/components/chat/chatComponents/FooterComponent';
import { Sidebar } from '../_core/components/chat/chatComponents/sidebar/SideBar';
import { ModalResponder } from '../_core/components/chat/chatComponents/ResponderModal';
import type {
	Conversation,
	OpenConversations,
} from '../_domain/interfaces/conversation';
import type { SendMessageResponse } from '../_domain/interfaces/send-message-response';
import { firebaseCloudMessaging } from '../_core/firebase/firebase-messaging';
import SidebarConversations from '@/_core/components/chat/chatComponents/sidebar/SideBarConversations';
import TagsModal from '@/_core/components/chat/chatComponents/tags/tags-modal';
import Loading from '@/_core/components/primitives/loading/loading';
import { useSnackbar } from '@/_core/contexts/snackbar-context';

interface SendMessageOutput {
	sendMessageRes: SendMessageResponse;
	conversations: Conversation[];
}

async function fetchMessages(conversationSid: string): Promise<any[]> {
	const response = await fetch(
		`/api/getconversationmessages?conversationSid=${conversationSid}`
	);
	const data = await response.json();
	return data.messages;
}

async function fetchConversations(): Promise<Conversation[]> {
	const res = await fetch('api/conversations', {
		cache: 'no-store',
	});

	const data: OpenConversations = await res.json();

	return data.openConversations;
}

async function sendMessage(
	conversationSid: string,
	message: string
): Promise<SendMessageOutput> {
	try {
		const response = await fetch('api/sendmessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ conversationSid, message }),
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const sendMessageRes: SendMessageResponse = await response.json();
		const conversations = await fetchConversations();
		return { sendMessageRes, conversations };
	} catch (error) {
		throw new Error('Failed to send message');
	}
}

async function updateConversation(
	conversationSId: string,
	payload: any
): Promise<any> {
	try {
		const response = await fetch('api/update-conversation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ conversationSId, payload }),
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const sendMessageRes: SendMessageResponse = await response.json();
		const conversations = await fetchConversations();
		return { sendMessageRes, conversations };
	} catch (error) {
		throw new Error('Failed to send message');
	}
}

export default function Page(): JSX.Element {
	const addSnackbar = useSnackbar();
	const {
		conversations,
		selectedConversation,
		setSelectedConversation,
		setConversations,
		selectedConversationMessages,
		setSelectedConversationMessages,
		isLoading,
		setIsLoading,
	} = useConversations();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [timeStamp, setTimeStamp] = useState<number | undefined>();
	const [updateInfo, setUpdateInfo] = useState<any | null>(null);
	const [isTagModalOpen, setIsTagModalOpen] = useState(false);

	const handleSendMessage = async (message: string): Promise<void> => {
		const sid = selectedConversation?.sid;
		if (sid) {
			const result = await sendMessage(selectedConversation.sid, message);

			const { conversations: conversationsRes } = result;

			setConversations(conversationsRes);

			const fetchMessagesResult = await fetchMessages(sid);

			if (fetchMessagesResult) {
				setSelectedConversation({
					sid,
					messages: fetchMessagesResult,
				});
				setSelectedConversationMessages(fetchMessagesResult);
			}

			setTimeStamp(new Date().getTime());
		}
	};

	const openModal = (): void => {
		setIsModalOpen(true);
	};
	const closeModal = (): void => {
		setIsModalOpen(false);
	};

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleFetchConversationMessages = async (): Promise<void> => {
		const result = await fetchConversations();
		setConversations(result);
		setTimeStamp(new Date().getTime());
	};

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				setIsLoading(true);
				const result = await fetchConversations();

				if (result.length) {
					setConversations(result);
				}
			} catch (error) {
				console.log('error', error);
				throw new Error('Unexpected error fetching conversations');
			} finally {
				setIsLoading(false);
			}
		}

		void fetchData();
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

	// useEffect(() => {
	// 	if ('serviceWorker' in navigator) {
	// 		navigator.serviceWorker
	// 			.register('/firebase-messaging-sw.js')

	// 			.then((registration) => {
	// 				console.log('scope is: ', registration.scope);
	// 			});
	// 	}
	// }, []);

	// useEffect(() => {
	// 	// Check if service workers are supported
	// 	if ('serviceWorker' in navigator) {
	// 		// Listen for messages from service worker
	// 		navigator.serviceWorker.addEventListener('message', (event) => {
	// 			const { type } = event.data;

	// 			if (type === 'FCM_MESSAGE') {
	// 				handleFetchConversationMessages();

	// 				console.log('ON MESSAGE2');
	// 			}
	// 		});
	// 	}
	// }, []);

	useEffect(() => {
		console.log('conversations useEffect', conversations);
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView();
		}
	}, [selectedConversationMessages, conversations]);

	useEffect(() => {
		async function setSelectedConversationAsRead(
			conversationSId: string
		): Promise<void> {
			try {
				await updateConversation(conversationSId, {
					inProgress: true,
					unreadMessagesCount: 0,
					unread: false,
				});
				const conversationsResult = await fetchConversations();
				setConversations(conversationsResult);
				setTimeStamp(new Date().getTime());
			} catch {
				throw new Error('Unexpected error updating conversation');
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

				if (sid) {
					const result = await fetchMessages(sid);

					if (result) {
						setSelectedConversation({
							sid,
							messages: result,
						});
						setSelectedConversationMessages(result);
					}

					addSnackbar({
						key: 'info',
						text: 'Nuevo mensaje recibido',
						variant: 'info',
					});
				}

				const conversationsResult = await fetchConversations();
				if (conversationsResult?.length) {
					setConversations(conversationsResult);
				}
			} catch (error) {
				throw new Error('Unexpected error fetching conversations');
			}
		}

		if (updateInfo) {
			console.log('updateInfo', updateInfo);
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

	return (
		<div className="flex flex-col md:flex-row bg-[#202123] min-h-screen">
			<aside className="bg-gray-900 h-screen md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
				{/* Sidebar content here */}
				<div>
					<Sidebar />
				</div>
			</aside>
			{/* Main content area */}
			<main className="flex flex-col flex-1">
				{/* Header: always visible */}
				<header className="flex justify-between items-center p-4 bg-[#202123]">
					{/* Placeholder for left side of the header */}
					<Header timeStamp={timeStamp} />
				</header>

				{/* Main content: list of messages */}
				{isLoading ? (
					<section className="flex-1 flex justify-center items-center overflow-y-auto">
						<Loading />
					</section>
				) : (
					<section className="flex-1 overflow-y-auto">
						{selectedConversationMessages.map((message) => (
							<ChatMessages key={message.index} message={message} />
						))}
						<div ref={messagesEndRef} />
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
			</main>

			{/* Sidebar: hidden on mobile, visible on medium screens and up, on the right */}
			<aside className="bg-gray-900 md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
				{/* Sidebar content here */}
				<div>
					<SidebarConversations />
				</div>
			</aside>
		</div>
		// <div>
		//   <Chat />
		// </div>
	);
}
