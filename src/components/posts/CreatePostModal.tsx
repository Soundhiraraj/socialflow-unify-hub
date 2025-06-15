
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image, Calendar, Send, Save } from 'lucide-react';
import { DataManager } from '@/utils/dataManager';
import { useToast } from '@/hooks/use-toast';
import type { MediaItem } from '@/types';

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
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const connectedAccounts = DataManager.getConnectedAccounts();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMedia: MediaItem[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const size = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      // optionally, you can save in DataManager for full MediaLibrary integration
      const mediaItem = DataManager.addMediaItem({
        name: file.name,
        type,
        size,
        url
      });
      newMedia.push(mediaItem);
    });
    setSelectedMedia((curr) => [...curr, ...newMedia]);
    event.target.value = '';
  };

  const handleRemoveMedia = (id: string) => {
    setSelectedMedia((curr) => curr.filter((item) => item.id !== id));
  };

  const handleSubmit = (action: 'publish' | 'schedule' | 'draft') => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive"
      });
      return;
    }

    if (action !== 'draft' && selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform.",
        variant: "destructive"
      });
      return;
    }

    if (action === 'schedule' && (!scheduleDate || !scheduleTime)) {
      toast({
        title: "Error",
        description: "Please select a date and time for scheduling.",
        variant: "destructive"
      });
      return;
    }

    const scheduledTime = action === 'schedule' 
      ? `${scheduleDate}T${scheduleTime}:00`
      : undefined;

    const newPost = DataManager.addPost({
      content: postContent,
      platforms: selectedPlatforms,
      scheduledTime,
      status: action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : 'draft',
      mediaUrls: selectedMedia.map(item => item.url),
    });

    const actionText = action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : 'saved as draft';
    toast({
      title: "Success",
      description: `Post has been ${actionText} successfully!`
    });

    // Reset form
    setPostContent('');
    setSelectedPlatforms([]);
    setSchedulingOption('now');
    setScheduleDate('');
    setScheduleTime('');
    setSelectedMedia([]);
    
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
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="create-post-file-upload"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                {/* Show previews of selected images/videos */}
                {selectedMedia.length > 0 && (
                  <div className="mt-4 flex gap-3 flex-wrap justify-center">
                    {selectedMedia.map((item) => (
                      <div key={item.id} className="relative w-20 h-20 flex-shrink-0 border rounded overflow-hidden bg-gray-100">
                        {item.type === 'image' 
                          ? <img src={item.url} alt={item.name} className="object-cover w-full h-full" />
                          : <video src={item.url} className="object-cover w-full h-full" />
                        }
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0 w-5 h-5 text-xs p-0"
                          onClick={() => handleRemoveMedia(item.id)}
                          type="button"
                        >×</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 gap-3">
              {connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    !account.connected
                      ? 'opacity-50 cursor-not-allowed'
                      : selectedPlatforms.includes(account.platform)
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => account.connected && handlePlatformToggle(account.platform)}
                >
                  <Checkbox
                    checked={selectedPlatforms.includes(account.platform)}
                    disabled={!account.connected}
                  />
                  <span className="text-lg">{account.avatar}</span>
                  <div>
                    <span className="font-medium text-sm">{account.name}</span>
                    {!account.connected && (
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
              type="button"
              onClick={() => handleSubmit('draft')}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>
            
            {schedulingOption === 'schedule' ? (
              <Button
                type="button"
                onClick={() => handleSubmit('schedule')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={selectedPlatforms.length === 0}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            ) : (
              <Button
                type="button"
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

// NOTE: This file is growing long (over 240 lines). For maintainability, consider splitting out media upload and previews into a dedicated component next for easier scaling.
// ... end of CreatePostModal.tsx
