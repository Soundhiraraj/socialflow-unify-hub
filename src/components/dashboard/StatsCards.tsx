
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Send, Clock, TrendingUp } from 'lucide-react';

export const StatsCards = () => {
  const stats = [
    {
      title: "Scheduled Posts",
      value: "24",
      icon: Calendar,
      change: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Posts Published",
      value: "156",
      icon: Send,
      change: "+8%",
      color: "text-green-600"
    },
    {
      title: "Draft Posts",
      value: "8",
      icon: Clock,
      change: "+3%",
      color: "text-orange-600"
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      icon: TrendingUp,
      change: "+0.5%",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
