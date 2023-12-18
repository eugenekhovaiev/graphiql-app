import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAx7c_WKRpxIHzLIdS8O4JpmWWmwg0pcN8',
  authDomain: 'graphiql-a1fc6.firebaseapp.com',
  projectId: 'graphiql-a1fc6',
  storageBucket: 'graphiql-a1fc6.appspot.com',
  messagingSenderId: '193607643071',
  appId: '1:193607643071:web:7e7a85ad88a9cb399ffb0a',
  measurementId: 'G-BRDLG8T29K',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
