import type { Tag } from '@/_domain/interfaces/tag/tag'; // Ensure Tag interface is imported
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { TagRepository } from '@/_domain/repositories/tag-repository'; // Ensure TagRepository is defined

export interface UpdateTagUseCase {
	invoke: (
		accessToken: string,
		requestData: Partial<Tag>,
		tagId: string
	) => Promise<ApiResponse<Tag>>;
}

export class UpdateTag implements UpdateTagUseCase {
	private tagRepo: TagRepository;

	constructor(_tagRepo: TagRepository) {
		this.tagRepo = _tagRepo;
	}

	invoke(
		accessToken: string,
		requestData: Partial<Tag>,
		tagId: string
	): Promise<ApiResponse<Tag>> {
		return this.tagRepo.updateTag(accessToken, requestData, tagId);
	}
}
