 
 
/* eslint-disable react/function-component-definition -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-empty-function -- description */
/* eslint-disable @typescript-eslint/naming-convention -- description */
// conversations-context.tsx
// conversations-context.tsx
"use client";
import type { ReactNode } from 'react';
import React, { createContext, useState, useContext } from 'react';
import type { Client } from '@twilio/conversations';
import type { Conversation, SelectedConversation } from '../../_domain/interfaces/conversation';
import type { ChatMessage } from '../../_domain/interfaces/message';

interface IConversationsContext {
  conversations: Partial<Conversation>[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  selectedConversation: SelectedConversation | null;
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation | null>>;
  selectedConversationMessages: ChatMessage[],
  setSelectedConversationMessages: (messages: ChatMessage[]) => void
  twilioClient: Client | null;
  setTwilioClient: (client: Client) => void
}

// Create the context with a default value
const ConversationsContext = createContext<IConversationsContext>({
  conversations: [],
  setConversations: () => {},
  selectedConversation: null,
  setSelectedConversation: () => {},
  selectedConversationMessages: [],
  setSelectedConversationMessages: () => {},
  twilioClient: null,
  setTwilioClient: () => {}
});

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);
  const [selectedConversationMessages, setSelectedConversationMessages] = useState<any[]>([]);
  const [twilioClient, setTwilioClient] = useState<Client | null>(null);

  return (
    <ConversationsContext.Provider value={{
      conversations,
      setConversations,
      selectedConversation,
      setSelectedConversation,
      selectedConversationMessages,
      setSelectedConversationMessages,
      twilioClient,
      setTwilioClient
    }}>
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationsProvider');
  }
  return context;
};