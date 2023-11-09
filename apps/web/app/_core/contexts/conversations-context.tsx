/* eslint-disable @typescript-eslint/no-unnecessary-condition -- description */
/* eslint-disable @typescript-eslint/no-explicit-any -- description */
/* eslint-disable react/function-component-definition -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-empty-function -- description */
/* eslint-disable @typescript-eslint/naming-convention -- description */
// conversations-context.tsx
// conversations-context.tsx
"use client";
import type { ReactNode } from 'react';
import React, { createContext, useState, useContext } from 'react';

export interface Conversation {
  sid: string;
  messages: any[];
  conversationInfo?: any;
}

interface IConversationsContext {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  selectedConversation: Conversation | null;
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
  selectedConversationMessages: any[],
  setSelectedConversationMessages: (messages: any[]) => void
}

// Create the context with a default value
const ConversationsContext = createContext<IConversationsContext>({
  conversations: [],
  setConversations: () => {},
  selectedConversation: null,
  setSelectedConversation: () => {},
  selectedConversationMessages: [],
  setSelectedConversationMessages: () => {}
});

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationsProvider');
  }
  return context;
};

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedConversationMessages, setSelectedConversationMessages] = useState<any[]>([]);

  return (
    <ConversationsContext.Provider value={{
      conversations,
      setConversations,
      selectedConversation,
      setSelectedConversation,
      selectedConversationMessages,
      setSelectedConversationMessages
    }}>
      {children}
    </ConversationsContext.Provider>
  );
};