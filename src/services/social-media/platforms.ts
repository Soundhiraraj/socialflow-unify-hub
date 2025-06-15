
import { SocialPlatform } from './types';

export const PLATFORMS: SocialPlatform[] = [
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
