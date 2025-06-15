
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video, Download, Trash2 } from 'lucide-react';
import { DataManager } from '@/utils/dataManager';
import { MediaItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

const MediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = () => {
    const media = DataManager.getMedia();
    setMediaItems(media);
  };

  const handleDelete = (id: string) => {
    const success = DataManager.deleteMediaItem(id);
    if (success) {
      toast({
        title: "Success",
        description: "Media item deleted successfully!"
      });
      loadMedia();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const mediaItem = DataManager.addMediaItem({
        name: file.name,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        url: URL.createObjectURL(file)
      });
    });

    toast({
      title: "Success",
      description: `${files.length} file(s) uploaded successfully!`
    });
    
    loadMedia();
    event.target.value = '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Media Library
                </h1>
                <p className="text-gray-600">
                  Manage your images and videos ({mediaItems.length} items)
                </p>
              </div>

              <Card className="mb-6 border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload new media</h3>
                    <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {mediaItems.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No media files yet</h3>
                    <p className="text-gray-600">Upload your first image or video to get started</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mediaItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow group">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                          {item.type === 'image' ? (
                            <img 
                              src={item.url} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : (
                            <video 
                              src={item.url}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          )}
                          <div className="hidden w-full h-full flex items-center justify-center">
                            {item.type === 'image' ? (
                              <Image className="w-8 h-8 text-gray-400" />
                            ) : (
                              <Video className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm mb-1 truncate" title={item.name}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.size} • {formatDate(item.uploadedAt)}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
