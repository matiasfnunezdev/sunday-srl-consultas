import type { ApiResponse, UserData } from '@/_domain/interfaces/user/user';
import type { UserRepository } from '@/_domain/repositories/user-repository';

export interface GetUserUseCase {
	invoke: (accessToken: string) => Promise<ApiResponse<UserData>>;
}

export class GetUser implements GetUserUseCase {
	private userRepo: UserRepository;

	constructor(_userRepo: UserRepository) {
		this.userRepo = _userRepo;
	}

	invoke(accessToken: string): Promise<ApiResponse<UserData>> {
		return this.userRepo.getUser(accessToken);
	}
}
