import { useState } from 'react';
import type { Case } from '@/_domain/interfaces/case';
import { CaseAPIImplementation } from '@/_data/repositories/case-api-implementation';
import type { PagesData } from '@/_domain/interfaces/pagination/pagination';
import { GetCases } from '@/_domain/use-cases/cases/get-cases';

interface GetCasesViewModelResponse {
	getCases: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<void>;
	cases: Case[] | undefined;
	pagesData?: PagesData;
	error: string | undefined;
	loading: boolean;
}

export default function GetCasesViewModel(): GetCasesViewModelResponse {
	const [cases, setCases] = useState<Case[] | undefined>();
	const [pagesData, setPagesData] = useState<PagesData | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const useCase = new GetCases(new CaseAPIImplementation());

	async function getCases(
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
				setCases(response.data);
				setPagesData(response.pagesData);
			} else {
				setError('Get cases: Error getting cases.');
			}
		} catch {
			setError('Get cases: Unexpected Error getting cases.');
			throw new Error('An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	}

	return {
		getCases,
		cases,
		pagesData,
		error,
		loading,
	};
}
