 

/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { Button } from './ButtonChat';
import type { SendMessageResponse } from '@/_domain/interfaces/send-message-response';
import type { Conversation } from '@/_domain/interfaces/conversation';
import { useConversations } from '@/_core/contexts/conversations-context';
import { useSnackbar } from '@/_core/contexts/snackbar-context';
import { useAuth } from '@/_core/contexts/auth-context';

interface FooterComponentProps {
	onRespond: () => void;
	onEtiquetar: () => void;
}

async function fetchConversations(
	accessToken: string
): Promise<Conversation[]> {
	const res = await fetch('api/conversations', {
		headers: {
			'x-access-token': accessToken,
		},
		cache: 'no-store',
	});

	const data: any = await res.json();

	return data.data;
}

async function updateConversation(
	conversationSId: string,
	payload: any,
	accessToken: string
): Promise<any> {
	try {
		const response = await fetch('api/update-conversation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ conversationSId, payload }),
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const sendMessageRes: SendMessageResponse = await response.json();
		const conversations = await fetchConversations(accessToken);
		return { sendMessageRes, conversations };
	} catch (error) {
		throw new Error('Failed to send message');
	}
}

export function FooterComponent(props: FooterComponentProps) {
	const { onRespond, onEtiquetar } = props;
	const { getAccessToken } = useAuth();
	const addSnackbar = useSnackbar();

  const { selectedTags, selectedConversation, setSelectedTags, setConversations, setSelectedConversation, setSelectedConversationMessages } = useConversations();

  const handleUpdateConversation = async () => {
    const sid = selectedConversation?.sid;

		if (selectedTags?.length > 0) {
			if (sid) {
				setSelectedConversation(null)
				setSelectedConversationMessages([])
				setSelectedTags([])
				const accessToken = await getAccessToken();
				if (accessToken) {
					await updateConversation(sid, {
						inProgress: false,
						unreadMessagesCount: 0,
						unread: false,
						closeCase: true,
						tags: selectedTags
					}, accessToken);
					const conversationsResult = await fetchConversations(accessToken);
					setConversations(conversationsResult);
				}
				
			}
		}
		else {
			addSnackbar({
				key: 'warning',
				text: 'Debes etiquetar el caso antes de cerrarlo',
				variant: 'warning',
			});
		}

    
  }

	return (
		<div className="bg-[#202123] w-full content p-2">
			<div className="flex flex-row justify-end items-center gap-4 px-4">
				<Button
					backgroundColor="[#F2EC4C]"
					icon={undefined}
					onClick={() => {
            void handleUpdateConversation();
          }}
					padding="3"
					text="CERRAR CASO"
				/>
				<Button
					backgroundColor="[#F2EC4C]"
					icon={undefined}
					onClick={onEtiquetar}
					padding="3"
					text="ETIQUETAR"
				/>
				<Button
					backgroundColor="[#F2EC4C]"
					icon={undefined}
					onClick={onRespond}
					padding="3"
					text="RESPONDER"
				/>
			</div>
			{/* <div className="flex flex-col gap-4">
        <Button backgroundColor="[#F2EC4C]" icon={undefined} padding="3" text="ETIQUETAR" />
      </div>
      <div className="flex flex-col gap-4">
        <button className="px-14 rounded-md bg-[#D9D9D975] cursor-pointer select-none p-3 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-200">
          DESCARTAR
        </button>
      </div> */}
		</div>
	);
}
