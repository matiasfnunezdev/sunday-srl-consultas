import type { ApiResponse, UserData } from '../interfaces/user/user';

export interface UserRepository {
	getUser: (accessToken: string, uid: string) => Promise<ApiResponse<UserData>>;
}
