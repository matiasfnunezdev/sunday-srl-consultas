export interface TagData {
	label: string;
	value: string;
}

export interface Case {
	id: string;
	author: string;
	caseId: string;
	conversationSid: string;
	messageSidStart: string;
	messageSidEnd: string;
	tags: TagData[];
}
