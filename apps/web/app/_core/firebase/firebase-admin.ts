import type { Firestore} from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAdminQA } from './firebase-admin-qa';
import { initializeAdminProd } from './firebase-admin.prod';

export type FirebaseEnvType = 'local' | 'qa' | 'prod' | 'staging';

export const firestore =  (): Firestore => {
  const environment = process.env.FIREBASE_ENV as FirebaseEnvType;

  switch (environment) {
    case 'local':
      initializeAdminQA();
      return getFirestore();
    case 'prod':
      return initializeAdminProd();
    default:
      initializeAdminQA();
      return getFirestore();
  }
};
