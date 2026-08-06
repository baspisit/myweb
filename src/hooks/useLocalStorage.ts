import { useState } from 'react';
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });
  const update = (next: T) => { localStorage.setItem(key, JSON.stringify(next)); setValue(next); };
  return [value, update] as const;
}
