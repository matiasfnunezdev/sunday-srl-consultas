import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { MessageRepository } from '@/_domain/repositories/message-repository';

export interface GetMessagesUseCase {
	invoke: (accessToken: string, id: string) => Promise<ApiResponse<any[]>>;
}

export class GetMessages implements GetMessagesUseCase {
	private messageRepo: MessageRepository;

	constructor(_messageRepo: MessageRepository) {
		this.messageRepo = _messageRepo;
	}

	invoke(accessToken: string, id: string): Promise<ApiResponse<any[]>> {
		return this.messageRepo.getMessages(accessToken, id);
	}
}
