import { createOne } from "../../_core/firebase/collection-helpers";
import { firestore } from "../../_core/firebase/firebase-admin"

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export async function POST(request: Request): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- description
  const db = await firestore();
  const body = request.body;
  await createOne(body, db, 'messages');
  const res = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- description
  return Response.json('message added')
}

 
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export function GET(): any {
  return "hello world"
}