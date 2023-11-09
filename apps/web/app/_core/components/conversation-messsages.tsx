/* eslint-disable @typescript-eslint/no-explicit-any -- description */
/* eslint-disable react/function-component-definition -- description */
import type { FC } from 'react';
import React from 'react';
import MessageBubble from './message-bubble';

interface Message {
  index: number;
  author: string;
  type: string;
  sid: string;
  body: string;
  media?: any;
  getParticipant: () => Promise<any>;
  state: { timestamp: Date };
}

interface ConversationsMessagesProps {
  identity: string;
  messages: Message[];
}

const ConversationsMessages: FC<ConversationsMessagesProps> = ({ identity, messages }) => {
  return (
    <div id="messages">
      <ul>
        {messages.map(m => {
          if (m.author === identity) {
            return <MessageBubble direction="outgoing" key={m.index} message={m} />;
          } 
            return <MessageBubble direction="incoming" key={m.index} message={m} />;
        })}
      </ul>
    </div>
  );
};

export default ConversationsMessages;
