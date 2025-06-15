
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle } from 'lucide-react';

export const ConnectedAccounts = () => {
  const platforms = [
    { name: 'Instagram', connected: true, followers: '12.4K', avatar: '📷' },
    { name: 'Facebook', connected: true, followers: '8.2K', avatar: '📘' },
    { name: 'Twitter/X', connected: false, followers: '0', avatar: '🐦' },
    { name: 'LinkedIn', connected: false, followers: '0', avatar: '💼' },
  ];

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
        {platforms.map((platform, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
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
            <Badge variant={platform.connected ? "secondary" : "outline"}>
              {platform.connected ? 'Connected' : 'Connect'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
