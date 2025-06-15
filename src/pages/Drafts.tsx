
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Send } from 'lucide-react';

const Drafts = () => {
  const drafts = [
    {
      id: 1,
      content: "Draft post about our new feature...",
      lastModified: "2 hours ago",
      wordCount: 45
    },
    {
      id: 2,
      content: "Ideas for next month's content calendar",
      lastModified: "1 day ago",
      wordCount: 120
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
                  Draft Posts
                </h1>
                <p className="text-gray-600">
                  Continue working on your saved drafts
                </p>
              </div>

              <div className="grid gap-6">
                {drafts.map((draft) => (
                  <Card key={draft.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{draft.content}</CardTitle>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <FileText className="w-4 h-4 mr-1" />
                            {draft.wordCount} words • Last modified {draft.lastModified}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Send className="w-4 h-4 mr-1" />
                            Publish
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
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

export default Drafts;
