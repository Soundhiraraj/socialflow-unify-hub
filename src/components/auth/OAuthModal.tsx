
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Shield, Eye, Users, MessageSquare } from 'lucide-react';
import { SocialMediaAPI, SocialPlatform, AuthResponse } from '@/services/socialMediaAPI';

interface OAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: SocialPlatform | null;
  onSuccess: (account: any) => void;
  onError: (error: string) => void;
}

type AuthStep = 'permissions' | 'authenticating' | 'success' | 'error';

export const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen,
  onClose,
  platform,
  onSuccess,
  onError
}) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('permissions');
  const [authResult, setAuthResult] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && platform) {
      setCurrentStep('permissions');
      setAuthResult(null);
      setIsLoading(false);
    }
  }, [isOpen, platform]);

  const handleConnect = async () => {
    if (!platform) return;

    setIsLoading(true);
    setCurrentStep('authenticating');

    try {
      // Simulate OAuth initiation
      const { state } = await SocialMediaAPI.initiateOAuth(platform.id);
      
      // Simulate the OAuth callback with a random authorization code
      const authCode = Math.random().toString(36).substring(2, 15);
      const result = await SocialMediaAPI.simulateOAuthCallback(platform.id, authCode, state);
      
      setAuthResult(result);
      
      if (result.success && result.account) {
        setCurrentStep('success');
        setTimeout(() => {
          onSuccess(result.account);
          onClose();
        }, 2000);
      } else {
        setCurrentStep('error');
        if (result.error) {
          onError(result.error);
        }
      }
    } catch (error) {
      setCurrentStep('error');
      setAuthResult({ success: false, error: 'Connection failed' });
      onError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

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

  const renderPermissionsStep = () => (
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
        <Button onClick={handleConnect} className="flex-1" disabled={isLoading}>
          Connect Account
        </Button>
      </div>
    </div>
  );

  const renderAuthenticatingStep = () => (
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

  const renderSuccessStep = () => (
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

  const renderErrorStep = () => (
    <div className="text-center space-y-6 py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
        <XCircle className="w-8 h-8" />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-red-700">Connection Failed</h3>
        <p className="text-gray-600 text-sm">
          {authResult?.error || 'Unable to connect to your account. Please try again.'}
        </p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>
        <Button onClick={handleConnect} className="flex-1">
          Try Again
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'permissions':
        return renderPermissionsStep();
      case 'authenticating':
        return renderAuthenticatingStep();
      case 'success':
        return renderSuccessStep();
      case 'error':
        return renderErrorStep();
      default:
        return renderPermissionsStep();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Connect {platform?.displayName} Account
          </DialogTitle>
        </DialogHeader>
        {renderCurrentStep()}
      </DialogContent>
    </Dialog>
  );
};
