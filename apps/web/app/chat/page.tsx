/* eslint-disable @typescript-eslint/no-unsafe-return -- description */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- description */
/* eslint-disable react/hook-use-state -- description */
/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/no-floating-promises -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */

/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unused-vars -- description */ 
"use client"
import React, { useEffect, useRef, useState } from 'react';
import Chat from '../_core/components/chat/chat';
import Header from '../_core/components/chat/chatComponents/Header';
import { useConversations } from '../_core/contexts/conversations-context';
import ChatMessages from '../_core/components/chat/chatComponents/chatMessages';
import { FooterComponent } from '../_core/components/chat/chatComponents/FooterComponent';
import { Sidebar } from '../_core/components/chat/chatComponents/sidebar/SideBar';
import { ModalResponder } from '../_core/components/chat/chatComponents/ResponderModal';

async function fetchConversations() {
	const res = await fetch('api/conversations', {
		cache: 'no-store',
	}); // Replace with your API endpoint

	const data = await res.json();
	 
	return data.openConversations;
}

async function sendMessage(conversationSid, message) {
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

    const data = await response.json();
    await fetchConversations();
    return data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw new Error('Failed to send message');
  }
}

export default function Page(): JSX.Element {
  const {
		conversations,
		setConversations,
    selectedConversation,
		selectedConversationMessages,
	} = useConversations();

   const [isModalOpen, setModalOpen] = useState(false);
   const [timeStamp, setTimeStamp] = useState<number | undefined>()
 
   const handleSendMessage = async (message) => {
     await sendMessage(selectedConversation?.sid, message);
     setTimeStamp(new Date().getTime())
   };
 
   const openModal = () => setModalOpen(true);
   const closeModal = () => setModalOpen(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleGetConversations = async () => {
		const result = await fetchConversations();

		if (result.length) {
			setConversations(result);
		}
	};

  const handleFetchConversationMessages = async () => {
    await fetchConversations()
    setTimeStamp(new Date().getTime())
  }

	useEffect(() => {
		handleGetConversations();
	}, []);

  useEffect(() => {
    const doSomething = () => {
      handleFetchConversationMessages();
    };

    const intervalId = setInterval(doSomething, 5000);

    return () => clearInterval(intervalId);
  }, []);

	useEffect(() => {
		console.log('conversations', conversations);
	}, [conversations]);

	useEffect(() => {
		console.log('selectedConversationMessages', selectedConversationMessages);
	}, [selectedConversationMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversationMessages]);
  
	return (
    <div className="flex flex-col md:flex-row bg-[#202123] min-h-screen">

      {/* Main content area */}
      <main className="flex flex-col flex-1">
        {/* Header: always visible */}
        <header className="flex justify-between items-center p-4 bg-[#202123]">
          {/* Placeholder for left side of the header */}
          <Header timeStamp={timeStamp} />
        </header>

        {/* Main content: list of messages */}
        <section className="flex-1 overflow-y-auto">
          {selectedConversationMessages.map((message, index) => (
            <ChatMessages key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </section>
        <FooterComponent onRespond={openModal} />
        <ModalResponder onClose={closeModal} onSend={handleSendMessage} show={isModalOpen} />
      </main>

      {/* Sidebar: hidden on mobile, visible on medium screens and up, on the right */}
      <aside className="bg-gray-900 md:w-96 md:block hidden absolute inset-y-0 right-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out">
        {/* Sidebar content here */}
        <div>
          <Sidebar />
        </div>
      </aside>

    </div>
		// <div>
		//   <Chat />
		// </div>
	);
}
