import type { Conversation } from '@/_domain/interfaces/conversation';
import type { SendMessageResponse } from '@/_domain/interfaces/send-message-response';

interface SendMessageOutput {
	sendMessageRes: SendMessageResponse;
	conversations: Conversation[];
}

export async function fetchMessages(
	conversationSid: string,
	accessToken: string
): Promise<any[]> {
	const response = await fetch(
		`api/getconversationmessages?conversationSid=${conversationSid}`,
		{
			headers: {
				'x-access-token': accessToken,
			},
			cache: 'no-store',
		}
	);
	const data = await response.json();
	return data.data;
}

export async function fetchConversations(
	accessToken: string
): Promise<Conversation[]> {
	const res = await fetch('api/conversations', {
		headers: {
			'x-access-token': accessToken,
		},
		cache: 'no-store',
	});

	const data: any = await res.json();

	return data.data;
}

export async function sendMessage(
	conversationSid: string,
	message: string,
	accessToken: string
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
		const conversations = await fetchConversations(accessToken);
		return { sendMessageRes, conversations };
	} catch (error) {
		throw new Error('Failed to send message');
	}
}

export async function updateConversation(
	conversationSId: string,
	payload: any,
	accessToken: string
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
		const conversations = await fetchConversations(accessToken);
		return { sendMessageRes, conversations };
	} catch (error) {
		throw new Error('Failed to send message');
	}
}
