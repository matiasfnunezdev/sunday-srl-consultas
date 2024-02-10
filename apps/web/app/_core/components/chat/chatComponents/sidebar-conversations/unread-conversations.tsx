"use client"

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useConversations } from '@/_core/contexts/conversations-context';
import type { Message } from '@/_domain/interfaces/message';

export default function UnreadConversations(): JSX.Element {
	const {
		conversations,
		selectedConversation,
		isLoading,
		setSelectedConversation,
		setSelectedConversationMessages,
		setIsLoading,
	} = useConversations();
	const [selectedConversationSid, setSelectedConversationSid] = useState<
		string | null
	>(null);
	const [expandedPanel, setExpandedPanel] = useState(false);
	const [timeStamp, setTimeStamp] = useState<number | undefined>();

	const handleTogglePanel = (): void => {
		setExpandedPanel((prevExpandedPanel) => !prevExpandedPanel);
	};

	const handleSetSelectedConversationSid = (sid: string): void => {
		setSelectedConversationSid(sid);
		setTimeStamp(new Date().getTime());
	};

	const handleSelectedConversation = (sid: string): void => {
		try {
			setIsLoading(true);
			setSelectedConversation({
				sid,
				messages: [],
			});
		} catch {
			throw new Error('Unexpected error getting messages');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (selectedConversationSid) {
			handleSelectedConversation(selectedConversationSid);
		}
	}, [selectedConversationSid]);

	useEffect(() => {
		if (timeStamp && selectedConversationSid) {
			handleSelectedConversation(selectedConversationSid);
		}
	}, [timeStamp]);

	useEffect(() => {
		if (selectedConversation?.messages.length) {
			const messages = selectedConversation.messages.map((message: Message) => {
				return {
					index: message.index,
					role: message.author.includes('whatsapp') ? 'user' : 'assistant',
					content: message.body,
					author: message.author,
					dateCreated: message.dateCreated,
					media: message.media,
				};
			});

			setSelectedConversationMessages(messages);
		}
	}, [selectedConversation]);

	const renderConversations = conversations
		?.filter((conversation) => conversation.unread)
		.map((conversation) => {
			const isSelected =
				selectedConversationSid === conversation?.conversationSId;
			const selectedClasses = isSelected ? 'bg-neutral-500 rounded-lg' : '';
			return (
				<button
					className={`flex flex-row justify-start items-center gap-2 cursor-pointer ${selectedClasses} p-4`}
					disabled={isLoading}
					key={conversation.conversationSId}
					onClick={() => {
						if (conversation?.conversationSId) {
							handleSetSelectedConversationSid(conversation?.conversationSId);
						}
					}}
					type="button"
				>
					<div className="relative h-10 w-10 rounded-md flex items-center justify-center text-white text-bold">
						<img alt="whatsapp icon" className="rounded-md" src="/wpIcon.png" />
						{conversation?.unreadMessagesCount &&
						conversation?.unreadMessagesCount > 0 ? (
							<span className="absolute flex flex-row justify-center items-center p-1 top-0 right-0 bg-blue-500 rounded-full h-3 w-3 text-[9px]">
								{conversation?.unreadMessagesCount}
							</span>
						) : (
							<span className="absolute flex flex-row justify-center items-center p-1 top-0 right-0 bg-red-500 rounded-full h-3 w-3 text-[9px]" />
						)}
					</div>
					<div>{conversation?.author?.split('+')[1]}</div>
				</button>
			);
		});

	return (
		<div className="w-full bg-[#555759] rounded-md ">
			<div className="w-full " />

			<button
				className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between gap-3 p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
				onClick={handleTogglePanel}
				type="button"
			>
				<div className="flex flex-row justify-start items-center gap-2 text-left">
					<span>Casos no leidos</span>
					<span className="flex flex-row justify-center items-center p-1 top-0 right-0 bg-orange-500 rounded-full h-4 w-4 text-xs">
						{
							conversations?.filter((conversation) => conversation.unread)
								.length
						}
					</span>
				</div>
				{expandedPanel ? (
					<FontAwesomeIcon icon={faChevronUp} />
				) : (
					<FontAwesomeIcon icon={faChevronDown} />
				)}
			</button>
			{expandedPanel ? (
				<div className="flex gap-6 py-2 px-2 justify-start text-white shadow">
					<section className="flex flex-col w-full h-[400px] px-6 overflow-y-auto">
						{renderConversations}
					</section>
				</div>
			) : null}
		</div>
	);
}
