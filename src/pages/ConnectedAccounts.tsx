
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CheckCircle } from 'lucide-react';
import { SocialMediaAPI } from '@/services/social-media/api';
import { ConnectedAccountData } from '@/services/social-media/types';
import { OAuthModal } from '@/components/auth/OAuthModal';
import { useToast } from '@/hooks/use-toast';
import { AccountCard } from '@/components/accounts/AccountCard';

const ConnectedAccountsPage = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccountData[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [isOAuthModalOpen, setIsOAuthModalOpen] = useState(false);
  const [loadingDisconnect, setLoadingDisconnect] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadConnectedAccounts();
  }, []);

  const loadConnectedAccounts = () => {
    const accounts = SocialMediaAPI.getConnectedAccounts();
    setConnectedAccounts(accounts);
  };

  const handleConnectPlatform = (platform: any) => {
    setSelectedPlatform(platform);
    setIsOAuthModalOpen(true);
  };

  const handleOAuthSuccess = (account: ConnectedAccountData) => {
    loadConnectedAccounts();
    toast({
      title: "Account Connected",
      description: `Successfully connected ${account.displayName} to ${account.platform}!`
    });
  };

  const handleOAuthError = (error: string) => {
    toast({
      title: "Connection Failed",
      description: error,
      variant: "destructive"
    });
  };

  const handleDisconnect = async (platformId: string, accountName: string) => {
    setLoadingDisconnect(platformId);
    try {
      const success = await SocialMediaAPI.disconnectAccount(platformId);
      if (success) {
        loadConnectedAccounts();
        toast({
          title: "Account Disconnected",
          description: `Successfully disconnected ${accountName}`
        });
      } else {
        toast({
          title: "Disconnect Failed",
          description: "Unable to disconnect account",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while disconnecting",
        variant: "destructive"
      });
    } finally {
      setLoadingDisconnect(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onCreatePost={() => {}} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Connected Accounts
                </h1>
                <p className="text-gray-600">
                  Connect your social media accounts to manage them from one place
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SocialMediaAPI.PLATFORMS.map((platform) => {
                  const connectedAccount = connectedAccounts.find(acc => acc.platform === platform.id);
                  
                  return (
                    <AccountCard
                      key={platform.id}
                      platform={platform}
                      connectedAccount={connectedAccount}
                      onConnect={handleConnectPlatform}
                      onDisconnect={handleDisconnect}
                      loadingDisconnect={loadingDisconnect}
                    />
                  );
                })}
              </div>

              {connectedAccounts.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">
                        {connectedAccounts.length} Account{connectedAccounts.length !== 1 ? 's' : ''} Connected
                      </h3>
                      <p className="text-sm text-blue-700 mt-1">
                        You can now create and schedule posts across all your connected platforms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <OAuthModal
        isOpen={isOAuthModalOpen}
        onClose={() => setIsOAuthModalOpen(false)}
        platform={selectedPlatform}
        onSuccess={handleOAuthSuccess}
        onError={handleOAuthError}
      />
    </div>
  );
};

export default ConnectedAccountsPage;
