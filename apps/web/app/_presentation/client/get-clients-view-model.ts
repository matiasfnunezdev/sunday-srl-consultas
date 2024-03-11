import { useState } from 'react';
import { GetClients } from '@/_domain/use-cases/client/get-clients';
import type { Client } from '@/_domain/interfaces/client';
import { ClientAPIImplementation } from '@/_data/repositories/client-api-implementation';
import type { PagesData } from '@/_domain/interfaces/pagination/pagination';

interface GetClientsViewModelResponse {
	getClients: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<void>;
	clients: Client[] | undefined;
	pagesData?: PagesData;
	error: string | undefined;
	loading: boolean;
}

export default function GetClientsViewModel(): GetClientsViewModelResponse {
	const [clients, setClients] = useState<Client[] | undefined>();
	const [pagesData, setPagesData] = useState<PagesData | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const useCase = new GetClients(new ClientAPIImplementation());

	async function getClients(
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	): Promise<void> {
		try {
			setLoading(true);

			const response = await useCase.invoke(
				accessToken,
				page,
				rowsPerPage,
				filterParams
			);

			if (response.success) {
				setClients(response.data);
				setPagesData(response.pagesData);
			} else {
				setError('Get clients: Error getting clients.');
			}
		} catch {
			setError('Get clients: Unexpected Error getting clients.');
			throw new Error('An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	}

	return {
		getClients,
		clients,
		pagesData,
		error,
		loading,
	};
}
