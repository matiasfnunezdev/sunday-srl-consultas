/* eslint-disable react/display-name -- description */
/* eslint-disable @typescript-eslint/naming-convention -- description */
import type { FC } from 'react';
import React, { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import type {
	ChatMessage,
	MediaItem,
} from '../../../../_domain/interfaces/message';
import TimeAgo from '../../time-ago/time-ago';
import { Button } from './ButtonChat';
import { formatPhoneNumber } from '@/_core/utils/format-phone-numer';
import { fetchMedia } from '@/_core/utils/api-helper';

interface Props {
	message: ChatMessage;
}

const ChatMessages: FC<Props> = memo(({ message }) => {
	const [mediaUrls, setMediaUrls] = useState<any[]>();

	useEffect(() => {
		console.log('message', message);
		async function handleFetchMedia(media: MediaItem[]): Promise<void> {
			try {
				console.log('message media', message?.media);
				const mediaPromises = media.map((mediaValue) =>
					fetchMedia(mediaValue.Sid)
				);

				// Use Promise.allSettled to wait for all promises to settle
				const results = await Promise.allSettled(mediaPromises);

				// Process results
				const successfulResults = results.flatMap((result) =>
					result.status === 'fulfilled' ? [result.value] : []
				);

				// Optionally, handle errors or rejected promises
				const errors = results.flatMap((result) =>
					result.status === 'rejected' ? [result.reason] : []
				);

				if (errors.length > 0) {
					console.error('Some media fetches failed:', errors);
					// Handle errors as needed, e.g., show error messages to the user
				}

				console.log('successfulResults', successfulResults);

				setMediaUrls(successfulResults);
			} catch (error) {
				console.log('error', error);
				console.error(
					'Unexpected error in handleFetchMedia:',
					JSON.stringify(error)
				);
			}
		}

		if (message?.media?.length) {
			const parsedMedia: MediaItem[] = message.media;
			void handleFetchMedia(parsedMedia);
		}
	}, [message?.media]); // Adjust the dependency array as needed

	const renderMedia = mediaUrls?.length
		? mediaUrls.map((media): React.JSX.Element | null | undefined => {
				console.log('media', media);
				const src = media?.links?.content_direct_temporary;
				const contentType = media?.content_type?.split('/')?.[1];

				if (contentType) {
					if (contentType === 'jpeg' || contentType === 'png') {
						return src ? (
							<img
								alt="media"
								className="w-[400px] max-w-[400px]"
								key={media.sid}
								src={src}
								width={100}
							/>
						) : null;
					}
					return (
						<Button
							backgroundColor="[#2b2c34]"
							hoverColor='#40414E'
							icon={faArrowDown}
							key={media?.Sid}
							onClick={() => {
								window.open(src, '_blank')
							}}
							padding="3"
							text={media?.filename}
							textColor='white'
						/>
					);
				}

				return null
		  })
		: null;

	const renderMessage =
		message.role === 'user' ? (
			<div className="relative flex flex-col gap-4 p-4 text-base md:max-w-2xl md:gap-2 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
				<div className="flex flex-row justify-between items-center gap-2 text-right font-bold">
					<FontAwesomeIcon icon={faWhatsapp} size="lg" />
					<span className="text-xs text-gray-400">
						{formatPhoneNumber(message.author.split('+')[1])}
					</span>
				</div>
				<div className="prose mt-[-2px] w-full prose-invert">
					<div className="prose whitespace-pre-wrap prose-invert text-amber-50">
						{message.content}
					</div>
					{renderMedia}

					<TimeAgo utcTimestamp={message.dateCreated} />
				</div>
			</div>
		) : (
			<div className="relative flex flex-col gap-4 p-4 text-base md:max-w-2xl md:gap-2 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
				<div className="text-right font-bold">
					<div className="flex flex-row justify-between items-center gap-2 text-right font-bold">
						<span className="text-xs text-gray-400">Agente SundayMoney</span>
						<img
							alt="sunday-money-logo"
							className="w-7"
							src="/icons/sunday-money-logo-white.png"
						/>
					</div>
				</div>
				<div className="prose mt-[-2px] w-full prose-invert">
					<div className="prose whitespace-pre-wrap prose-invert text-amber-50">
						{message.content}
					</div>
					{renderMedia}
					<TimeAgo utcTimestamp={message.dateCreated} />
				</div>
			</div>
		);

	return (
		<div
			className={
				message.role === 'user'
					? 'group px-10 bg-transparent text-gray-100 justify-start flex ml-auto'
					: 'group px-10 bg-transparent text-gray-100 justify-end flex mr-auto'
			}
		>
			{renderMessage}
		</div>
	);
});

export default ChatMessages;
