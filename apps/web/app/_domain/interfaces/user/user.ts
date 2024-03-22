import type { PagesData } from '../pagination/pagination';

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	pagesData?: PagesData;
}

export interface UserData {
	id: string;
	uid: string;
	displayName: string;
	mobileNumber: string;
	email?: string;
	role?: string;
	status?: string;
	authSecret?: string;
	deleted: boolean;
}

export interface SetAuthSecretRequest {
	authSecret: string;
}
