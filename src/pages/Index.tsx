
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ConnectedAccounts } from '@/components/dashboard/ConnectedAccounts';
import { RecentPosts } from '@/components/dashboard/RecentPosts';
import { CreatePostModal } from '@/components/posts/CreatePostModal';

const Index = () => {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onCreatePost={() => setCreatePostOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your social media accounts today.
                </p>
              </div>

              <div className="animate-fade-in">
                <StatsCards />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
                <div className="xl:col-span-2">
                  <RecentPosts />
                </div>
                <div>
                  <ConnectedAccounts />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <CreatePostModal 
        open={createPostOpen} 
        onOpenChange={setCreatePostOpen} 
      />
    </div>
  );
};

export default Index;
