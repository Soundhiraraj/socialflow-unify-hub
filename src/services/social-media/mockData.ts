
import { ConnectedAccountData } from './types';

export const generateMockAccountData = (platformId: string, platformName: string): ConnectedAccountData => {
  const usernames: Record<string, string[]> = {
    instagram: ['@creative_studio', '@brand_official', '@marketing_pro', '@content_creator'],
    facebook: ['Creative Studio Page', 'Brand Official', 'Marketing Pro', 'Content Creator'],
    twitter: ['@creative_studio', '@brand_official', '@marketing_pro', '@content_creator'],
    linkedin: ['Creative Studio', 'Brand Official', 'Marketing Professional', 'Content Creator']
  };

  const displayNames: Record<string, string[]> = {
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
    username: usernames[platformId][randomIndex],
    displayName: displayNames[platformId][randomIndex],
    profilePicture: '/placeholder.svg',
    followers: followersCount,
    isVerified: Math.random() > 0.7,
    accessToken: `${platformId}_access_${Math.random().toString(36).substring(2)}`,
    refreshToken: `${platformId}_refresh_${Math.random().toString(36).substring(2)}`,
    expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    connectedAt: new Date().toISOString()
  };
}
