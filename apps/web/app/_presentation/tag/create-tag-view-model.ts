import { useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag'; // Assuming the Tag interface exists
import { CreateTag } from '@/_domain/use-cases/tag/create-tag'; // Assuming the use case exists
import { TagsAPIImplementation } from '@/_data/repositories/tags-api-implementation';

interface CreateTagViewModelResponse {
	createTag: (accessToken: string, requestData: Partial<Tag>) => Promise<void>;
	tag: Tag | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function CreateTagViewModel(): CreateTagViewModelResponse {
	const [tag, setTag] = useState<Tag | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new CreateTag(new TagsAPIImplementation());

	async function createTag(
		accessToken: string,
		requestData: Partial<Tag>
	): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, requestData);

			if (response.success) {
				setTag(response.data);
			} else {
				setError('Create tag: Error creating tag.');
			}
		} catch (e) {
			// Logging the error can be helpful for debugging
			console.error('Error while creating tag:', e);
			setError(`Create tag: Unexpected Error creating tag.`);
			// You might want to provide a more user-friendly message or handle specific error cases
		} finally {
			setLoading(false);
		}
	}

	return {
		createTag,
		tag,
		error,
		loading,
	};
}
