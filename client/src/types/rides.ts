// client/src/types/rides.ts
export interface RideEntry {
  id: string;
  file: string;
  date: string; // YYYY-MM-DD
  label: string;
  color: string;
  source: 'komoot' | 'timeline';
  inferred: boolean;
  videoUrl: string | null;
}
