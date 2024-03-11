'use client';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useConversations } from '@/_core/contexts/conversations-context';

export default function ReadConversations(): JSX.Element {
	const {
		conversations,
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
			setSelectedConversation({
				sid,
				messages: [],
			});
			setSelectedConversationMessages([]);
			setIsLoading(true);
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

	const renderConversations = conversations
		?.filter((conversation) => !conversation.unread && conversation.inProgress)
		.map((conversation) => {
			const isSelected =
				selectedConversationSid === conversation?.conversationSId;
			const selectedClasses = isSelected ? 'bg-neutral-500 rounded-lg' : '';
			console.log('conversation', conversation);
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
					<div>
						{conversation?.fullName ?? conversation?.author?.split('+')[1]}
					</div>
				</button>
			);
		});

	return (
		<div className="w-full bg-[#555759] rounded-md ">
			<button
				className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between gap-3 p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
				onClick={handleTogglePanel}
				type="button"
			>
				<div className="flex justify-between">
					<div className="flex flex-row justify-start items-center gap-2 text-left">
						<span>Casos en curso</span>
						<span className="flex flex-row justify-center items-center p-1 top-0 right-0 bg-blue-500 rounded-full h-4 w-4 text-xs">
							{
								conversations?.filter((conversation) => conversation.inProgress)
									.length
							}
						</span>
					</div>
				</div>
				{expandedPanel ? (
					<FontAwesomeIcon icon={faChevronUp} />
				) : (
					<FontAwesomeIcon icon={faChevronDown} />
				)}
			</button>
			{expandedPanel ? (
				<div className="flex gap-6 py-2 px-2 justify-start text-white shadow">
					<section className="flex flex-col justify-between gap-2 w-full max-h-[250px] px-4 overflow-y-auto">
						{renderConversations}
					</section>
				</div>
			) : null}
		</div>
	);
}
