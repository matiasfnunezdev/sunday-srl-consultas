 
/* eslint-disable react/function-component-definition -- description */
 
 
 
 
 
 
 
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
 
import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import ConversationsMessages from './conversation-messsages';

interface ConversationProps {
  myIdentity: string;
  conversationProxy: any; // Replace with the actual type if available
}

const Conversation: React.FC<ConversationProps> = ({ myIdentity, conversationProxy }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<string>('initializing');
  const [boundConversations, setBoundConversations] = useState<Set<any>>(new Set());

  const loadMessagesFor = async (thisConversation: any) => {
    try {
      const messagePaginator = await thisConversation.getMessages();
      setMessages(messagePaginator.items);
      setLoadingState('ready');
    } catch (err) {
      console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
      setLoadingState('failed');
    }
  };

  useEffect(() => {
    if (conversationProxy) {
      loadMessagesFor(conversationProxy);

      if (!boundConversations.has(conversationProxy)) {
        const newConversation = conversationProxy;
        newConversation.on('messageAdded', (m: any) => {
          setMessages((prevMessages) => [...prevMessages, m]);
        });
        setBoundConversations(new Set(Array.from(boundConversations).concat([newConversation])));
      }
    }
  }, [conversationProxy]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    conversationProxy.sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="relative">
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-scroll">
          <ConversationsMessages identity={myIdentity} messages={messages} />
        </div>
        <form onSubmit={sendMessage}>
          <div className="flex flex-row w-full">
            <input
              className="flex-grow border rounded p-2"
              disabled={loadingState !== 'ready'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewMessage(e.target.value); }}
              placeholder="Escriba su mensaje..."
              type="text"
              value={newMessage}
            />
            <button className="bg-blue-500 text-white rounded p-2 ml-2" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
