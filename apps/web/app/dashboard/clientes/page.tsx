'use client';
import { useCallback, useEffect, useState } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useAuth } from '@/_core/contexts/auth-context';
import useGetClientsViewModel from '@/_presentation/client/get-clients-view-model';
import type { Client } from '@/_domain/interfaces/client';
import ClientsTable from '@/_core/components/tables/clients/client-table';
import Pagination from '@/_core/components/pagination/pagination';
import type { PagesData } from '@/_domain/interfaces/pagination/pagination';

export default function Clientes(): JSX.Element {
	const {
		getClients,
		clients: clientsData,
		pagesData: clientsPagesData,
		loading,
	} = useGetClientsViewModel();
	const { getAccessToken } = useAuth();

	const [clients, setClients] = useState<Client[]>([]);
	const [pagesData, setPagesData] = useState<PagesData>({
		currentPage: 1,
		hasMorePages: false,
		lastPage: 1,
		totalRecords: 1,
	});
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [filtersParams, setFiltersParams] = useState<string | undefined>();

	const handleOnFiltersChange = (columnFilters?: ColumnFiltersState): void => {
		let filters = '';

		if (columnFilters?.length) {
			for (const filter of columnFilters) {
				const id = filter.id;
				const value = filter.value as string;
				if (!filters?.length) {
					filters += `${id}=${value}`;
				} else {
					filters += `&${id}=${value}`;
				}
			}
		}

		setFiltersParams(filters);
	};

	const handleFilterParamsChange = useCallback(
		async (filterParams?: string) => {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getClients(
						accessToken,
						1,
						pagesData.totalRecords,
						filterParams
					);
				}
			} catch {
				throw new Error('fetchUsers error: Unexpected error getting clients');
			}
		},
		[getAccessToken, getClients, rowsPerPage]
	);

	const handlePageChange = useCallback(
		async (page: number) => {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getClients(accessToken, page, rowsPerPage);
				}
			} catch {
				throw new Error('fetchUsers error: Unexpected error getting clients');
			}
		},
		[getAccessToken, getClients, rowsPerPage]
	);

	const handleChangeRowsPerPage = useCallback(
		async (value: number) => {
			if (loading) return;
			setRowsPerPage(value);
			const accessToken = await getAccessToken();
			if (accessToken) {
				await getClients(accessToken, 1, value);
			}
		},
		[getAccessToken, getClients]
	);

	useEffect(() => {
		async function fetchTags(): Promise<void> {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getClients(accessToken, 1, rowsPerPage);
				}
			} catch {
				throw new Error('fetchTags error: Unexpected error getting clients');
			}
		}
		void fetchTags();
	}, []);

	useEffect(() => {
		if (clientsData?.length) {
			setClients(clientsData);
		}
		if (clientsPagesData) {
			setPagesData(clientsPagesData);
		}
	}, [clientsData, pagesData]);

	useEffect(() => {
		console.log('filtersParams', filtersParams);

		void handleFilterParamsChange(filtersParams);
	}, [filtersParams]);

	const newLocal = 'bg-white h-content w-full';
	return (
		<div className={newLocal}>
			<ClientsTable
				clients={clients}
				loading={loading}
				onFiltersChange={handleOnFiltersChange}
			/>
			<div className="flex justify-end items-center px-6 pb-2">
				<Pagination
					pagesData={pagesData}
					rowsPerPage={rowsPerPage}
					setPage={(page) => {
						void handlePageChange(page);
					}}
					setRowsPerPage={(rowsPerPageToSet) => {
						void handleChangeRowsPerPage(rowsPerPageToSet);
					}}
				/>
			</div>
			<div className="flex justify-end items-center px-6 pb-2" />
		</div>
	);
}
