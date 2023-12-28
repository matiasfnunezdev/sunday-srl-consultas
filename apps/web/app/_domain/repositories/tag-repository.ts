import type { Tag } from '../interfaces/tag/tag';
import type { ApiResponse } from '../interfaces/user/user';

export interface TagRepository {
	getTag: (accessToken: string, id: string) => Promise<ApiResponse<Tag>>;
	getTags: (accessToken: string) => Promise<ApiResponse<Tag[]>>;
	createTag: (
		accessToken: string,
		requestData: Partial<Tag>
	) => Promise<ApiResponse<Tag>>;
	updateTag: (
		accessToken: string,
		requestData: Partial<Tag>,
		id: string
	) => Promise<ApiResponse<Tag>>;
	deleteTag: (accessToken: string, id: string) => Promise<ApiResponse<Tag>>;
}
