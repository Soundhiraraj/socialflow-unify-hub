
import { LocalStorageManager } from '@/utils/localStorage';
import { SocialPlatform, ConnectedAccountData, AuthResponse } from './types';
import { PLATFORMS } from './platforms';
import { generateMockAccountData } from './mockData';

export class SocialMediaAPI {
  private static readonly CONNECTED_ACCOUNTS_KEY = 'connected_social_accounts';
  private static readonly AUTH_STATE_KEY = 'auth_state';

  static readonly PLATFORMS: SocialPlatform[] = PLATFORMS;

  static getConnectedAccounts(): ConnectedAccountData[] {
    return LocalStorageManager.getItem<ConnectedAccountData[]>(this.CONNECTED_ACCOUNTS_KEY) || [];
  }

  static saveConnectedAccounts(accounts: ConnectedAccountData[]): void {
    LocalStorageManager.setItem(this.CONNECTED_ACCOUNTS_KEY, accounts);
  }

  static getPlatformById(platformId: string): SocialPlatform | undefined {
    return this.PLATFORMS.find(p => p.id === platformId);
  }

  static isConnected(platformId: string): boolean {
    const accounts = this.getConnectedAccounts();
    return accounts.some(account => account.platform === platformId);
  }

  static getConnectedAccount(platformId: string): ConnectedAccountData | undefined {
    const accounts = this.getConnectedAccounts();
    return accounts.find(account => account.platform === platformId);
  }

  static async initiateOAuth(platformId: string): Promise<{ authUrl: string; state: string }> {
    const platform = this.getPlatformById(platformId);
    if (!platform) {
      throw new Error('Platform not found');
    }

    // Generate a random state for security simulation
    const state = Math.random().toString(36).substring(2, 15);
    
    // Store auth state
    LocalStorageManager.setItem(this.AUTH_STATE_KEY, { 
      platform: platformId, 
      state, 
      timestamp: Date.now() 
    });

    // Simulate OAuth URL with parameters
    const params = new URLSearchParams({
      client_id: `${platformId}_client_id_simulation`,
      redirect_uri: `${window.location.origin}/auth/callback`,
      scope: platform.scopes.join(' '),
      response_type: 'code',
      state: state
    });

    return {
      authUrl: `${platform.authUrl}?${params.toString()}`,
      state
    };
  }

  static async simulateOAuthCallback(platformId: string, code: string, state: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Verify state (in real implementation, this would be crucial for security)
    const storedAuthState = LocalStorageManager.getItem<any>(this.AUTH_STATE_KEY);
    if (!storedAuthState || storedAuthState.state !== state || storedAuthState.platform !== platformId) {
      return { success: false, error: 'Invalid auth state' };
    }

    // Clean up auth state
    LocalStorageManager.removeItem(this.AUTH_STATE_KEY);

    // Simulate random success/failure (90% success rate)
    if (Math.random() < 0.1) {
      const errors = [
        'User denied access',
        'Invalid credentials',
        'Rate limit exceeded',
        'Temporary service unavailable'
      ];
      return { 
        success: false, 
        error: errors[Math.floor(Math.random() * errors.length)] 
      };
    }

    // Generate realistic account data
    const platform = this.getPlatformById(platformId);
    if (!platform) {
      return { success: false, error: 'Platform not found' };
    }

    const mockAccountData = generateMockAccountData(platformId, platform.displayName);
    const accounts = this.getConnectedAccounts();
    
    // Remove existing account for this platform
    const filteredAccounts = accounts.filter(acc => acc.platform !== platformId);
    filteredAccounts.push(mockAccountData);
    
    this.saveConnectedAccounts(filteredAccounts);

    return { success: true, account: mockAccountData };
  }

  static async disconnectAccount(platformId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    const accounts = this.getConnectedAccounts();
    const filteredAccounts = accounts.filter(acc => acc.platform !== platformId);
    
    if (filteredAccounts.length === accounts.length) {
      return false; // Account wasn't connected
    }

    this.saveConnectedAccounts(filteredAccounts);
    return true;
  }

  static async refreshToken(platformId: string): Promise<boolean> {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const accounts = this.getConnectedAccounts();
    const account = accounts.find(acc => acc.platform === platformId);
    
    if (!account) return false;

    // Update tokens and expiry
    account.accessToken = `${platformId}_access_${Math.random().toString(36).substring(2)}`;
    account.refreshToken = `${platformId}_refresh_${Math.random().toString(36).substring(2)}`;
    account.expiresAt = new Date(Date.now() + 3600000).toISOString();

    this.saveConnectedAccounts(accounts);
    return true;
  }
}
