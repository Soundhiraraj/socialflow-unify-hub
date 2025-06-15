
import { LocalStorageManager } from '@/utils/localStorage';

export type ApiKeys = {
  [platformId: string]: string;
}

const API_KEYS_STORAGE_KEY = 'social_media_api_keys';

// You can update the default API keys here.
// These will be used if no keys are saved in the browser's local storage.
const defaultApiKeys: ApiKeys = {
  twitter: '',
  facebook: '',
  instagram: '',
  linkedin: '',
};

export class IntegrationSettingsManager {
  static getApiKeys(): ApiKeys {
    const storedKeys = LocalStorageManager.getItem<ApiKeys>(API_KEYS_STORAGE_KEY) || {};
    return { ...defaultApiKeys, ...storedKeys };
  }

  static saveApiKeys(apiKeys: ApiKeys): void {
    LocalStorageManager.setItem(API_KEYS_STORAGE_KEY, apiKeys);
  }
}
