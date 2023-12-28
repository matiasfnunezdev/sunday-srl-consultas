import type { Tag } from '@/_domain/interfaces/tag/tag'; // Ensure Tag interface is imported
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { TagRepository } from '@/_domain/repositories/tag-repository'; // Ensure TagRepository is defined

export interface DeleteTagUseCase {
	invoke: (accessToken: string, id: string) => Promise<ApiResponse<Tag>>;
}

export class DeleteTag implements DeleteTagUseCase {
	private tagRepo: TagRepository;

	constructor(_tagRepo: TagRepository) {
		this.tagRepo = _tagRepo;
	}

	invoke(accessToken: string, id: string): Promise<ApiResponse<Tag>> {
		return this.tagRepo.deleteTag(accessToken, id);
	}
}
