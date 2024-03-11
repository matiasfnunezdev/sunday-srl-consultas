import type { Client } from '@/_domain/interfaces/client';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { ClientRepository } from '@/_domain/repositories/client-repository';

export interface GetClientsUseCase {
	invoke: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<ApiResponse<Client[]>>;
}

export class GetClients implements GetClientsUseCase {
	private clientRepo: ClientRepository;

	constructor(_clientRepo: ClientRepository) {
		this.clientRepo = _clientRepo;
	}

	invoke(
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	): Promise<ApiResponse<Client[]>> {
		return this.clientRepo.getClients(
			accessToken,
			page,
			rowsPerPage,
			filterParams
		);
	}
}
