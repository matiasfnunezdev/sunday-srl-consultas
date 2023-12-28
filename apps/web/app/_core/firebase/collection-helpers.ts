import type {
	CollectionReference,
	DocumentData,
	Firestore,
	QuerySnapshot,
} from 'firebase-admin/firestore';

export async function createOne(
	input: any,
	db: Firestore,
	collectionName: string
): Promise<{
	id: string;
}> {
	const collection = db.collection(collectionName);

	const result = await collection.add({
		...input,
		created: new Date().toISOString(),
	});

	return { ...input, id: result.id, created: new Date().toISOString() };
}

export async function getOne(
	value: string,
	field: string,
	collection: CollectionReference
): Promise<any | undefined> {
	const querySnapshot: QuerySnapshot = await collection
		.where(field, '==', value)
		.get();

	if (querySnapshot.empty) {
		console.log('No such document!');
		return undefined;
	}
	const doc = querySnapshot.docs[0];
	return doc.data();
}

export async function updateOne(
	value: string,
	field: string,
	updatedData: DocumentData,
	collection: CollectionReference
): Promise<DocumentData | undefined> {
	const querySnapshot: QuerySnapshot = await collection
		.where(field, '==', value)
		.get();

	if (querySnapshot.empty) {
		console.log('No such document to update!');
		return undefined;
	}

	const doc = querySnapshot.docs[0];

	try {
		await collection.doc(doc.id).update(updatedData);

		const updatedDoc = await collection.doc(doc.id).get();
		return { id: updatedDoc.id, ...updatedDoc.data() };
	} catch (error) {
		console.error('Error updating document:', error);
		return undefined;
	}
}

export async function getAll(
	db: Firestore,
	collectionName: string
): Promise<any[]> {
	try {
		const collection: CollectionReference = db.collection(collectionName);
		const querySnapshot: QuerySnapshot = await collection.get();

		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (error) {
		console.error('Error retrieving documents:', error);
		throw error;
	}
}

export async function editOneByField(
	field: string,
	value: any,
	input: any,
	db: Firestore,
	collectionName: string
): Promise<any> {
	try {
		const querySnapshot = await db
			.collection(collectionName)
			.where(field, '==', value)
			.get();

		if (querySnapshot.empty) return null;

		const docSnapshot = querySnapshot.docs[0];
		const docData = docSnapshot.data();

		const docRef = docSnapshot.ref;

		const updateData: any = {
			...docData,
			...input,
		};

		await docRef.set(updateData, { merge: true });

		return { id: docRef.id };
	} catch (error) {
		console.error('Error updating document: ', error);
		throw error;
	}
}
