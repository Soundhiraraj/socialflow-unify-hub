
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle } from 'lucide-react';
import { SocialPlatform } from '@/services/socialMediaAPI';

interface PermissionsStepProps {
  platform: SocialPlatform;
  onClose: () => void;
  onConnect: () => void;
  isLoading: boolean;
}

const getScopeDescription = (scope: string): string => {
  const descriptions: Record<string, string> = {
    'user_profile': 'Access your basic profile information',
    'user_media': 'View your photos and videos',
    'pages_manage_posts': 'Create and manage posts on your pages',
    'pages_read_engagement': 'View engagement metrics on your pages',
    'tweet.read': 'Read your tweets and timeline',
    'tweet.write': 'Post tweets on your behalf',
    'users.read': 'Access your profile information',
    'r_liteprofile': 'Access your basic LinkedIn profile',
    'w_member_social': 'Share content on your behalf'
  };
  return descriptions[scope] || scope;
};

export const PermissionsStep: React.FC<PermissionsStepProps> = ({ platform, onClose, onConnect, isLoading }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${platform?.color} text-white text-2xl mb-4`}>
        {platform?.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">Connect to {platform?.displayName}</h3>
      <p className="text-gray-600 text-sm">
        This will allow you to manage your {platform?.displayName} content from this app.
      </p>
    </div>

    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center mb-3">
        <Shield className="w-5 h-5 text-blue-600 mr-2" />
        <span className="font-medium text-gray-900">Permissions Required</span>
      </div>
      <div className="space-y-2">
        {platform?.scopes.map((scope) => (
          <div key={scope} className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{getScopeDescription(scope)}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
      <Shield className="w-4 h-4" />
      <span>Your data is encrypted and secure</span>
    </div>

    <div className="flex space-x-3">
      <Button variant="outline" onClick={onClose} className="flex-1">
        Cancel
      </Button>
      <Button onClick={onConnect} className="flex-1" disabled={isLoading}>
        Connect Account
      </Button>
    </div>
  </div>
);
