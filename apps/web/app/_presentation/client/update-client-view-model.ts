import { useState } from 'react';
import { UpdateClient } from '@/_domain/use-cases/client/update-client'; // Assuming the use case exists
import type { Client } from '@/_domain/interfaces/client';
import { ClientAPIImplementation } from '@/_data/repositories/client-api-implementation';

interface UpdateClientViewModelResponse {
	updateClient: (
		accessToken: string,
		requestData: Partial<Client>,
		clientId: string
	) => Promise<void>;
	client: Client | undefined;
	error: string | undefined;
	loading: boolean;
}

export default function UpdateClientViewModel(): UpdateClientViewModelResponse {
	const [client, setClient] = useState<Client | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const UseCase = new UpdateClient(new ClientAPIImplementation());

	async function updateClient(
		accessToken: string,
		requestData: Partial<Client>,
		clientId: string
	): Promise<void> {
		try {
			setLoading(true);

			const response = await UseCase.invoke(accessToken, requestData, clientId);

			if (response.success) {
				setClient(response.data);
			} else {
				setError('Update client: Error updating client info.');
			}
		} catch (e) {
			console.error('Error while updating client:', e);
			setError(`Update client: Unexpected Error updating client info.`);
		} finally {
			setLoading(false);
		}
	}

	return {
		updateClient,
		client,
		error,
		loading,
	};
}
