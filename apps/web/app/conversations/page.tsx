/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
// `_core/utils/twillio-utils` can be replaced with the direct fetch in this case.

import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
async function fetchConversations() {
	const res = await fetch('http://localhost:3000/api/conversations', {
		cache: 'no-store',
	}); // Replace with your API endpoint

	const data = await res.json();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- description
	return data.openConversations;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export default async function Page() {
	// Fetch conversations on every request, similar to `getServerSideProps`.
	const conversations = await fetchConversations();

	return (
		<div className="">
			<h1 className="text-3xl font-bold text-red dark:text-red">
				Open Conversations
			</h1>
			<ul>
				{conversations.map((conversation) => (
					<li key={conversation.sid}>
						{conversation.friendlyName} (SID: {conversation.sid})
						<Link href={`/sendmessage?conversationSid=${conversation.sid}`}>
							<span>Go to SendMessage</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
