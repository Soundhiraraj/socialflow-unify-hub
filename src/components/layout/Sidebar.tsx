
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Calendar, 
  Image, 
  BarChart3, 
  Settings, 
  Users,
  FileText
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Scheduled Posts', active: false },
    { icon: FileText, label: 'Drafts', active: false },
    { icon: Image, label: 'Media Library', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Users, label: 'Connected Accounts', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className={cn("bg-gray-50 border-r border-gray-200 h-full w-64", className)}>
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                item.active && "bg-blue-100 text-blue-700 hover:bg-blue-100"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
