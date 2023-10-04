import * as fs from 'node:fs';
import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';
import { getLogger } from '../utils/logger';

const logger = getLogger('info');

export function createFirebaseAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  let serviceAccount: admin.ServiceAccount;
  try {
    serviceAccount = JSON.parse(
      fs.readFileSync('/secrets/firebase/firestore-credentials', 'utf8'),
    ) as admin.ServiceAccount;
  } catch (error) {
    logger.error('Unable to read Firestore credentials file:', error);
    process.exit(1);
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export function initializeAdminProd() {
  const app = createFirebaseAdminApp();
  return app.firestore() ;
}
