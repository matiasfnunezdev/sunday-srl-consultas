import type { Message } from "./message";

export interface OpenConversations {
  openConversations: Conversation[];
}

export interface Conversation {
  accountSid: string;
  chatServiceSid: string;
  messagingServiceSid: string;
  sid: string;
  friendlyName: string | null;
  uniqueName: string | null;
  attributes: string;
  state: string;
  dateCreated: string;
  dateUpdated: string;
  timers: Record<string, unknown>;
  url: string;
  links: ConversationLinks;
  bindings: null; // If bindings can be other types, replace `null` with the correct type(s)
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
