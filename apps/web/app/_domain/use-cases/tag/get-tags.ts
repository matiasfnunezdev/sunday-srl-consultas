import type { Tag } from '@/_domain/interfaces/tag/tag';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { TagRepository } from '@/_domain/repositories/tag-repository';

export interface GetTagsUseCase {
	invoke: (accessToken: string) => Promise<ApiResponse<Tag[]>>;
}

export class GetTags implements GetTagsUseCase {
	private tagRepo: TagRepository;

	constructor(_userRepo: TagRepository) {
		this.tagRepo = _userRepo;
	}

	invoke(accessToken: string): Promise<ApiResponse<Tag[]>> {
		return this.tagRepo.getTags(accessToken);
	}
}
