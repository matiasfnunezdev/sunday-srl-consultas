/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/no-floating-promises -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
/* eslint-disable react/no-array-index-key -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */

/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unused-vars -- description */
'use client';
import { useEffect, useRef, useState } from 'react';
import { useConversations } from '../../contexts/conversations-context';
import Header from './chatComponents/Header';
import ChatMessages from './chatComponents/chatMessages';
import InputChat from './chatComponents/InputChat';
import { FooterComponent } from './chatComponents/FooterComponent';
import { Sidebar } from './chatComponents/sidebar/SideBar';
import ModalLabels from './chatComponents/ModalLabels';

async function fetchConversations() {
	const res = await fetch('http://localhost:3000/api/conversations', {
		cache: 'no-store',
	}); // Replace with your API endpoint

	const data = await res.json();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- description
	return data.openConversations;
}

export default function Chat(): JSX.Element {
	const {
		conversations,
		setConversations,
		selectedConversationMessages,
	} = useConversations();
	const handleSend = (message: string) => {
		// Añade tu lógica para manejar el envío del mensaje aquí
	};
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleGetConversations = async () => {
		const result = await fetchConversations();

		if (result.length) {
			setConversations(result);
		}
	};

	useEffect(() => {
		handleGetConversations();
	}, []);

	useEffect(() => {
		console.log('conversations', conversations);
	}, [conversations]);

	useEffect(() => {
		console.log('selectedConversationMessages', selectedConversationMessages);
	}, [selectedConversationMessages]);

	return (
		<>
			<div />
			<div className="flex justify-center flex-col">
				<div className="flex bottom-0 w-full pl-4">
					<div className="flex flex-row">
						<div className="w-full bg-[#343541] h-full overflow-y-auto fixed bottom-16 ">
							{selectedConversationMessages.map((message, index) => (
								<ChatMessages key={index} message={message} />
							))}
							<div ref={messagesEndRef} />
						</div>
					</div>
					<div className="w-[800px] bg-[#343541] h-16 fixed bottom-5">
						<InputChat onSend={handleSend} placeholder="Type your message" />
					</div>
				</div>
				<div className="pt-20 fixed right-0 h-full">
					<Sidebar />
				</div>
			</div>
			<div className="pl-4">
				<FooterComponent />
			</div>
			{/* <LabelAlert /> */}
			{/* <ModalLabels /> */}
		</>
	);
}
