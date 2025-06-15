
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video, Download } from 'lucide-react';

const MediaLibrary = () => {
  const mediaItems = [
    { id: 1, type: 'image', name: 'product-shot-1.jpg', size: '2.4 MB' },
    { id: 2, type: 'video', name: 'demo-video.mp4', size: '15.8 MB' },
    { id: 3, type: 'image', name: 'team-photo.jpg', size: '3.1 MB' },
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
                  Media Library
                </h1>
                <p className="text-gray-600">
                  Manage your images and videos
                </p>
              </div>

              <Card className="mb-6 border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload new media</h3>
                    <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
                    <Button>Choose Files</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mediaItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        {item.type === 'image' ? (
                          <Image className="w-8 h-8 text-gray-400" />
                        ) : (
                          <Video className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{item.size}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
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

export default MediaLibrary;
