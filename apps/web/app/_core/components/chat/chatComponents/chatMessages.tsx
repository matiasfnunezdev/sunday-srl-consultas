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

interface Props {
	message: ChatMessage
}

const ChatMessages: FC<Props> = memo(({ message }) => {

	// useEffect(() => {
	// 	async function fetchData(media: MediaItem[]): Promise<void>{
	// 		for (const mediaItem of media) {
	// 			try {
	// 				// eslint-disable-next-line no-await-in-loop -- N/A
	// 			const result = await fetchMedia(mediaItem.sid)
	// 			// eslint-disable-next-line no-console -- N/A
	// 			console.log('result', result)
	// 			} catch (error) {
	// 				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call -- N/A
	// 				throw Error(error.toString())
	// 			}
				
	// 		}
	// 	}

	// 	if (message.media?.length) {
	// 		void fetchData(message.media)
	// 	}
	// }, [])

	const renderMessage =
		message.role === 'user' ? (
			<div className="relative flex gap-4 p-4 text-base md:max-w-2xl md:gap-2 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
				<div className="text-right font-bold">
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
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
