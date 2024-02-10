export interface MessagesContainer {
	messages: Message[];
}

export interface MediaItem {
	category: 'media';
	size: number;
	filename: string | null;
	content_type: string;
	Sid: string;
}

export interface Message {
	accountSid: string;
	conversationSid: string;
	sid: string;
	index: number;
	author: string;
	body: string;
	media?: string;
	attributes: string;
	participantSid: string | null;
	dateCreated: string;
	dateUpdated: string;
	url: string;
	delivery: Delivery | null;
	links: MessageLinks;
	contentSid: null;
}

export interface Delivery {
	delivered: string;
	read: string;
	undelivered: string;
	failed: string;
	total: number;
	sent: string;
}

export interface MessageLinks {
	delivery_receipts: string;
	channel_metadata: string;
}

export interface ChatMessage {
	index: number;
	role: string;
	content: string;
	author: string;
	dateCreated: string;
	media?: string;
}
