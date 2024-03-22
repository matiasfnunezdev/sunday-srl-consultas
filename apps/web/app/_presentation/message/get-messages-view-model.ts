import { useState } from 'react';
import { GetMessages } from '@/_domain/use-cases/message/get-messages';
import { MessagesAPIImplementation } from '@/_data/repositories/messages-api-implementation';

interface GetMessagesViewModelResponse {
	getMessages: (accessToken: string, id: string) => Promise<void>;
	messages: any[] | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function GetMessagesViewModel(): GetMessagesViewModelResponse {
	const [messages, setMessages] = useState<any[] | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new GetMessages(new MessagesAPIImplementation());

	async function getMessages(accessToken: string, id: string): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, id);

			console.log('response', response);

			if (response.success) {
				setMessages(
					response?.data?.map((message) => {
						const media = message?.media;
						if (typeof media === 'string') {
							// Clean and parse the media string
							const cleanJson = media
								.replace(/^"|"$/g, '') // Remove the leading and trailing double quotes
								.replace(/\\\\"/g, '"') // Unescape double-escaped quotes
								.replace(/\\"/g, '"') // Unescape single-escaped quotes
								.replace(/\\\\/g, '\\'); // Unescape backslashes
							let parsedMedia;
							try {
								parsedMedia = JSON.parse(cleanJson);
							} catch (e) {
								console.error('Error parsing media:', error);
								parsedMedia = []; // Default to an empty array in case of error
							}

							// Ensure parsedMedia is an array
							if (!Array.isArray(parsedMedia)) {
								parsedMedia = [parsedMedia];
							}

							return {
								...message,
								media: parsedMedia.map((m) => ({
									...m,
									content_type: m?.ContentType ?? m?.content_type,
									Sid: m?.Sid ?? m?.sid,
								})),
							};
						}

						return message;
					})
				);
			} else {
				setError('Get tag: Error getting tag.');
			}
		} catch (e) {
			setError('Get tag: Unexpected Error getting tag.');
			console.error('getMessages error: ', e);
		} finally {
			setLoading(false);
		}
	}

	return {
		getMessages,
		messages,
		error,
		loading,
	};
}
