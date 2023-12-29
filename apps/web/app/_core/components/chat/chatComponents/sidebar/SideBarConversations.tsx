 
"use client"

import ReadConversations from '../sidebar-conversations/read-conversations';
import UnreadConversations from '../sidebar-conversations/unread-conversations';

interface SidebarConversationsProps {
	handleFetchMessages: (
		conversationSid: string,
		accessToken: string
	) => Promise<any[]>
}

export default function SidebarConversations(props: SidebarConversationsProps): JSX.Element {
	const { handleFetchMessages } = props;
	return (
		<div className="min-w-[300px] h-content right-0 top-0 z-40 flex h-screen overflow-hidden flex-none flex-col space-y-4 bg-[#202123] p-4 text-[14px] transition-all sm:relative sm:top-0">
			<div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
				<ReadConversations handleFetchMessages={handleFetchMessages} />
			</div>
			<div className="flex max-h-screen flex-row-reverse items-center bg-[#555759] rounded-md">
				<UnreadConversations handleFetchMessages={handleFetchMessages} />
			</div>
		</div>
	);
}
