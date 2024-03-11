export interface Client {
	id: string;
	clientId: string;
	clientNumber: string;
	name: string;
	lastName: string;
	fullName: string;
	author: string;
	participantSid: string;
	deleted?: boolean;
}
