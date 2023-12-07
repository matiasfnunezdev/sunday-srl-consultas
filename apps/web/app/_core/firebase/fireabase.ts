import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDiPuQ03xUH_dj35KGnkZcrAm0eIlD0uq4',
	authDomain: 'sunday-srl-consultas.firebaseapp.com',
	projectId: 'sunday-srl-consultas',
	storageBucket: 'sunday-srl-consultas.appspot.com',
	messagingSenderId: '1010046766522',
	appId: '1:1010046766522:web:2461920bc7692a1ddca183',
	measurementId: 'G-2LV0DX7YKZ',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
