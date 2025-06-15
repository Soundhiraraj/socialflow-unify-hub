
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { DataManager } from '@/utils/dataManager';
import { UserSettings } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ApiKeysSettings } from '@/components/settings/ApiKeysSettings';

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>(DataManager.getSettings());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      DataManager.saveSettings(settings);
      toast({
        title: "Success",
        description: "Profile information updated successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile information.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof UserSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
    
    // Auto-save notification settings
    const updatedSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    };
    DataManager.saveSettings(updatedSettings);
    
    toast({
      title: "Success",
      description: "Notification preferences updated!"
    });
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      DataManager.clearAllData();
      toast({
        title: "Success",
        description: "All data has been cleared successfully!"
      });
      // Reload the page to reset the state
      window.location.reload();
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
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account and application preferences
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={settings.firstName}
                          onChange={(e) => setSettings(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={settings.lastName}
                          onChange={(e) => setSettings(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={settings.email}
                        onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={settings.company}
                        onChange={(e) => setSettings(prev => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>

                <ApiKeysSettings />

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="emailNotifications" 
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                      </div>
                      <Switch 
                        id="pushNotifications" 
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Receive updates about new features</p>
                      </div>
                      <Switch 
                        id="marketingEmails" 
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        All data is stored locally in your browser and automatically expires after 24 hours. 
                        You can manually clear all data if needed.
                      </p>
                      <Button 
                        variant="destructive" 
                        onClick={handleClearData}
                      >
                        Clear All Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
