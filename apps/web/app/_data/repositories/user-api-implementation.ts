import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type { ApiResponse, UserData } from '@/_domain/interfaces/user/user';
import { apiBaseUrl } from '@/_core/config/api-config';

export class UserAPIImplementation extends AxiosFetchRepository {
	private baseUrl = apiBaseUrl;

	getUser(accessToken: string, uid: string): Promise<ApiResponse<UserData>> {
		const getUserInfoUrl = `${this.baseUrl}/user/?uid=${uid}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<UserData>>(getUserInfoUrl, config);
	}
}
