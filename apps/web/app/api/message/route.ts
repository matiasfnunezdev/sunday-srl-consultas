import { createOne } from '../../_core/firebase/collection-helpers';
import { firestore } from '../../_core/firebase/firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export async function POST(req: Request): Promise<any> {
    const db = firestore();

    const formData = await req.formData();
    const body: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            body[key] = value;
        }
    });

    await createOne(body, db, 'messages');

    return new Response('Message added', {
        status: 200,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export function GET(): any {
    return 'hello world';
}
