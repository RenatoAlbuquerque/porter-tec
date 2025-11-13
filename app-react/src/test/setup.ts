import "@testing-library/jest-dom";

const _store: Record<string, string> = {};

const localStorageMock = {
  getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(_store, key) ? _store[key] : null;
  },
  setItem(key: string, value: string) {
    _store[key] = String(value);
  },
  removeItem(key: string) {
    delete _store[key];
  },
  clear() {
    Object.keys(_store).forEach((k) => delete _store[k]);
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

(globalThis as any).simulateStorageEvent = function simulateStorageEvent(
  key: string,
  oldValue: string | null,
  newValue: string | null
): void {
  const evt = new StorageEvent("storage", {
    key,
    oldValue,
    newValue,
    url: "http://localhost",
    storageArea: globalThis.localStorage,
  } as any);
  globalThis.dispatchEvent(evt);
};
