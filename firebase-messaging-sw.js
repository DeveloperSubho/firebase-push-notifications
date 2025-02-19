importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCbf-srviMaqq7hhTFJq7q775xHNmdm3Kc",
  authDomain: "fir-push-notifications-a7941.firebaseapp.com",
  projectId: "fir-push-notifications-a7941",
  storageBucket: "fir-push-notifications-a7941.firebasestorage.app",
  messagingSenderId: "363199561924",
  appId: "1:363199561924:web:ef9fb4b3c659fca35bc991"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
