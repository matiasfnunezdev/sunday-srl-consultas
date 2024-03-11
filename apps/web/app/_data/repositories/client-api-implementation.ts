import type { AxiosRequestConfig } from 'axios';
import { AxiosFetchRepository } from '@/_core/repositories/fetch-repository';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import { apiBaseUrl } from '@/_core/config/api-config';
import type { Client } from '@/_domain/interfaces/client';

export class ClientAPIImplementation extends AxiosFetchRepository {
	private baseUrl = apiBaseUrl;

	getClient(accessToken: string, id: string): Promise<ApiResponse<Client>> {
		const getClientUrl = `${this.baseUrl}/client/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Client>>(getClientUrl, config);
	}

	getClients(
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	): Promise<ApiResponse<Client[]>> {
		const getClientsUrl = `${this.baseUrl}/client?${
			filterParams ? `${filterParams}&` : ''
		}page=${page}&rowsPerPage=${rowsPerPage}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.get<ApiResponse<Client[]>>(getClientsUrl, config);
	}

	createClient(
		accessToken: string,
		requestData: Partial<Client>
	): Promise<ApiResponse<Client>> {
		const createClientUrl = `${this.baseUrl}/client`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.post<ApiResponse<Client>>(
			createClientUrl,
			requestData,
			config
		);
	}

	updateClient(
		accessToken: string,
		requestData: Partial<Client>,
		id: string
	): Promise<ApiResponse<Client>> {
		const updateClientUrl = `${this.baseUrl}/client/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.put<ApiResponse<Client>>(updateClientUrl, requestData, config);
	}

	deleteClient(accessToken: string, id: string): Promise<ApiResponse<Client>> {
		const deleteClientUrl = `${this.baseUrl}/client/?id=${id}`;

		const headers = {
			'x-access-token': accessToken,
		};

		const config: AxiosRequestConfig = {
			headers,
		};

		return super.delete<ApiResponse<Client>>(deleteClientUrl, config);
	}
}
