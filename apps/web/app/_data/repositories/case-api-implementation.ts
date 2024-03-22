import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import { apiBaseUrl } from '@/_core/config/api-config';
import type { Case } from '@/_domain/interfaces/case';

export class CaseAPIImplementation extends AxiosFetchRepository {
	private baseUrl = apiBaseUrl;

	getCase(accessToken: string, id: string): Promise<ApiResponse<Case>> {
		const getCaseUrl = `${this.baseUrl}/cases/${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Case>>(getCaseUrl, config);
	}

	getCases(
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	): Promise<ApiResponse<Case[]>> {
		const getCasesUrl = `${this.baseUrl}/cases?${
			filterParams ? `${filterParams}&` : ''
		}page=${page}&rowsPerPage=${rowsPerPage}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Case[]>>(getCasesUrl, config);
	}

	createCase(
		accessToken: string,
		requestData: Partial<Case>
	): Promise<ApiResponse<Case>> {
		const createCaseUrl = `${this.baseUrl}/cases`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.post<ApiResponse<Case>>(createCaseUrl, requestData, config);
	}

	updateCase(
		accessToken: string,
		requestData: Partial<Case>,
		id: string
	): Promise<ApiResponse<Case>> {
		const updateCaseUrl = `${this.baseUrl}/cases/${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.put<ApiResponse<Case>>(updateCaseUrl, requestData, config);
	}

	deleteCase(accessToken: string, id: string): Promise<ApiResponse<Case>> {
		const deleteCaseUrl = `${this.baseUrl}/cases/${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.delete<ApiResponse<Case>>(deleteCaseUrl, config);
	}
}
