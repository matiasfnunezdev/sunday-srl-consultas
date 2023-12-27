/* eslint-disable unicorn/filename-case -- description */
/* eslint-disable react/display-name -- description */
/* eslint-disable @typescript-eslint/naming-convention -- description */
import type { FC } from 'react';
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { ChatMessage } from '../../../../_domain/interfaces/message';
import TimeAgo from '../../time-ago/time-ago';
import { formatPhoneNumber } from '@/_core/utils/format-phone-numer';

interface Props {
	message: ChatMessage
}

const ChatMessages: FC<Props> = memo(({ message }) => {
	const renderMessage =
		message.role === 'user' ? (
			<div className="relative flex flex-col gap-4 p-4 text-base md:max-w-2xl md:gap-2 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
				<div className="flex flex-row justify-between items-center gap-2 text-right font-bold">
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
				<span className='text-xs'>{formatPhoneNumber(message.author.split('+')[1])}</span>
				</div>
				<div className="prose mt-[-2px] w-full prose-invert">
					<div className="prose whitespace-pre-wrap prose-invert">
						{message.content}
					</div>
					<TimeAgo utcTimestamp={message.dateCreated} />
				</div>
			</div>
		) : (
			<div className="relative flex gap-4 p-4 text-base md:max-w-2xl md:gap-2 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
				<div className="prose mt-[-2px] w-full prose-invert">
					<div className="prose whitespace-pre-wrap prose-invert">
						{message.content}
					</div>
					<TimeAgo utcTimestamp={message.dateCreated} />
				</div>
        <div className="text-right font-bold">
        <FontAwesomeIcon icon={faRobot} size="lg" />
				</div>
			</div>
		);


	return (
		<div
			className={
				message.role === 'user'
					? 'group px-10 border-b  bg-[#444654] text-gray-100 justify-start flex ml-auto'
					: 'group px-10 border-b bg-[#343541] text-gray-100 justify-end flex mr-auto'
			}
		>
			{renderMessage}
		</div>
	);
});

export default ChatMessages;
