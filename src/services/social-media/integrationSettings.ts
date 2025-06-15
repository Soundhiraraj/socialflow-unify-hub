
import { LocalStorageManager } from '@/utils/localStorage';

export type ApiKeys = {
  [platformId: string]: string;
}

const API_KEYS_STORAGE_KEY = 'social_media_api_keys';

export class IntegrationSettingsManager {
  static getApiKeys(): ApiKeys {
    return LocalStorageManager.getItem<ApiKeys>(API_KEYS_STORAGE_KEY) || {};
  }

  static saveApiKeys(apiKeys: ApiKeys): void {
    LocalStorageManager.setItem(API_KEYS_STORAGE_KEY, apiKeys);
  }
}
