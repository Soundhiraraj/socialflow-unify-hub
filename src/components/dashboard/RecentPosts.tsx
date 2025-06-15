
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, Eye } from 'lucide-react';

export const RecentPosts = () => {
  const posts = [
    {
      id: 1,
      content: "Check out our latest product update! 🚀 New features that will transform your workflow.",
      platforms: ['Instagram', 'Facebook'],
      status: 'Published',
      publishedAt: '2 hours ago',
      engagement: '124 likes, 23 comments'
    },
    {
      id: 2,
      content: "Behind the scenes of our team meeting. Great ideas brewing! ☕️",
      platforms: ['Twitter'],
      status: 'Scheduled',
      publishedAt: 'Tomorrow at 9:00 AM',
      engagement: null
    },
    {
      id: 3,
      content: "Weekly motivation: Success is not final, failure is not fatal...",
      platforms: ['LinkedIn', 'Facebook'],
      status: 'Draft',
      publishedAt: null,
      engagement: null
    },
    {
      id: 4,
      content: "Customer spotlight: Amazing results achieved with our platform! 📈",
      platforms: ['Instagram'],
      status: 'Published',
      publishedAt: '1 day ago',
      engagement: '89 likes, 12 comments'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Posts
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm text-gray-900 line-clamp-2 flex-1 mr-4">
                {post.content}
              </p>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {post.platforms.map((platform, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                {post.publishedAt && (
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.publishedAt}
                  </div>
                )}
              </div>
              {post.engagement && (
                <span className="text-gray-500">{post.engagement}</span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
