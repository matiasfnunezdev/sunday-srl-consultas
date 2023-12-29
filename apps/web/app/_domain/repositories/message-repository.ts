import type { ApiResponse } from '../interfaces/user/user';

export interface MessageRepository {
	getMessages: (accessToken: string, id: string) => Promise<ApiResponse<any[]>>;
}
