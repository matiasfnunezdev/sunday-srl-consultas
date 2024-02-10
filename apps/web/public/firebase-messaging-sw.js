/* eslint-disable func-names -- N/A */
/* eslint-disable no-undef -- N/A */
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: "AIzaSyDiPuQ03xUH_dj35KGnkZcrAm0eIlD0uq4",
  authDomain: "sunday-srl-consultas.firebaseapp.com",
  databaseURL: "https://sunday-srl-consultas-default-rtdb.firebaseio.com",
  projectId: "sunday-srl-consultas",
  storageBucket: "sunday-srl-consultas.appspot.com",
  messagingSenderId: "1010046766522",
  appId: "1:1010046766522:web:2461920bc7692a1ddca183",
  measurementId: "G-2LV0DX7YKZ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) { 
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  // Use Clients API to navigate or open the URL

  self.clients
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then((clientList) => {
      if (clientList.length > 0) {
        const client = clientList[0];
        client.postMessage({
          type: 'FCM_MESSAGE',
          payload,
        });
      }
    });
});
