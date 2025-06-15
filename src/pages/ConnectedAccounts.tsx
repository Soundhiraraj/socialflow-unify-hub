
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Users, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { SocialMediaAPI, ConnectedAccountData } from '@/services/socialMediaAPI';
import { OAuthModal } from '@/components/auth/OAuthModal';
import { useToast } from '@/hooks/use-toast';

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

  const isTokenExpiringSoon = (expiresAt: string) => {
    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return expiryTime - now < oneHour;
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
                  const isConnected = !!connectedAccount;
                  const isExpiringSoon = connectedAccount && isTokenExpiringSoon(connectedAccount.expiresAt);

                  return (
                    <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center text-white text-xl`}>
                              {platform.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{platform.displayName}</CardTitle>
                              {isConnected && connectedAccount ? (
                                <p className="text-sm text-gray-600">{connectedAccount.username}</p>
                              ) : (
                                <p className="text-sm text-gray-500">Not connected</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isExpiringSoon && (
                              <AlertCircle className="w-4 h-4 text-amber-500" title="Token expiring soon" />
                            )}
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isConnected && connectedAccount ? (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center text-sm text-gray-600 space-x-3">
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {formatFollowerCount(connectedAccount.followers)} followers
                                </div>
                                {connectedAccount.isVerified && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-4">
                              Connected on {new Date(connectedAccount.connectedAt).toLocaleDateString()}
                            </div>

                            {isExpiringSoon && (
                              <div className="flex items-center text-xs text-amber-600 mb-3 p-2 bg-amber-50 rounded">
                                <Clock className="w-3 h-3 mr-1" />
                                Authentication expires soon
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Settings className="w-4 h-4 mr-1" />
                                Settings
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDisconnect(platform.id, connectedAccount.displayName)}
                                disabled={loadingDisconnect === platform.id}
                              >
                                {loadingDisconnect === platform.id ? 'Disconnecting...' : 'Disconnect'}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Connect your {platform.displayName} account to start posting and managing your content.
                            </p>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleConnectPlatform(platform)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Connect Account
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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
