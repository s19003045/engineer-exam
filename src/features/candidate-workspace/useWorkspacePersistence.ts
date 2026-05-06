import { saveSnapshot, loadSnapshot } from "../../lib/persistence/autosave";

const KEY = "candidate-workspace";
const TS_KEY = "candidate-workspace-last-saved";

export function persistWorkspace(state: unknown): void {
  saveSnapshot(KEY, state);
  localStorage.setItem(TS_KEY, new Date().toISOString());
}

export function restoreWorkspace<T>(): T | null {
  return loadSnapshot<T>(KEY);
}

export function getLastSavedAt(): string | null {
  return localStorage.getItem(TS_KEY);
}
