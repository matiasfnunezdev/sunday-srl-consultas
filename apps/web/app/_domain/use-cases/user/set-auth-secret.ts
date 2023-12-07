import type { ApiResponse, UserData } from '@/_domain/interfaces/user/user';
import type { UserRepository } from '@/_domain/repositories/user-repository';

export interface SetAuthSecretUseCase {
	invoke: (accessToken: string, authSecret: string) => Promise<ApiResponse<UserData>>;
}

export class SetAuthSecret implements SetAuthSecretUseCase {
	private userRepo: UserRepository;

	constructor(_userRepo: UserRepository) {
		this.userRepo = _userRepo;
	}

	invoke(accessToken: string, authSecret: string): Promise<ApiResponse<UserData>> {
		return this.userRepo.setAuthSecret(accessToken, authSecret);
	}
}