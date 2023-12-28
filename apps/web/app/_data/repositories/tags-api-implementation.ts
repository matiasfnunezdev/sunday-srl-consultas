import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { Tag } from '@/_domain/interfaces/tag/tag';

export class TagsAPIImplementation extends AxiosFetchRepository {
	private baseUrl = 'http://localhost:3000/api';

	getTag(accessToken: string, id: string): Promise<ApiResponse<Tag>> {
		const getUserInfoUrl = `${this.baseUrl}/tag/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Tag>>(getUserInfoUrl, config);
	}

	getTags(accessToken: string): Promise<ApiResponse<Tag[]>> {
		const getUserInfoUrl = `${this.baseUrl}/tag`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Tag[]>>(getUserInfoUrl, config);
	}

	createTag(
		accessToken: string,
		requestData: Partial<Tag>
	): Promise<ApiResponse<Tag>> {
		const createClientUrl = `${this.baseUrl}/tag`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.post<ApiResponse<Tag>>(createClientUrl, requestData, config);
	}

	updateTag(
		accessToken: string,
		requestData: Partial<Tag>,
		id: string
	): Promise<ApiResponse<Tag>> {
		const updateClientUrl = `${this.baseUrl}/tag/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.put<ApiResponse<Tag>>(updateClientUrl, requestData, config);
	}

	deleteTag(accessToken: string, id: string): Promise<ApiResponse<Tag>> {
		const deleteClientUrl = `${this.baseUrl}/tag/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.delete<ApiResponse<Tag>>(deleteClientUrl, config);
	}
}
