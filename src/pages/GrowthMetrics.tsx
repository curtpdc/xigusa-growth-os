import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricsItem {
  weekStart: string;
  organicVisits: number;
  leads: number;
  conversionRate: number;
}

export default function GrowthMetrics() {
  const [metricsData] = useState<MetricsItem[]>([
    { weekStart: '2026-01-06', organicVisits: 1850, leads: 12, conversionRate: 0.65 },
    { weekStart: '2026-01-13', organicVisits: 2120, leads: 15, conversionRate: 0.71 },
    { weekStart: '2025-12-30', organicVisits: 1620, leads: 10, conversionRate: 0.62 },
    { weekStart: '2025-12-23', organicVisits: 1480, leads: 8, conversionRate: 0.54 },
    { weekStart: '2025-12-16', organicVisits: 1350, leads: 7, conversionRate: 0.52 },
  ]);

  const latestMetrics = metricsData[0];
  const previousMetrics = metricsData[1];

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  const visitsChange = calculateChange(latestMetrics.organicVisits, previousMetrics.organicVisits);
  const leadsChange = calculateChange(latestMetrics.leads, previousMetrics.leads);
  const conversionChange = calculateChange(latestMetrics.conversionRate, previousMetrics.conversionRate);

  const chartData = [...metricsData].reverse().map(item => ({
    week: new Date(item.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    visits: item.organicVisits,
    leads: item.leads,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Growth Metrics</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Organic Visits</h3>
            {visitsChange.isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {latestMetrics.organicVisits.toLocaleString()}
          </div>
          <div className={`text-sm ${visitsChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {visitsChange.isPositive ? '+' : '-'}{visitsChange.value}% from last week
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Leads Generated</h3>
            {leadsChange.isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {latestMetrics.leads}
          </div>
          <div className={`text-sm ${leadsChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {leadsChange.isPositive ? '+' : '-'}{leadsChange.value}% from last week
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
            {conversionChange.isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {latestMetrics.conversionRate}%
          </div>
          <div className={`text-sm ${conversionChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {conversionChange.isPositive ? '+' : '-'}{conversionChange.value}% from last week
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Trend (Last 5 Weeks)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#2563eb" strokeWidth={2} name="Organic Visits" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leads Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Generation (Last 5 Weeks)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="leads" fill="#10b981" name="Leads" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights & Blockers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 This Week's Wins</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Published 2 high-quality blog posts
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Acquired backlink from DC Line
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              ROI Calculator driving 40% of leads
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 Blockers & Next Steps</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">→</span>
              Need to improve mobile page speed
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">→</span>
              Follow up with Washington Post editor
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">→</span>
              Add more internal links to blog posts
            </li>
          </ul>
        </div>
      </div>

      {/* Weekly Metrics Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Data</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-4 font-semibold text-gray-700">Week Starting</th>
              <th className="text-right py-2 px-4 font-semibold text-gray-700">Organic Visits</th>
              <th className="text-right py-2 px-4 font-semibold text-gray-700">Leads</th>
              <th className="text-right py-2 px-4 font-semibold text-gray-700">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {metricsData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-4">{new Date(item.weekStart).toLocaleDateString()}</td>
                <td className="text-right py-2 px-4">{item.organicVisits.toLocaleString()}</td>
                <td className="text-right py-2 px-4">{item.leads}</td>
                <td className="text-right py-2 px-4">{item.conversionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
