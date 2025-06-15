
import { LocalStorageManager } from './localStorage';
import { Post, MediaItem, UserSettings, ConnectedAccount } from '../types';

export class DataManager {
  private static readonly POSTS_KEY = 'social_media_posts';
  private static readonly MEDIA_KEY = 'social_media_media';
  private static readonly SETTINGS_KEY = 'user_settings';
  private static readonly ACCOUNTS_KEY = 'connected_accounts';

  // Posts Management
  static getPosts(): Post[] {
    return LocalStorageManager.getItem<Post[]>(this.POSTS_KEY) || [];
  }

  static savePosts(posts: Post[]): void {
    LocalStorageManager.setItem(this.POSTS_KEY, posts);
  }

  static addPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      publishedAt: post.status === 'published' ? new Date().toISOString() : undefined
    };
    posts.push(newPost);
    this.savePosts(posts);
    return newPost;
  }

  static updatePost(id: string, updates: Partial<Post>): Post | null {
    const posts = this.getPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updates };
    this.savePosts(posts);
    return posts[index];
  }

  static deletePost(id: string): boolean {
    const posts = this.getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    if (filteredPosts.length === posts.length) return false;
    
    this.savePosts(filteredPosts);
    return true;
  }

  static getPostsByStatus(status: Post['status']): Post[] {
    return this.getPosts().filter(post => post.status === status);
  }

  // Media Management
  static getMedia(): MediaItem[] {
    return LocalStorageManager.getItem<MediaItem[]>(this.MEDIA_KEY) || [];
  }

  static saveMedia(media: MediaItem[]): void {
    LocalStorageManager.setItem(this.MEDIA_KEY, media);
  }

  static addMediaItem(media: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const mediaItems = this.getMedia();
    const newMedia: MediaItem = {
      ...media,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    mediaItems.push(newMedia);
    this.saveMedia(mediaItems);
    return newMedia;
  }

  static deleteMediaItem(id: string): boolean {
    const mediaItems = this.getMedia();
    const filteredMedia = mediaItems.filter(item => item.id !== id);
    if (filteredMedia.length === mediaItems.length) return false;
    
    this.saveMedia(filteredMedia);
    return true;
  }

  // Settings Management
  static getSettings(): UserSettings {
    return LocalStorageManager.getItem<UserSettings>(this.SETTINGS_KEY) || {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      notifications: {
        email: true,
        push: false,
        marketing: true
      }
    };
  }

  static saveSettings(settings: UserSettings): void {
    LocalStorageManager.setItem(this.SETTINGS_KEY, settings);
  }

  // Connected Accounts Management
  static getConnectedAccounts(): ConnectedAccount[] {
    return LocalStorageManager.getItem<ConnectedAccount[]>(this.ACCOUNTS_KEY) || [
      { id: '1', platform: 'Instagram', name: 'Instagram', connected: true, followers: '12.4K', avatar: '📷' },
      { id: '2', platform: 'Facebook', name: 'Facebook', connected: true, followers: '8.2K', avatar: '📘' },
      { id: '3', platform: 'Twitter', name: 'Twitter/X', connected: false, followers: '0', avatar: '🐦' },
      { id: '4', platform: 'LinkedIn', name: 'LinkedIn', connected: false, followers: '0', avatar: '💼' },
    ];
  }

  static saveConnectedAccounts(accounts: ConnectedAccount[]): void {
    LocalStorageManager.setItem(this.ACCOUNTS_KEY, accounts);
  }

  static updateAccountConnection(platformId: string, connected: boolean): void {
    const accounts = this.getConnectedAccounts();
    const account = accounts.find(acc => acc.id === platformId);
    if (account) {
      account.connected = connected;
      this.saveConnectedAccounts(accounts);
    }
  }

  // Utility Methods
  static initializeData(): void {
    // Initialize with sample data if no data exists
    if (this.getPosts().length === 0) {
      const samplePosts: Omit<Post, 'id' | 'createdAt'>[] = [
        {
          content: "Excited to share our latest product update! 🚀",
          platforms: ['Instagram', 'Facebook'],
          scheduledTime: "2025-06-16T10:00:00",
          status: 'scheduled'
        },
        {
          content: "Join us for our webinar next week about social media trends",
          platforms: ['LinkedIn', 'Twitter'],
          scheduledTime: "2025-06-17T14:00:00",
          status: 'scheduled'
        },
        {
          content: "Draft post about our new feature...",
          platforms: [],
          status: 'draft'
        },
        {
          content: "Just published our monthly newsletter! Check it out 📧",
          platforms: ['Instagram', 'Facebook', 'LinkedIn'],
          status: 'published'
        }
      ];

      samplePosts.forEach(post => this.addPost(post));
    }

    if (this.getMedia().length === 0) {
      const sampleMedia: Omit<MediaItem, 'id' | 'uploadedAt'>[] = [
        { name: 'product-shot-1.jpg', type: 'image', size: '2.4 MB', url: '/placeholder.svg' },
        { name: 'demo-video.mp4', type: 'video', size: '15.8 MB', url: '/placeholder.svg' },
        { name: 'team-photo.jpg', type: 'image', size: '3.1 MB', url: '/placeholder.svg' },
      ];

      sampleMedia.forEach(media => this.addMediaItem(media));
    }
  }

  static clearAllData(): void {
    LocalStorageManager.clearAll();
  }

  static clearExpiredData(): void {
    LocalStorageManager.clearExpired();
  }
}

// Initialize data on first load
if (typeof window !== 'undefined') {
  DataManager.initializeData();
  
  // Set up periodic cleanup every hour
  setInterval(() => {
    DataManager.clearExpiredData();
  }, 60 * 60 * 1000);
}
