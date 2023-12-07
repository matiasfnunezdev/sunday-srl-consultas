import type {
	DocumentSnapshot,
	Firestore,
	QuerySnapshot,
} from 'firebase-admin/firestore';
import type { ConversationFirebase } from '../../_domain/interfaces/conversation-firebase';

export async function fetchConversations(
	db: Firestore
): Promise<ConversationFirebase[]> {
	const conversations: ConversationFirebase[] = [];

	const querySnapshot: QuerySnapshot = await db
		.collection('conversations')
		.get();

	querySnapshot.docs.forEach((doc: DocumentSnapshot) => {
		const conversation = doc.data() as ConversationFirebase;

		conversations.push(conversation);
	});

	return conversations;
}
