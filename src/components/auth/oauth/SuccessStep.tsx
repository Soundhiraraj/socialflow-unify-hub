
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users } from 'lucide-react';
import { SocialPlatform, AuthResponse } from '@/services/socialMediaAPI';

interface SuccessStepProps {
  platform: SocialPlatform;
  authResult: AuthResponse | null;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ platform, authResult }) => (
  <div className="text-center space-y-6 py-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
      <CheckCircle className="w-8 h-8" />
    </div>
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-green-700">Successfully Connected!</h3>
      {authResult?.account && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg">{platform?.icon}</span>
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{authResult.account.displayName}</span>
                {authResult.account.isVerified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
              </div>
              <span className="text-sm text-gray-600">{authResult.account.username}</span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{authResult.account.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="text-gray-600 text-sm">
        You can now post and manage content on {platform?.displayName}.
      </p>
    </div>
  </div>
);
