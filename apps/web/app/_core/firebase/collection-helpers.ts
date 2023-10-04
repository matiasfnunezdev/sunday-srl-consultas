import { Firestore } from "firebase-admin/firestore";

export async function createOne(
  input: any,
  db: Firestore,
  collectionName: string,
) {
  const collection = db.collection(collectionName);
  const result = await collection.add({
    ...input,
    created: new Date().toISOString(),
  });

  return { id: result.id };
}