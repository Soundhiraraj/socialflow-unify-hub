
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Users, ExternalLink } from 'lucide-react';

const ConnectedAccountsPage = () => {
  const accounts = [
    { platform: 'Instagram', username: '@company', followers: '12.5K', connected: true, icon: '📷' },
    { platform: 'Facebook', username: 'Company Page', followers: '8.2K', connected: true, icon: '📘' },
    { platform: 'Twitter/X', username: '@company', followers: '5.8K', connected: false, icon: '🐦' },
    { platform: 'LinkedIn', username: 'Company', followers: '3.1K', connected: false, icon: '💼' },
  ];

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
                  Manage your social media account connections
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <Card key={account.platform} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{account.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{account.platform}</CardTitle>
                            <p className="text-sm text-gray-600">{account.username}</p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${account.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {account.followers} followers
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        {account.connected ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="w-4 h-4 mr-1" />
                              Settings
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccountsPage;
