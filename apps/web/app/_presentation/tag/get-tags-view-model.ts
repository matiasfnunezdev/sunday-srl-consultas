import { useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import { TagsAPIImplementation } from '@/_data/repositories/tags-api-implementation';
import { GetTags } from '@/_domain/use-cases/tag/get-tags';

interface GetTagsViewModelResponse {
	getTags: (accessToken: string) => Promise<void>;
	tags: Tag[] | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function GetTagsViewModel(): GetTagsViewModelResponse {
	const [tags, setTags] = useState<Tag[] | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new GetTags(new TagsAPIImplementation());

	async function getTags(accessToken: string): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken);

			if (response.success) {
				setTags(response.data);
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
		getTags,
		tags,
		error,
		loading,
	};
}
