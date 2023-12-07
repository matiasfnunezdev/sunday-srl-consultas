'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
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

interface SendMessageOutput {
	sendMessageRes: SendMessageResponse;
	conversations: Conversation[];
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

export default function Page(): JSX.Element {
	const {
		conversations,
		setConversations,
		selectedConversation,
		selectedConversationMessages,
	} = useConversations();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [timeStamp, setTimeStamp] = useState<number | undefined>();

	const handleSendMessage = async (message: string): Promise<void> => {
		if (selectedConversation?.sid) {
			const result = await sendMessage(selectedConversation.sid, message);

			const { conversations: conversationsRes } = result;

			setConversations(conversationsRes);

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
		setConversations(result)
		setTimeStamp(new Date().getTime());
	};

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				const result = await fetchConversations();

				if (result.length) {
					setConversations(result);
				}
			} catch (error) {
				// eslint-disable-next-line no-console -- N/A
				console.log('error', error)
				throw new Error('Unexpected error fetching conversations');
			}
		}

		void fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps -- N/A
	}, []);

	useEffect(() => {
		async function initializeMessaging(): Promise<void> {
			try {
				firebaseCloudMessaging.initFirebase();
				await firebaseCloudMessaging.init();

      const messaging = getMessaging();

        onMessage(messaging, () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises -- N/A
          handleFetchConversationMessages();
					// eslint-disable-next-line no-console -- N/A
          console.log('ON MESSAGE1')
        });
      
			} catch (error) {
				// eslint-disable-next-line no-console -- N/A
				console.log('error', error)
				throw new Error('Unexpected error fetching conversations');
			}
		}

		void initializeMessaging();
	}, []);

	useEffect(() => {
    if ('serviceWorker' in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises -- N/A
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        // eslint-disable-next-line no-console -- N/A
        .then((registration) => { console.log('scope is: ', registration.scope); });
    }
  }, []);

	useEffect(() => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type } = event.data;

        if (type === 'FCM_MESSAGE') {

					// eslint-disable-next-line @typescript-eslint/no-floating-promises -- N/A
          handleFetchConversationMessages();
          // eslint-disable-next-line no-console -- N/A
          console.log('ON MESSAGE2')
        }
      });
    }
  }, []);

	useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [selectedConversationMessages, conversations]);

	return (
		<div className="flex flex-col md:flex-row bg-[#202123] min-h-screen">
			{/* Main content area */}
			<main className="flex flex-col flex-1">
				{/* Header: always visible */}
				<header className="flex justify-between items-center p-4 bg-[#202123]">
					{/* Placeholder for left side of the header */}
					<Header timeStamp={timeStamp} />
				</header>

				{/* Main content: list of messages */}
				<section className="flex-1 overflow-y-auto">
					{selectedConversationMessages.map((message) => (
						<ChatMessages key={message.index} message={message} />
					))}
					<div ref={messagesEndRef} />
				</section>
				<FooterComponent onRespond={openModal} />
				<ModalResponder
					onClose={closeModal}
					onSend={handleSendMessage}
					show={isModalOpen}
				/>
			</main>

			{/* Sidebar: hidden on mobile, visible on medium screens and up, on the right */}
			<aside className="bg-gray-900 md:w-96 md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
				{/* Sidebar content here */}
				<div>
					<Sidebar />
				</div>
			</aside>
		</div>
		// <div>
		//   <Chat />
		// </div>
	);
}
