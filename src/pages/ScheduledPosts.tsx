
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { DataManager } from '@/utils/dataManager';
import { Post } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { CreatePostModal } from '@/components/posts/CreatePostModal';

const ScheduledPosts = () => {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadScheduledPosts();
  }, []);

  const loadScheduledPosts = () => {
    const posts = DataManager.getPostsByStatus('scheduled');
    setScheduledPosts(posts);
  };

  const handleDelete = (id: string) => {
    const success = DataManager.deletePost(id);
    if (success) {
      toast({
        title: "Success",
        description: "Scheduled post deleted successfully!"
      });
      loadScheduledPosts();
    }
  };

  const formatScheduledTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onCreatePost={() => setCreatePostOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Scheduled Posts
                </h1>
                <p className="text-gray-600">
                  Manage your upcoming social media posts ({scheduledPosts.length} scheduled)
                </p>
              </div>

              {scheduledPosts.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No scheduled posts</h3>
                    <p className="text-gray-600 mb-4">Schedule your first post to get started</p>
                    <Button onClick={() => setCreatePostOpen(true)}>
                      Create Scheduled Post
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {scheduledPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{post.content}</CardTitle>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Calendar className="w-4 h-4 mr-1" />
                              {post.scheduledTime && formatScheduledTime(post.scheduledTime)}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                            >
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
              )}
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

export default ScheduledPosts;
