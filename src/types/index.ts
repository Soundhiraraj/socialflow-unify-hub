
export interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime?: string;
  status: 'published' | 'scheduled' | 'draft';
  createdAt: string;
  publishedAt?: string;
  mediaUrls?: string[];
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  url: string;
  uploadedAt: string;
}

export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

export interface ConnectedAccount {
  id: string;
  platform: string;
  name: string;
  connected: boolean;
  followers: string;
  avatar: string;
}
