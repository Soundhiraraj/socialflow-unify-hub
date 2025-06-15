
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, ExternalLink, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';
import { SocialPlatform, ConnectedAccountData } from '@/services/socialMediaAPI';
import { formatFollowerCount } from '@/utils/formatters';

interface AccountCardProps {
  platform: SocialPlatform;
  connectedAccount: ConnectedAccountData | undefined;
  loadingDisconnect: string | null;
  onConnect: (platform: SocialPlatform) => void;
  onDisconnect: (platformId: string, accountName: string) => void;
}

const isTokenExpiringSoon = (expiresAt: string) => {
  const expiryTime = new Date(expiresAt).getTime();
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  return expiryTime - now < oneHour;
};

export const AccountCard: React.FC<AccountCardProps> = ({
  platform,
  connectedAccount,
  loadingDisconnect,
  onConnect,
  onDisconnect,
}) => {
  const isConnected = !!connectedAccount;
  const isExpiringSoon = connectedAccount && isTokenExpiringSoon(connectedAccount.expiresAt);

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
              <span title="Token expiring soon">
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </span>
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
                onClick={() => onDisconnect(platform.id, connectedAccount.displayName)}
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
              onClick={() => onConnect(platform)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Connect Account
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
