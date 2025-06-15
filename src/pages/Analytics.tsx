
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = () => {
  const engagementData = [
    { name: 'Mon', likes: 40, shares: 24, comments: 15 },
    { name: 'Tue', likes: 30, shares: 13, comments: 18 },
    { name: 'Wed', likes: 20, shares: 28, comments: 12 },
    { name: 'Thu', likes: 27, shares: 39, comments: 20 },
    { name: 'Fri', likes: 18, shares: 48, comments: 25 },
    { name: 'Sat', likes: 23, shares: 38, comments: 22 },
    { name: 'Sun', likes: 34, shares: 43, comments: 30 },
  ];

  const reachData = [
    { name: 'Week 1', reach: 2400 },
    { name: 'Week 2', reach: 1398 },
    { name: 'Week 3', reach: 9800 },
    { name: 'Week 4', reach: 3908 },
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
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Track your social media performance
                </p>
              </div>

              <StatsCards />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="likes" fill="#3b82f6" />
                        <Bar dataKey="shares" fill="#10b981" />
                        <Bar dataKey="comments" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={reachData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="reach" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
