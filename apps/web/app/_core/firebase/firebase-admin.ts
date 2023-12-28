import type { Firestore } from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminQA } from './firebase-admin-qa';
import { initializeAdminProd } from './firebase-admin.prod';

export type FirebaseEnvType = 'local' | 'qa' | 'prod' | 'staging';

export const firebaseAdmin = (): { firestore: Firestore; auth: Auth } => {
	const environment = process.env.FIREBASE_ENV as FirebaseEnvType;

	switch (environment) {
		case 'local':
			initializeAdminQA();
			return { firestore: getFirestore('staging'), auth: getAuth() };
		case 'prod':
			return { firestore: initializeAdminProd(), auth: getAuth() };
		default:
			initializeAdminQA();
			return { firestore: getFirestore('staging'), auth: getAuth() };
	}
};
