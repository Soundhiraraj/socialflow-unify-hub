
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Send, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StatsCards = () => {
  const stats = [
    {
      title: "Scheduled Posts",
      value: "24",
      icon: Calendar,
      change: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Posts Published",
      value: "156",
      icon: Send,
      change: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Draft Posts",
      value: "8",
      icon: Clock,
      change: "+3%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      icon: TrendingUp,
      change: "+0.5%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={cn(
          "hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-l-4 shadow-sm",
          stat.borderColor
        )}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={cn("p-2 rounded-lg", stat.bgColor)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
