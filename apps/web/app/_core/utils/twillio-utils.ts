/* eslint-disable no-console -- description */
import twilio, { Twilio } from 'twilio';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export const fetchOpenConversations = async () => {
	const client = new Twilio(
		process.env.TWILIO_ACCOUNT_SID,
		process.env.TWILIO_AUTH_TOKEN
	);
	const conversations = await client.conversations.v1.conversations.list({
		limit: 20,
	});
	return conversations;
};

/**
 * Send a message to a specific Twilio Conversation.
 * @param conversationSid - The SID of the Conversation
 * @param message - The message text
 */
export async function sendMessageToConversation(
	conversationSid: string,
	message: string
): Promise<void> {
	try {
		// Initialize Twilio Client
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = twilio(accountSid, authToken);

		await client.conversations.v1
			.conversations(conversationSid)
			.messages.create({ body: message, author: 'Customer Support' })
			// eslint-disable-next-line @typescript-eslint/no-shadow -- description
			.then((message) => {
				console.log(message.sid);
			});
	} catch (error) {
		console.error('Error sending message:', error);
		throw new Error('Failed to send message');
	}
}

/**
 * Fetch messages for a specific Twilio Conversation.
 * @param conversationSid - The SID of the Conversation
 * @returns Array of messages
 */
export async function getConversationMessages(
	conversationSid: string
): Promise<any[]> {
	try {
		// Initialize Twilio Client
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = twilio(accountSid, authToken);

		await client.conversations.v1
			.conversations(conversationSid)
			.messages.list();

		// Fetch messages
		const messages = await client.conversations.v1
			.conversations(conversationSid)
			.messages.list();

		// Extract and return message bodies
		return messages.map((message) => message);
	} catch (error) {
		console.error('Error fetching messages:', error);
		throw new Error('Failed to fetch messages');
	}
}

export async function fetchMedia(mediaSid: string): Promise<any> {
	const res = await fetch(`/api/get-media?mediaSid=${mediaSid}`, {
		cache: 'no-store',
	});

	// You might want to check if the response is ok before proceeding
	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	const data: any = await res.json();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- N/A
	return data;
}
