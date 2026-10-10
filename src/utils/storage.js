// Safe localStorage wrapper with memory fallback
const memoryStorage = {};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  } catch (e) {
    return memoryStorage[key] !== undefined ? memoryStorage[key] : defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    memoryStorage[key] = value;
  }
};

export const removeStorageItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    delete memoryStorage[key];
  }
};
