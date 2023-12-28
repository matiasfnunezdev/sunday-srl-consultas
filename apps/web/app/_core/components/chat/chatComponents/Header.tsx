/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
 

// Fetch initial conversation messages here
import { useEffect, useState } from 'react';
import { useConversations } from '../../../contexts/conversations-context';
import type { Message } from '../../../../_domain/interfaces/message';

interface HeaderProps {
	timeStamp?: number
}

async function fetchMessages(conversationSid: string) {
  const response = await fetch(`/api/getconversationmessages?conversationSid=${conversationSid}`);
  const data = await response.json();
  return data.messages
}

export default function Header(props: HeaderProps) {
	const { timeStamp } = props;
	const { conversations, selectedConversation, setSelectedConversation, setSelectedConversationMessages } = useConversations();
	const [selectedConversationSid, setSelectedConversationSid] = useState<
		string | null
	>(null);

	const handleSelectedConversation = async (sid: string) => {
    const result = await fetchMessages(sid);
    
    if (result) {
      setSelectedConversation({
        sid,
        messages: result,
      })
    }
  };

  useEffect(() => {
    if (selectedConversationSid) {
      handleSelectedConversation(selectedConversationSid);
    }
  }, [selectedConversationSid])

	useEffect(() => {
    if (timeStamp && selectedConversationSid) {
      handleSelectedConversation(selectedConversationSid);
    }
  }, [timeStamp])

  useEffect(() => {
		if (selectedConversation?.messages.length) {
			const messages = selectedConversation.messages.map((message: Message) => {
				return {
					index: message.index,
					role: message.author.includes('whatsapp') ? 'user' : 'assistant',
					content: message.body,
					author: message.author,
					dateCreated: message.dateCreated,
					media: message.media ?? null
				}
			})

			setSelectedConversationMessages(messages);
		}
  }, [selectedConversation])

	return (
      <div className="flex items-center">
        <p className="text-lg font-bold text-white ml-2">SundaySocial</p>
        {/* <section className="flex px-6 overflow-x-auto">{renderConversations}</section> */}
      </div>
	);
}
