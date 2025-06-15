
import React from 'react';
import { Loader2, Shield } from 'lucide-react';
import { SocialPlatform } from '@/services/social-media/types';

interface AuthenticatingStepProps {
  platform: SocialPlatform;
}

export const AuthenticatingStep: React.FC<AuthenticatingStepProps> = ({ platform }) => (
  <div className="text-center space-y-6 py-8">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${platform?.color} text-white text-2xl mb-4`}>
      {platform?.icon}
    </div>
    <div className="space-y-3">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
      <h3 className="text-lg font-semibold">Connecting to {platform?.displayName}</h3>
      <p className="text-gray-600 text-sm">
        Please wait while we establish a secure connection...
      </p>
    </div>
    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
      <Shield className="w-4 h-4" />
      <span>Encrypted connection in progress</span>
    </div>
  </div>
);
