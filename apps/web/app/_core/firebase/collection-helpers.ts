import type { Firestore } from "firebase-admin/firestore";

export async function createOne(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
  input: any,
  db: Firestore,
  collectionName: string,
): Promise<{
  id: string;
}> {
  const collection = db.collection(collectionName);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- description
  const result = await collection.add({
    ...input,
    created: new Date().toISOString(),
  });

  return { id: result.id };
}