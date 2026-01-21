import { useState } from 'react';
import { Plus, Mail, ExternalLink, CheckCircle } from 'lucide-react';

interface OutreachItem {
  id: string;
  contactName: string;
  outlet: string;
  email?: string;
  pitchAngle?: string;
  status: 'Planned' | 'Contacted' | 'Follow-up' | 'Success' | 'Rejected';
  backlinkAcquired: boolean;
}

export default function OutreachPipeline() {
  const [outreachItems] = useState<OutreachItem[]>([
    {
      id: '1',
      contactName: 'Editor',
      outlet: 'Washington Post',
      email: 'editor@washpost.com',
      pitchAngle: 'DC elder fraud prevention story',
      status: 'Contacted',
      backlinkAcquired: false,
    },
    {
      id: '2',
      contactName: 'Producer',
      outlet: 'WAMU 88.5',
      pitchAngle: 'Interview about AI fraud detection',
      status: 'Follow-up',
      backlinkAcquired: false,
    },
    {
      id: '3',
      contactName: 'Managing Editor',
      outlet: 'DC Line',
      pitchAngle: 'Guest post on local tech solutions',
      status: 'Success',
      backlinkAcquired: true,
    },
    {
      id: '4',
      contactName: 'Content Director',
      outlet: 'TechCrunch',
      pitchAngle: 'AI automation for vulnerable populations',
      status: 'Planned',
      backlinkAcquired: false,
    },
  ]);

  const statusColumns = ['Planned', 'Contacted', 'Follow-up', 'Success', 'Rejected'];

  const statusColors = {
    'Planned': 'bg-gray-100 border-gray-300',
    'Contacted': 'bg-blue-50 border-blue-300',
    'Follow-up': 'bg-yellow-50 border-yellow-300',
    'Success': 'bg-green-50 border-green-300',
    'Rejected': 'bg-red-50 border-red-300',
  };

  const groupedItems = statusColumns.reduce((acc, status) => {
    acc[status] = outreachItems.filter(item => item.status === status);
    return acc;
  }, {} as Record<string, OutreachItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Outreach Pipeline</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Contacts</div>
          <div className="text-2xl font-bold text-gray-900">{outreachItems.length}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold text-green-600">
            {Math.round((outreachItems.filter(i => i.status === 'Success').length / outreachItems.length) * 100)}%
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Backlinks Acquired</div>
          <div className="text-2xl font-bold text-purple-600">
            {outreachItems.filter(i => i.backlinkAcquired).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Pending Follow-up</div>
          <div className="text-2xl font-bold text-yellow-600">
            {outreachItems.filter(i => i.status === 'Follow-up').length}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {statusColumns.map((status) => (
            <div key={status} className="flex-shrink-0 w-80">
              <div className={`card ${statusColors[status as keyof typeof statusColors]} border-2`}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {status}
                  <span className="ml-2 text-sm text-gray-600">
                    ({groupedItems[status]?.length || 0})
                  </span>
                </h3>
                <div className="space-y-3">
                  {groupedItems[status]?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.outlet}</h4>
                        {item.backlinkAcquired && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.contactName}</p>
                      {item.pitchAngle && (
                        <p className="text-xs text-gray-500 italic mb-2">{item.pitchAngle}</p>
                      )}
                      {item.email && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          {item.email}
                        </div>
                      )}
                    </div>
                  ))}
                  {(!groupedItems[status] || groupedItems[status].length === 0) && (
                    <div className="text-center text-gray-400 text-sm py-4">
                      No items
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List View for Mobile */}
      <div className="lg:hidden space-y-3">
        {outreachItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{item.outlet}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'Success' ? 'bg-green-100 text-green-800' :
                item.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                item.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{item.contactName}</p>
            {item.pitchAngle && (
              <p className="text-xs text-gray-500 italic">{item.pitchAngle}</p>
            )}
            {item.backlinkAcquired && (
              <div className="flex items-center text-xs text-green-600 mt-2">
                <CheckCircle className="w-3 h-3 mr-1" />
                Backlink acquired
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
