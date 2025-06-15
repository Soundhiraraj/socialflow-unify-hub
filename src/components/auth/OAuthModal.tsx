
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SocialMediaAPI } from '@/services/social-media/api';
import { SocialPlatform, AuthResponse } from '@/services/social-media/types';
import { PermissionsStep } from './oauth/PermissionsStep';
import { AuthenticatingStep } from './oauth/AuthenticatingStep';
import { SuccessStep } from './oauth/SuccessStep';
import { ErrorStep } from './oauth/ErrorStep';

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

  const renderCurrentStep = () => {
    if (!platform) return null;

    switch (currentStep) {
      case 'permissions':
        return <PermissionsStep platform={platform} onClose={onClose} onConnect={handleConnect} isLoading={isLoading} />;
      case 'authenticating':
        return <AuthenticatingStep platform={platform} />;
      case 'success':
        return <SuccessStep platform={platform} authResult={authResult} />;
      case 'error':
        return <ErrorStep authResult={authResult} onClose={onClose} onTryAgain={handleConnect} />;
      default:
        return <PermissionsStep platform={platform} onClose={onClose} onConnect={handleConnect} isLoading={isLoading} />;
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
