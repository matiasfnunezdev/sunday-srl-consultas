import type { Client } from '../interfaces/client';
import type { ApiResponse } from '../interfaces/user/user';

export interface ClientRepository {
	getClient: (accessToken: string, id: string) => Promise<ApiResponse<Client>>;
	getClients: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<ApiResponse<Client[]>>;
	createClient: (
		accessToken: string,
		requestData: Partial<Client>
	) => Promise<ApiResponse<Client>>;
	updateClient: (
		accessToken: string,
		requestData: Partial<Client>,
		id: string
	) => Promise<ApiResponse<Client>>;
	deleteClient: (
		accessToken: string,
		id: string
	) => Promise<ApiResponse<Client>>;
}
