// Ensure necessary interfaces are imported
import type { Client } from '@/_domain/interfaces/client';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { ClientRepository } from '@/_domain/repositories/client-repository';

export interface UpdateClientUseCase {
	invoke: (
		accessToken: string,
		requestData: Partial<Client>,
		clientId: string
	) => Promise<ApiResponse<Client>>;
}

export class UpdateClient implements UpdateClientUseCase {
	private clientRepo: ClientRepository;

	constructor(_clientRepo: ClientRepository) {
		this.clientRepo = _clientRepo;
	}

	invoke(
		accessToken: string,
		requestData: Partial<Client>,
		clientId: string
	): Promise<ApiResponse<Client>> {
		return this.clientRepo.updateClient(accessToken, requestData, clientId);
	}
}
