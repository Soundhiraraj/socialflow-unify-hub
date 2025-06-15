
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
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
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Scheduled Posts', path: '/scheduled-posts' },
    { icon: FileText, label: 'Drafts', path: '/drafts' },
    { icon: Image, label: 'Media Library', path: '/media-library' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Connected Accounts', path: '/connected-accounts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={cn("bg-white border-r border-gray-200 h-full w-64 shadow-sm", className)}>
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={index} to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left transition-all duration-200 hover:scale-[1.02]",
                    isActive && "bg-blue-50 text-blue-700 hover:bg-blue-50 shadow-sm",
                    !isActive && "hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
