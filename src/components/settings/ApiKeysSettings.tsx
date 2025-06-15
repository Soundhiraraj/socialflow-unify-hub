
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SocialMediaAPI } from '@/services/social-media/api';
import { IntegrationSettingsManager, ApiKeys } from '@/services/social-media/integrationSettings';

export const ApiKeysSettings = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setApiKeys(IntegrationSettingsManager.getApiKeys());
  }, []);

  const handleInputChange = (platformId: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [platformId]: value }));
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    IntegrationSettingsManager.saveApiKeys(apiKeys);
    setIsLoading(false);
    toast({
      title: "Success",
      description: "API Keys saved successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys & Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Enter your API keys for each social media platform. These are stored locally in your browser and should only be for publishable keys.
        </p>
        <div className="space-y-4">
          {SocialMediaAPI.PLATFORMS.map(platform => (
            <div key={platform.id}>
              <Label htmlFor={`${platform.id}-apiKey`}>{platform.displayName} API Key</Label>
              <Input
                id={`${platform.id}-apiKey`}
                type="password"
                placeholder={`Enter ${platform.displayName} API Key`}
                value={apiKeys[platform.id] || ''}
                onChange={(e) => handleInputChange(platform.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSaveChanges} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save API Keys'}
        </Button>
      </CardContent>
    </Card>
  );
};
