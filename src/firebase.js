import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCbf-srviMaqq7hhTFJq7q775xHNmdm3Kc",
  authDomain: "fir-push-notifications-a7941.firebaseapp.com",
  projectId: "fir-push-notifications-a7941",
  storageBucket: "fir-push-notifications-a7941.firebasestorage.app",
  messagingSenderId: "363199561924",
  appId: "1:363199561924:web:ef9fb4b3c659fca35bc991"
};

const isLocalhost = window.location.hostname === "localhost";
const repoName = "firebase-push-notifications"; // Your GitHub repo name

const swPath = isLocalhost
  ? "/firebase-messaging-sw.js" // Localhost path
  : `/${repoName}/firebase-messaging-sw.js`; // GitHub Pages path

console.log('*** Environment ***', process.env.REACT_APP_ENV)
console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(swPath, {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: 'BAJy-JyCTgNVXQShNtL-lJwo3TqgjjkWvHLtRiD_DM8Sel3K1J2g7g_-bNwTS5uvJt2pDrqcMt27FqpaTMniK48', serviceWorkerRegistration })
        .then((currentToken) => {
          console.log('Current token for client: ', currentToken);
        })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
