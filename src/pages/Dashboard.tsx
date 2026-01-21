import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { 
  CheckCircle, Clock, AlertCircle, TrendingUp, 
  FileText, Wrench, Send, Calendar, Plus 
} from 'lucide-react';

export default function Dashboard() {
  const { accounts } = useMsal();
  const [todaysTasks, setTodaysTasks] = useState<string[]>([]);
  const [dailyWin, setDailyWin] = useState('');
  const [blocker, setBlocker] = useState('');
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);

  const quickStats = [
    { name: 'Content Published', value: '12', icon: FileText, color: 'text-blue-600' },
    { name: 'Tasks Completed', value: '34', icon: CheckCircle, color: 'text-green-600' },
    { name: 'PR Contacts', value: '8', icon: Send, color: 'text-purple-600' },
    { name: 'Organic Visits', value: '2.4K', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { action: 'Published blog post', time: '2 hours ago', status: 'success' },
    { action: 'Contacted Washington Post', time: '5 hours ago', status: 'pending' },
    { action: 'Completed ROI Calculator', time: '1 day ago', status: 'success' },
    { action: 'Weekly analytics review', time: '2 days ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {accounts[0]?.name?.split(' ')[0] || 'Curt'}!
        </h2>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Mode: Today's Focus */}
      <div className="card lg:hidden">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Today's 3 Tasks
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-primary rounded" />
            <span className="text-gray-700">Publish DC blog post</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-primary rounded" />
            <span className="text-gray-700">Update Search Console</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-primary rounded" />
            <span className="text-gray-700">Follow up with WAMU</span>
          </div>
        </div>
        <button className="mt-4 flex items-center text-primary hover:text-blue-700">
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </button>
      </div>

      {/* Daily Motivation Entry */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⭐ Daily Momentum Log</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Today's WIN
            </label>
            <input
              type="text"
              value={dailyWin}
              onChange={(e) => setDailyWin(e.target.value)}
              placeholder="What did you accomplish today?"
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What slowed you down?
            </label>
            <input
              type="text"
              value={blocker}
              onChange={(e) => setBlocker(e.target.value)}
              placeholder="Any blockers or challenges?"
              className="input w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level (1-5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold text-primary">{energyLevel}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Level (1-5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={focusLevel}
                onChange={(e) => setFocusLevel(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold text-primary">{focusLevel}</div>
            </div>
          </div>
          <button className="btn-primary w-full">Save Entry</button>
        </div>
      </div>

      {/* Desktop Mode: Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-gray-700">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            This Week's Priorities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Tuesday: Publish DC blog post</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Due Soon</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Thursday: Publish national post</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Scheduled</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Friday: Weekly reflection</span>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Execution Cycle */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📆 Weekly Execution Cycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { day: 'Monday', task: 'Analytics Review' },
            { day: 'Tuesday', task: 'Publish DC Post' },
            { day: 'Wednesday', task: 'PR Outreach' },
            { day: 'Thursday', task: 'Publish National Post' },
            { day: 'Friday', task: 'Weekly Wins & Reflection' },
          ].map((item) => (
            <div key={item.day} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 text-sm">{item.day}</div>
              <div className="text-xs text-gray-600 mt-1">{item.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
