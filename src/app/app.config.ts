import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyA5rspTiDpwZpK2QqAuTbbR94m86VMtWmQ",
  authDomain: "rectores-fdb9e.firebaseapp.com",
  projectId: "rectores-fdb9e",
  storageBucket: "rectores-fdb9e.firebasestorage.app",
  messagingSenderId: "527477553227",
  appId: "1:527477553227:web:ba46ebd41ccbd4bfd7b5ce",
  measurementId: "G-DXKDH4EQHC"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};