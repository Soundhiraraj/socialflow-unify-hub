
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';

const ScheduledPosts = () => {
  const scheduledPosts = [
    {
      id: 1,
      content: "Excited to share our latest product update! 🚀",
      platforms: ['Instagram', 'Facebook'],
      scheduledTime: "2025-06-16 10:00 AM",
      status: "scheduled"
    },
    {
      id: 2,
      content: "Join us for our webinar next week about social media trends",
      platforms: ['LinkedIn', 'Twitter'],
      scheduledTime: "2025-06-17 2:00 PM",
      status: "scheduled"
    }
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
                  Scheduled Posts
                </h1>
                <p className="text-gray-600">
                  Manage your upcoming social media posts
                </p>
              </div>

              <div className="grid gap-6">
                {scheduledPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{post.content}</CardTitle>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.scheduledTime}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {platform}
                          </span>
                        ))}
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

export default ScheduledPosts;
