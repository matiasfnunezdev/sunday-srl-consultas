import type { Client } from '@/_domain/interfaces/client';
import type { ApiResponse } from '@/_domain/interfaces/user/user'; // Reusing the ApiResponse type from the user domain
import type { ClientRepository } from '@/_domain/repositories/client-repository';

export interface GetClientUseCase {
	invoke: (accessToken: string, id: string) => Promise<ApiResponse<Client>>;
}

export class GetClient implements GetClientUseCase {
	private clientRepo: ClientRepository;

	constructor(_clientRepo: ClientRepository) {
		this.clientRepo = _clientRepo;
	}

	invoke(accessToken: string, id: string): Promise<ApiResponse<Client>> {
		return this.clientRepo.getClient(accessToken, id);
	}
}
