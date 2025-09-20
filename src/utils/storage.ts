import type { FileHistory } from "../types/editor";

const STORAGE_KEY = "osu-editor-file-history";
const MAX_HISTORY = 10;

export function getFileHistory(): FileHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToFileHistory(filePath: string): void {
  try {
    const history = getFileHistory();
    const filename = filePath.split(/[\\/]/).pop() || filePath;

    // Remove existing entry if it exists
    const filteredHistory = history.filter(
      (item) => item.absolutePath !== filePath,
    );

    // Add new entry at the beginning
    const newEntry: FileHistory = {
      absolutePath: filePath,
      filename,
      lastOpened: Date.now(),
    };

    const updatedHistory = [newEntry, ...filteredHistory].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function removeFromFileHistory(filePath: string): void {
  try {
    const history = getFileHistory();
    const filteredHistory = history.filter(
      (item) => item.absolutePath !== filePath,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch {
    // Silently fail if localStorage is not available
  }
}
