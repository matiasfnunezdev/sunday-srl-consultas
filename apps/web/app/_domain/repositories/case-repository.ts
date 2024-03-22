import type { Case } from '../interfaces/case';
import type { ApiResponse } from '../interfaces/user/user';

export interface CaseRepository {
	getCase: (accessToken: string, id: string) => Promise<ApiResponse<Case>>;
	getCases: (
		accessToken: string,
		page: number,
		rowsPerPage: number,
		filterParams?: string
	) => Promise<ApiResponse<Case[]>>;
	createCase: (
		accessToken: string,
		requestData: Partial<Case>
	) => Promise<ApiResponse<Case>>;
	updateCase: (
		accessToken: string,
		requestData: Partial<Case>,
		id: string
	) => Promise<ApiResponse<Case>>;
	deleteCase: (accessToken: string, id: string) => Promise<ApiResponse<Case>>;
}
