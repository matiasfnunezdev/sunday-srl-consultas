import { createOne } from "../../_core/firebase/collection-helpers";
import { firestore } from "../../_core/firebase/firebase-admin"

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export async function POST(req: Request): Promise<any> {
 
  const db = firestore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
  const body: any = req.body;
  await createOne(body, db, 'messages');
   
  return new Response('Message added', {
    status: 200,
  })
}

 
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export function GET(): any {
  return "hello world"
}