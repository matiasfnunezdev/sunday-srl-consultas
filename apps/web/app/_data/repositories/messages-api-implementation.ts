import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import { apiBaseUrl } from '@/_core/config/api-config';

export class MessagesAPIImplementation extends AxiosFetchRepository {
	private baseUrl = apiBaseUrl;

	getMessages(accessToken: string, id: string): Promise<ApiResponse<any[]>> {
		const getUserInfoUrl = `${this.baseUrl}/message/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<any[]>>(getUserInfoUrl, config);
	}
}
