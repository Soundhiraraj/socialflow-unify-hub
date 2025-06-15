
interface StorageItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // in milliseconds
}

export class LocalStorageManager {
  private static readonly ONE_DAY_MS = 24 * 60 * 60 * 1000;

  static setItem<T>(key: string, data: T, expiresIn: number = this.ONE_DAY_MS): void {
    const item: StorageItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);
      const now = Date.now();
      
      // Check if item has expired
      if (now - parsedItem.timestamp > parsedItem.expiresIn) {
        localStorage.removeItem(key);
        return null;
      }

      return parsedItem.data;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clearExpired(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const parsedItem: StorageItem<any> = JSON.parse(item);
          const now = Date.now();
          
          if (now - parsedItem.timestamp > parsedItem.expiresIn) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        // If parsing fails, it might not be our format, skip it
      }
    });
  }

  static clearAll(): void {
    localStorage.clear();
  }
}
