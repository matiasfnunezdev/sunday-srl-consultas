import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type {
	ApiResponse,
	SetAuthSecretRequest,
	UserData,
} from '@/_domain/interfaces/user/user';

export class UserAPIImplementation extends AxiosFetchRepository {
	private baseUrl = 'api';

	getUser(accessToken: string): Promise<ApiResponse<UserData>> {
		const getUserInfoUrl = `${this.baseUrl}/user`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<UserData>>(getUserInfoUrl, config);
	}

	setAuthSecret(
		accessToken: string,
		authSecret: string
	): Promise<ApiResponse<UserData>> {
		const setAuthSecretUrl = `${this.baseUrl}/users/bo/setAuthSecret`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		const requestData: SetAuthSecretRequest = {
			authSecret,
		};

		return super.put<ApiResponse<UserData>>(
			setAuthSecretUrl,
			requestData,
			config
		);
	}
}
