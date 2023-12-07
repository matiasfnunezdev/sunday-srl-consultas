import type { FirebaseApp } from 'firebase/app';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import localforage from 'localforage';

const initFirebase = (): FirebaseApp => {
	const params = {
		apiKey: 'AIzaSyDiPuQ03xUH_dj35KGnkZcrAm0eIlD0uq4',
		authDomain: 'sunday-srl-consultas.firebaseapp.com',
		projectId: 'sunday-srl-consultas',
		storageBucket: 'sunday-srl-consultas.appspot.com',
		messagingSenderId: '1010046766522',
		appId: '1:1010046766522:web:2461920bc7692a1ddca183',
		measurementId: 'G-2LV0DX7YKZ',
	};

	const apps = getApps();
	if (!apps.length) {
		return initializeApp(params);
	}
	return getApp();
};

const firebaseCloudMessaging = {
	tokenInlocalforage: async () => localforage.getItem('fcm_token'),
	initFirebase: () => {
		const app = initFirebase();

		return app;
	},
	init: async () => {
		if ((await localforage.getItem('fcm_token')) !== null) return false;
		await Notification.requestPermission();
		const messaging = getMessaging();
		const token = await getToken(messaging, {
			vapidKey:
				'BLSevuqIn0zpTo0sL2AkoGn6R9Sl7NrOPe-4c599aNGQbz9MNDDShHdtoZQc8b8xC1ONPGj6sSoDcfpLTLiIxVQ',
		});
		await localforage.setItem('fcm_token', token);
	},
};

export { firebaseCloudMessaging };
