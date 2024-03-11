import type { Message } from './message';

export interface OpenConversations {
	openConversations: Conversation[];
}

export interface Conversation {
	id?: string;
	conversationSId?: string;
	inProgress?: boolean;
	unreadMessagesCount?: number;
	unread?: boolean;
	author?: string;
	created?: string;
	fullName?: string;
}

export interface ConversationLinks {
	participants: string;
	messages: string;
	webhooks: string;
}

export interface SelectedConversation {
	sid: string;
	messages: Message[];
}
