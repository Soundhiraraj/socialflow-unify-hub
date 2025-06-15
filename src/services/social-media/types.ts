
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
