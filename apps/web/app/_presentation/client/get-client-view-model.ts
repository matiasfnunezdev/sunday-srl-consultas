import { useState } from 'react';
import { GetClient } from '@/_domain/use-cases/client/get-client';
import type { Client } from '@/_domain/interfaces/client';
import { ClientAPIImplementation } from '@/_data/repositories/client-api-implementation';

interface GetClientViewModelResponse {
	getClient: (accessToken: string, id: string) => Promise<void>;
	client: Client | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function GetClientViewModel(): GetClientViewModelResponse {
	const [client, setClient] = useState<Client | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const useCase = new GetClient(new ClientAPIImplementation());

	async function getClient(accessToken: string, id: string): Promise<void> {
		try {
			setLoading(true);

			const response = await useCase.invoke(accessToken, id);

			console.log('client response', response);

			if (response.success) {
				setClient(response.data);
			} else {
				setError('Get client: Error getting client.');
			}
		} catch {
			setError('Get client: Unexpected Error getting client.');
			throw new Error('An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	}

	return {
		getClient,
		client,
		error,
		loading,
	};
}
