import type { ReactElement } from 'react';
import React from 'react';

interface Conversation {
	sid: string;
	friendlyName?: string;
}

interface ConversationsListProps {
	conversations: Conversation[];
	selectedConversationSid: string;
	onConversationClick: (item: Conversation) => void;
}

function ConversationsList({
	conversations,
	selectedConversationSid,
	onConversationClick,
}: ConversationsListProps): ReactElement {
	return (
		<div className="border border-gray-300">
			<div className="bg-gray-200 p-4 text-lg font-semibold">
				Open Conversations
			</div>
			<ul>
				{conversations.map((item) => {
					const isActive = item.sid === selectedConversationSid;
					return (
						<li
							className={`cursor-pointer p-4 ${isActive ? 'bg-blue-200' : ''}`}
              key={item.sid}
						>
							<div
								onClick={() => { onConversationClick(item); }}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										onConversationClick(item);
									}
								}}
								role="button"
								tabIndex={0}
							>
								<span
									className={`font-medium ${
										isActive ? 'text-white' : 'text-black'
									}`}
								>
									{item.friendlyName || item.sid}
								</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ConversationsList;
