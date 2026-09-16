// src/types/global.d.ts or src/globals.d.ts
declare global {
  interface Window {
    google: any; // Or a more specific type if you know it
  }
}