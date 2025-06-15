
import { LocalStorageManager } from '@/utils/localStorage';

export interface SocialPlatform {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  color: string;
  authUrl: string;
  scopes: string[];
}

export interface ConnectedAccountData {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  profilePicture: string;
  followers: number;
  isVerified: boolean;
  accessToken: string; // Simulated token
  refreshToken: string; // Simulated token
  expiresAt: string;
  connectedAt: string;
}

export interface AuthResponse {
  success: boolean;
  account?: ConnectedAccountData;
  error?: string;
}

export class SocialMediaAPI {
  private static readonly CONNECTED_ACCOUNTS_KEY = 'connected_social_accounts';
  private static readonly AUTH_STATE_KEY = 'auth_state';

  static readonly PLATFORMS: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'instagram',
      displayName: 'Instagram',
      icon: '📷',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      authUrl: 'https://api.instagram.com/oauth/authorize',
      scopes: ['user_profile', 'user_media']
    },
    {
      id: 'facebook',
      name: 'facebook',
      displayName: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      scopes: ['pages_manage_posts', 'pages_read_engagement']
    },
    {
      id: 'twitter',
      name: 'twitter',
      displayName: 'X (Twitter)',
      icon: '🐦',
      color: 'bg-black',
      authUrl: 'https://twitter.com/i/oauth2/authorize',
      scopes: ['tweet.read', 'tweet.write', 'users.read']
    },
    {
      id: 'linkedin',
      name: 'linkedin',
      displayName: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      scopes: ['r_liteprofile', 'w_member_social']
    }
  ];

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

    const mockAccountData = this.generateMockAccountData(platformId, platform.displayName);
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

  private static generateMockAccountData(platformId: string, platformName: string): ConnectedAccountData {
    const usernames = {
      instagram: ['@creative_studio', '@brand_official', '@marketing_pro', '@content_creator'],
      facebook: ['Creative Studio Page', 'Brand Official', 'Marketing Pro', 'Content Creator'],
      twitter: ['@creative_studio', '@brand_official', '@marketing_pro', '@content_creator'],
      linkedin: ['Creative Studio', 'Brand Official', 'Marketing Professional', 'Content Creator']
    };

    const displayNames = {
      instagram: ['Creative Studio', 'Brand Official', 'Marketing Pro', 'Content Creator'],
      facebook: ['Creative Studio', 'Brand Official', 'Marketing Pro', 'Content Creator'],
      twitter: ['Creative Studio', 'Brand Official', 'Marketing Pro', 'Content Creator'],
      linkedin: ['Creative Studio', 'Brand Official', 'Marketing Professional', 'Content Creator']
    };

    const randomIndex = Math.floor(Math.random() * 4);
    const followersCount = Math.floor(Math.random() * 50000) + 1000;

    return {
      id: `${platformId}_${Date.now()}`,
      platform: platformId,
      username: usernames[platformId as keyof typeof usernames][randomIndex],
      displayName: displayNames[platformId as keyof typeof displayNames][randomIndex],
      profilePicture: '/placeholder.svg',
      followers: followersCount,
      isVerified: Math.random() > 0.7,
      accessToken: `${platformId}_access_${Math.random().toString(36).substring(2)}`,
      refreshToken: `${platformId}_refresh_${Math.random().toString(36).substring(2)}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      connectedAt: new Date().toISOString()
    };
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
