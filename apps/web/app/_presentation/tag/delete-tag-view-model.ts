import { useState } from 'react';
import type { Tag } from '@/_domain/interfaces/tag/tag'; // Assuming the Tag interface exists
import { DeleteTag } from '@/_domain/use-cases/tag/delete-tag'; // Assuming the use case exists
import { TagsAPIImplementation } from '@/_data/repositories/tags-api-implementation';

interface DeleteTagViewModelResponse {
	deleteTag: (accessToken: string, id: string) => Promise<void>;
	deletedTag: Tag | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function DeleteTagViewModel(): DeleteTagViewModelResponse {
	const [deletedTag, setDeletedTag] = useState<Tag | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const UseCase = new DeleteTag(new TagsAPIImplementation());

	async function deleteTag(accessToken: string, id: string): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, id);

			if (response.success) {
				setDeletedTag(response.data);
			} else {
				setError('Delete tag: Error deleting tag.');
			}
		} catch (e) {
			// Logging the error can be helpful for debugging
			console.error('Error while deleting tag:', e);
			setError(`Delete tag: Unexpected Error deleting tag.`);
			// You might want to provide a more user-friendly message or handle specific error cases
		} finally {
			setLoading(false);
		}
	}

	return {
		deleteTag,
		deletedTag,
		error,
		loading,
	};
}
