import { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TechnicalItem {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  componentType: 'Landing Page' | 'Lead Capture' | 'Schema' | 'Infrastructure';
  notes?: string;
}

export default function TechnicalTracker() {
  const [technicalItems] = useState<TechnicalItem[]>([
    { id: '1', name: 'ROI Calculator Deployment', status: 'Completed', componentType: 'Lead Capture' },
    { id: '2', name: 'AI Readiness Quiz Integration', status: 'Completed', componentType: 'Lead Capture' },
    { id: '3', name: 'Exit Intent Popup Testing', status: 'In Progress', componentType: 'Lead Capture' },
    { id: '4', name: 'Zoho CRM Webhook Validation', status: 'In Progress', componentType: 'Infrastructure' },
    { id: '5', name: 'Submit Sitemap in Search Console', status: 'Not Started', componentType: 'Schema' },
    { id: '6', name: 'React Helmet Metadata Review', status: 'Not Started', componentType: 'Schema' },
    { id: '7', name: 'Add Homepage Components', status: 'Not Started', componentType: 'Landing Page' },
    { id: '8', name: 'Mobile Optimization Tests', status: 'Not Started', componentType: 'Landing Page' },
    { id: '9', name: 'Accessibility & WCAG Pass', status: 'Not Started', componentType: 'Infrastructure' },
    { id: '10', name: 'Azure Static Web App Diagnostics', status: 'Completed', componentType: 'Infrastructure' },
  ]);

  const statusIcon = {
    'Not Started': <Clock className="w-5 h-5 text-gray-400" />,
    'In Progress': <AlertCircle className="w-5 h-5 text-yellow-500" />,
    'Completed': <CheckCircle className="w-5 h-5 text-green-500" />,
  };

  const statusColor = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
  };

  const groupedItems = technicalItems.reduce((acc, item) => {
    if (!acc[item.componentType]) {
      acc[item.componentType] = [];
    }
    acc[item.componentType].push(item);
    return acc;
  }, {} as Record<string, TechnicalItem[]>);

  const completionRate = Math.round(
    (technicalItems.filter(i => i.status === 'Completed').length / technicalItems.length) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Technical Tracker</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Completion Rate</span>
          <span className="font-semibold text-gray-900">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {technicalItems.filter(i => i.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {technicalItems.filter(i => i.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {technicalItems.filter(i => i.status === 'Not Started').length}
            </div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>
      </div>

      {/* Grouped Tasks */}
      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{type}</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {statusIcon[item.status]}
                  <span className="text-gray-900">{item.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
