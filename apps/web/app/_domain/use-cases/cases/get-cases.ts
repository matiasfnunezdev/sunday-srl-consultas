import type { Case } from '@/_domain/interfaces/case';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { CaseRepository } from '@/_domain/repositories/case-repository';

export interface GetCasesUseCase {
	invoke: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<ApiResponse<Case[]>>;
}

export class GetCases implements GetCasesUseCase {
	private caseRepo: CaseRepository;

	constructor(_caseRepo: CaseRepository) {
		this.caseRepo = _caseRepo;
	}

	invoke(
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	): Promise<ApiResponse<Case[]>> {
		return this.caseRepo.getCases(accessToken, page, rowsPerPage, filterParams);
	}
}
