import { useState } from 'react';
import { Plus, Search, Calendar, Tag } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  status: 'Idea' | 'Drafting' | 'Editing' | 'Ready' | 'Published' | 'Promoted';
  publishDate?: string;
  keywords: string[];
  performanceScore?: number;
}

export default function ContentMachine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [contentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'DC Fraud Protection Guide for Seniors',
      status: 'Published',
      publishDate: '2026-01-15',
      keywords: ['DC fraud', 'senior protection', 'elder abuse'],
      performanceScore: 85,
    },
    {
      id: '2',
      title: 'AI Automation for Small Businesses',
      status: 'Drafting',
      keywords: ['AI automation', 'business efficiency'],
    },
    {
      id: '3',
      title: 'Microsoft 365 Integration Best Practices',
      status: 'Idea',
      keywords: ['Microsoft 365', 'integration', 'productivity'],
    },
  ]);

  const statusColors = {
    'Idea': 'bg-gray-100 text-gray-800',
    'Drafting': 'bg-blue-100 text-blue-800',
    'Editing': 'bg-yellow-100 text-yellow-800',
    'Ready': 'bg-purple-100 text-purple-800',
    'Published': 'bg-green-100 text-green-800',
    'Promoted': 'bg-pink-100 text-pink-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Content Machine</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="Idea">Idea</option>
            <option value="Drafting">Drafting</option>
            <option value="Editing">Editing</option>
            <option value="Ready">Ready</option>
            <option value="Published">Published</option>
            <option value="Promoted">Promoted</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 gap-4">
        {contentItems.map((item) => (
          <div key={item.id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {item.publishDate && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.publishDate).toLocaleDateString()}
                    </span>
                  )}
                  {item.performanceScore && (
                    <span>Performance: {item.performanceScore}/100</span>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Calendar View */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Calendar</h3>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="font-semibold text-gray-700 py-2">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className="aspect-square border border-gray-200 rounded p-1 hover:bg-gray-50">
              <div className="text-gray-600">{((i % 30) + 1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
