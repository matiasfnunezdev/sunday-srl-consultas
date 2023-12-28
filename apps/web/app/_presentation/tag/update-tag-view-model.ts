import { useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag'; // Assuming the Tag interface exists
import { UpdateTag } from '@/_domain/use-cases/tag/update-tag'; // Assuming the use case exists
import { TagsAPIImplementation } from '@/_data/repositories/tags-api-implementation';

interface UpdateTagViewModelResponse {
	updateTag: (
		accessToken: string,
		requestData: Partial<Tag>,
		tagId: string
	) => Promise<void>;
	tag: Tag | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function UpdateTagViewModel(): UpdateTagViewModelResponse {
	const [tag, setTag] = useState<Tag | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const UseCase = new UpdateTag(new TagsAPIImplementation());

	async function updateTag(
		accessToken: string,
		requestData: Partial<Tag>,
		tagId: string
	): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, requestData, tagId);

			if (response.success) {
				setTag(response.data);
			} else {
				setError('Update tag: Error updating tag info.');
			}
		} catch (e) {
			// Logging the error can be helpful for debugging
			console.error('Error while updating tag:', e);
			setError(`Update tag: Unexpected Error updating tag info.`);
			// You might want to provide a more user-friendly message or handle specific error cases
		} finally {
			setLoading(false);
		}
	}

	return {
		updateTag,
		tag,
		error,
		loading,
	};
}
