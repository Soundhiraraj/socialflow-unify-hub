
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle, Users, Settings } from 'lucide-react';
import { SocialMediaAPI, ConnectedAccountData } from '@/services/socialMediaAPI';
import { OAuthModal } from '@/components/auth/OAuthModal';
import { useToast } from '@/hooks/use-toast';

export const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccountData[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [isOAuthModalOpen, setIsOAuthModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const accounts = SocialMediaAPI.getConnectedAccounts();
    setConnectedAccounts(accounts);
  };

  const handleConnectPlatform = () => {
    // For the dashboard widget, we'll connect to Instagram by default
    const instagramPlatform = SocialMediaAPI.getPlatformById('instagram');
    if (instagramPlatform && !SocialMediaAPI.isConnected('instagram')) {
      setSelectedPlatform(instagramPlatform);
      setIsOAuthModalOpen(true);
    }
  };

  const handleOAuthSuccess = (account: ConnectedAccountData) => {
    loadAccounts();
    toast({
      title: "Account Connected",
      description: `Successfully connected ${account.displayName}!`
    });
  };

  const handleOAuthError = (error: string) => {
    toast({
      title: "Connection Failed",
      description: error,
      variant: "destructive"
    });
  };

  const formatFollowerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Connected Accounts
            <Button variant="outline" size="sm" onClick={handleConnectPlatform}>
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedAccounts.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-gray-400 mb-2">
                <Users className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600 text-sm mb-4">No accounts connected yet</p>
              <Button size="sm" onClick={handleConnectPlatform}>
                <Plus className="w-4 h-4 mr-2" />
                Connect Your First Account
              </Button>
            </div>
          ) : (
            connectedAccounts.map((account) => {
              const platform = SocialMediaAPI.getPlatformById(account.platform);
              return (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${platform?.color} flex items-center justify-center text-white`}>
                      {platform?.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{account.displayName}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {account.isVerified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{account.username}</span>
                        <span>•</span>
                        <span>{formatFollowerCount(account.followers)} followers</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <OAuthModal
        isOpen={isOAuthModalOpen}
        onClose={() => setIsOAuthModalOpen(false)}
        platform={selectedPlatform}
        onSuccess={handleOAuthSuccess}
        onError={handleOAuthError}
      />
    </>
  );
};
