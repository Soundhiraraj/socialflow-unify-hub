
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Settings, Plus, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Sidebar } from './Sidebar';

interface HeaderProps {
  onCreatePost: () => void;
}

export const Header = ({ onCreatePost }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">SF</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-gray-900">SocialFlow</h1>
              <p className="text-xs text-gray-500">Social Media Manager</p>
            </div>
          </div>
        </div>

        {/* Search bar for larger screens */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search posts, drafts, media..." 
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-3">
          <Button 
            onClick={onCreatePost} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create Post</span>
            <span className="sm:hidden">Post</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-9 h-9 border-2 border-gray-200 shadow-sm">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-medium">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
