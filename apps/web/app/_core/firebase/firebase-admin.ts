import type { Firestore} from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAdminQA } from './firebase-admin-qa';
import { initializeAdminProd } from './firebase-admin.prod';

export type FirebaseEnvType = 'local' | 'qa' | 'prod' | 'staging';

export const firestore = async (): Promise<Firestore> => {
  const environment = process.env.FIREBASE_ENV as FirebaseEnvType;

  switch (environment) {
    case 'local':
      await initializeAdminQA();
      return getFirestore();
    case 'prod':
      return initializeAdminProd();
    default:
      await initializeAdminQA();
      return getFirestore();
  }
};
