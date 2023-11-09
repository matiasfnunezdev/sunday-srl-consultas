/* eslint-disable unicorn/filename-case -- description */
 
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
/* eslint-disable no-console -- description */
/* eslint-disable react-hooks/exhaustive-deps -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
/* eslint-disable @typescript-eslint/no-unsafe-return -- description */
/* eslint-disable @typescript-eslint/no-floating-promises -- description */
/* eslint-disable jsx-a11y/click-events-have-key-events -- description */
/* eslint-disable jsx-a11y/no-static-element-interactions -- description */
/* eslint-disable react/jsx-sort-props -- description */
/* eslint-disable react/self-closing-comp -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @next/next/no-img-element -- description */

// Fetch initial conversation messages here
import { useEffect, useState } from 'react';
import { useConversations } from '../../../contexts/conversations-context';

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

	const handleSetSelectedConversationSid = (sid: string) => {
		setSelectedConversationSid(sid);
	};

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
    console.log('selectedConversation', selectedConversation)
		if (selectedConversation?.messages.length) {
			const messages = selectedConversation.messages.map((message) => {
				const author = (message?.author ?? '') as string
				console.log('author', author)
				return {
					role: author.includes('whatsapp') ? 'user' : 'assistant',
					content: message?.body,
					author: message?.author,
				}
			})

			setSelectedConversationMessages(messages);
		}
  }, [selectedConversation])

	const renderConversations = conversations.map((conversation) => {
		return (
			<div
				key={conversation.sid}
				className="relative mr-4 cursor-pointer"
				onClick={() => {
					handleSetSelectedConversationSid(conversation.sid);
				}}
			>
				<div className=" h-10 w-10 rounded-md flex items-center justify-center text-white text-bold">
					<img className="rounded-md" src="/wpIcon.png" alt="whatsapp icon" />
				</div>
				<span className="absolute top-0 right-0 bg-red-500 rounded-full h-3 w-3"></span>{' '}
				{/* Badge rojo */}
			</div>
		);
	});

	return (
      <div className="flex items-center">
        <p className="text-lg font-bold text-white ml-2">SundaySocial</p>
        <div className="flex px-6">{renderConversations}</div>
      </div>
	);
}
