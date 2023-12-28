import { useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import { GetTag } from '@/_domain/use-cases/tag/get-tag';
import { TagsAPIImplementation } from '@/_data/repositories/tags-api-implementation';

interface GetTagViewModelResponse {
	getTag: (accessToken: string, id: string) => Promise<void>;
	tag: Tag | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function GetTagViewModel(): GetTagViewModelResponse {
	const [tag, setTag] = useState<Tag | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new GetTag(new TagsAPIImplementation());

	async function getTag(accessToken: string, id: string): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, id);

			if (response.success) {
				setTag(response.data);
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
		getTag,
		tag,
		error,
		loading,
	};
}
