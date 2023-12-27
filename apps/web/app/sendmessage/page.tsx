 
/* eslint-disable @typescript-eslint/no-shadow -- description */
/* eslint-disable @typescript-eslint/require-await -- description */
 
 
 
 
 
 
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
'use client';

// import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Client as ConversationsClient } from '@twilio/conversations';
import ConversationsList from '../_core/components/conversation-list';
import Conversation from '../_core/components/conversation';

interface ConversationType {
	name: string;
	loggedIn: boolean;
	token: string;
	statusString: string;
	conversationsReady: boolean;
	conversations: any[]; // Replace any[] with the type of your conversations
	selectedConversationSid: string;
	selectedConversation?: any;
	newMessage: string;
}

export default function Page() {
	// const searchParams = useSearchParams();
	// const conversationSid = searchParams.get('conversationSid');

	// const [message, setMessage] = useState<string>('');
	// const [loading, setLoading] = useState<boolean>(false);

	const [state, setState] = useState<ConversationType>({
		name: localStorage.getItem('name') || '',
		loggedIn: Boolean(localStorage.getItem('name')),
		token: '',
		statusString: '',
		conversationsReady: false,
		conversations: [],
		selectedConversation: undefined,
		selectedConversationSid: '',
		newMessage: '',
	});

	const getToken = () => {
		// Fetch your unique Chat token
		const myToken = '<Your token here>';
		setState((prev) => ({ ...prev, token: myToken }));
	};

	useEffect(() => {
		let conversationsClient;

		getToken();
		setState((prev) => ({ ...prev, statusString: 'Fetching credentials…' }));

		// Initialize and set up Twilio Conversations
		const initConversations = async () => {
			window.conversationsClient = ConversationsClient;
			conversationsClient = new ConversationsClient(state.token);
			setState((prev) => ({ ...prev, statusString: 'Connecting to Twilio…' }));

			conversationsClient.on('connectionStateChanged', (state) => {
				if (state === 'connecting')
					setState((prev) => ({
						...prev,
						statusString: 'Connecting to Twilio…',
						status: 'default',
					}));
				if (state === 'connected') {
					setState((prev) => ({
						...prev,
						statusString: 'You are connected.',
						status: 'success',
					}));
				}
				if (state === 'disconnecting')
					setState((prev) => ({
						...prev,
						statusString: 'Disconnecting from Twilio…',
						conversationsReady: false,
						status: 'default',
					}));
				if (state === 'disconnected')
					setState((prev) => ({
						...prev,
						statusString: 'Disconnected.',
						conversationsReady: false,
						status: 'warning',
					}));
				if (state === 'denied')
					setState((prev) => ({
						...prev,
						statusString: 'Failed to connect.',
						conversationsReady: false,
						status: 'error',
					}));
			});

			conversationsClient.on('conversationJoined', (conversation) => {
				setState((prev) => ({
					...prev,
					conversations: [...prev.conversations, conversation],
				}));
			});

			conversationsClient.on('conversationLeft', (thisConversation) => {
				setState((prev) => ({
					...prev,
					conversations: prev.conversations.filter(
						(it) => it !== thisConversation
					),
				}));
			});
		};

		if (state.token) {
			initConversations();
		}

		return () => {
			// Perform cleanup actions
			if (conversationsClient) {
				conversationsClient.shutdown();
			}
		};
	}, [state.token]);

	useEffect(() => {
		const selectedConversation = getSelectedConversation(state);

		setState((prev) => ({ ...prev, selectedConversation }));
	}, [state.conversations]);

	let conversationContent;
    if (state.selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={state.selectedConversation}
          myIdentity={this.state.name}
        />
      );
    } else if (status !== "success") {
      conversationContent = "Loading your conversation!";
    } else {
      conversationContent = "";
    }

	return (
		<div>
			<ConversationsList
				conversations={state.conversations}
				onConversationClick={(item) => {
					setState((prev) => ({ ...prev, selectedConversationSid: item.sid }));
				}}
				selectedConversationSid={state.selectedConversationSid}
			/>
			<h1>Messages</h1>
			{/* <ul>
				{conversationMessages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul> */}
			{/* <form onSubmit={handleSubmit}>
				<input
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					placeholder="Type a message..."
					type="text"
					value={message}
				/>
				<button disabled={loading} type="submit">
					{loading ? 'Sending...' : 'Send'}
				</button>
			</form> */}
			{conversationContent}
		</div>
	);
}

const getSelectedConversation = (state: ConversationType): any[] => {
	return state.conversations.find(
		(it) => it.sid === state.selectedConversationSid
	);
};
