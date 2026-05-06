export function saveSnapshot(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadSnapshot<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
