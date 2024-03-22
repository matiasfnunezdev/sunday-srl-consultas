'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useAuth } from '@/_core/contexts/auth-context';
import type { Case } from '@/_domain/interfaces/case';
import Pagination from '@/_core/components/pagination/pagination';
import type { PagesData } from '@/_domain/interfaces/pagination/pagination';
import useGetCasesViewModel from '@/_presentation/cases/get-cases-view-model';
import CasesTable from '@/_core/components/tables/cases/cases-table';

export default function Cases(): JSX.Element {
	const {
		getCases,
		cases: casesData,
		pagesData: casesPagesData,
		loading,
	} = useGetCasesViewModel();
	const { getAccessToken } = useAuth();

	const [cases, setCases] = useState<Case[]>([]);
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
					await getCases(accessToken, 1, pagesData.totalRecords, filterParams);
				}
			} catch {
				throw new Error('fetchCases error: Unexpected error getting cases');
			}
		},
		[getAccessToken, getCases, rowsPerPage]
	);

	const handlePageChange = useCallback(
		async (page: number) => {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getCases(accessToken, page, rowsPerPage);
				}
			} catch {
				throw new Error('fetchCases error: Unexpected error getting cases');
			}
		},
		[getAccessToken, getCases, rowsPerPage]
	);

	const handleChangeRowsPerPage = useCallback(
		async (value: number) => {
			if (loading) return;
			setRowsPerPage(value);
			const accessToken = await getAccessToken();
			if (accessToken) {
				await getCases(accessToken, 1, value);
			}
		},
		[getAccessToken, getCases]
	);

	useEffect(() => {
		async function fetchCases(): Promise<void> {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getCases(accessToken, 1, rowsPerPage);
				}
			} catch {
				throw new Error('fetchCases error: Unexpected error getting cases');
			}
		}
		void fetchCases();
	}, []);

	useEffect(() => {
		if (casesData?.length) {
			setCases(casesData);
		}
		if (casesPagesData) {
			setPagesData(casesPagesData);
		}
	}, [casesData, pagesData]);

	useEffect(() => {
		if (pagesData.totalRecords > 1) {
			void handleFilterParamsChange(filtersParams);
		}
	}, [filtersParams]);

	return (
		<div className="bg-white h-content w-full">
			<CasesTable
				cases={cases}
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
		</div>
	);
}
