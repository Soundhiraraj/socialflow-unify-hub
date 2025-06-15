
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle } from 'lucide-react';
import { DataManager } from '@/utils/dataManager';
import { ConnectedAccount } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const ConnectedAccounts = () => {
  const [platforms, setPlatforms] = useState<ConnectedAccount[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const accounts = DataManager.getConnectedAccounts();
    setPlatforms(accounts);
  };

  const handleToggleConnection = (platformId: string, currentStatus: boolean) => {
    DataManager.updateAccountConnection(platformId, !currentStatus);
    loadAccounts();
    
    const action = !currentStatus ? 'connected' : 'disconnected';
    toast({
      title: "Success",
      description: `Account ${action} successfully!`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Connected Accounts
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{platform.avatar}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{platform.name}</span>
                  {platform.connected && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {platform.connected ? `${platform.followers} followers` : 'Not connected'}
                </span>
              </div>
            </div>
            <Button
              variant={platform.connected ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleToggleConnection(platform.id, platform.connected)}
            >
              {platform.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
