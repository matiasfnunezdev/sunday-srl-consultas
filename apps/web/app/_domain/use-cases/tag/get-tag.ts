import type { Tag } from '@/_domain/interfaces/tag/tag';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { TagRepository } from '@/_domain/repositories/tag-repository';

export interface GetTagUseCase {
	invoke: (accessToken: string, id: string) => Promise<ApiResponse<Tag>>;
}

export class GetTag implements GetTagUseCase {
	private tagRepo: TagRepository;

	constructor(_userRepo: TagRepository) {
		this.tagRepo = _userRepo;
	}

	invoke(accessToken: string, id: string): Promise<ApiResponse<Tag>> {
		return this.tagRepo.getTag(accessToken, id);
	}
}
