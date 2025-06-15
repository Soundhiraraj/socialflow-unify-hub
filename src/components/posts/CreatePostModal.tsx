
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image, Calendar, Send, Save } from 'lucide-react';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePostModal = ({ open, onOpenChange }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [schedulingOption, setSchedulingOption] = useState('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', connected: true },
    { id: 'facebook', name: 'Facebook', icon: '📘', connected: true },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', connected: false },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: false },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = (action: 'publish' | 'schedule' | 'draft') => {
    console.log({
      content: postContent,
      platforms: selectedPlatforms,
      action,
      scheduleDate: schedulingOption === 'schedule' ? scheduleDate : null,
      scheduleTime: schedulingOption === 'schedule' ? scheduleTime : null
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Post Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{postContent.length}/2200 characters</span>
              <Button variant="ghost" size="sm" className="text-xs">
                ✨ AI Assist
              </Button>
            </div>
          </div>

          {/* Media Upload */}
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-6">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload images or videos</p>
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    !platform.connected
                      ? 'opacity-50 cursor-not-allowed'
                      : selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => platform.connected && handlePlatformToggle(platform.id)}
                >
                  <Checkbox
                    checked={selectedPlatforms.includes(platform.id)}
                    disabled={!platform.connected}
                  />
                  <span className="text-lg">{platform.icon}</span>
                  <div>
                    <span className="font-medium text-sm">{platform.name}</span>
                    {!platform.connected && (
                      <span className="block text-xs text-gray-500">Not connected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduling Options */}
          <div className="space-y-3">
            <Label>When to Post</Label>
            <Select value={schedulingOption} onValueChange={setSchedulingOption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Post Now</SelectItem>
                <SelectItem value="schedule">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>

            {schedulingOption === 'schedule' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => handleSubmit('draft')}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>
            
            {schedulingOption === 'schedule' ? (
              <Button
                onClick={() => handleSubmit('schedule')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={selectedPlatforms.length === 0}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            ) : (
              <Button
                onClick={() => handleSubmit('publish')}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={selectedPlatforms.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Publish Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
