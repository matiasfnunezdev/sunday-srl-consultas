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

			if (response.success) {
				setMessages(
					response.data.map((message) => {
						const media = message?.media;

						if (media) {
							const mediaIsString = typeof media === 'string';
							const parsedMedia = mediaIsString ? JSON.parse(media) : media;
							return {
								...message,
								media: parsedMedia?.map((m) => {
									return {
										...m,
										content_type: m?.ContentType ?? m?.content_type,
										Sid: m?.Sid ?? m?.sid,
									};
								}),
							};
						}

						return message;
					})
				);
			} else {
				setError('Get tag: Error getting tag.');
			}
		} catch {
			setError('Get tag: Unexpected Error getting tago.');
			throw new Error('An unexpected error ocurred.');
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
