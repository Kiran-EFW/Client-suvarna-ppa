import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Users, DollarSign, Download } from 'lucide-react';
import { getCurrentEmployee } from '@/lib/authApi';
// import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

import { getApiPath } from '@/lib/apiConfig';

interface ReportData {
  totalLeads: number;
  leadsByStatus: Array<{ status: string; count: number }>;
  leadsBySource: Array<{ source: string; count: number }>;
  conversionRate: string;
  averageValue: number;
  topAgents: Array<{ name: string; leads: number; conversions: number }>;
  trends: Array<{ date: string; leads: number }>;
}

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<any>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    try {
      const empData = await getCurrentEmployee();
      setEmployee(empData);
      await loadReportData();
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const loadReportData = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would fetch actual data
      // For now, we'll use placeholder data
      const mockData: ReportData = {
        totalLeads: 0,
        leadsByStatus: [],
        leadsBySource: [],
        conversionRate: '0.00',
        averageValue: 0,
        topAgents: [],
        trends: [],
      };

      // Try to get real stats
      const response = await fetch(getApiPath('/api/crm/leads/stats'), {
        credentials: 'include',
      });

      if (response.ok) {
        const stats = await response.json();
        mockData.totalLeads = stats.data.totalLeads;
        mockData.leadsByStatus = stats.data.statusCounts || [];
        mockData.conversionRate = stats.data.winLossRatio?.winRate || '0.00';
      }

      setReportData(mockData);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // Export functionality would go here
    alert('Export functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!employee || !['super_admin', 'manager'].includes(employee.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Access denied. Manager or Super Admin access required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-lg text-muted-foreground">
                Track performance and analyze lead data
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-3xl font-bold">{reportData?.totalLeads || 0}</p>
                  </div>
                  <Users className="h-12 w-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-3xl font-bold">{reportData?.conversionRate || '0.00'}%</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Value</p>
                    <p className="text-3xl font-bold">
                      ₹{reportData?.averageValue?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                  <DollarSign className="h-12 w-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Leads</p>
                    <p className="text-3xl font-bold">
                      {reportData?.leadsByStatus?.filter(s => 
                        !['won', 'lost'].includes(s.status)
                      ).reduce((sum, s) => sum + s.count, 0) || 0}
                    </p>
                  </div>
                  <BarChart3 className="h-12 w-12 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Leads by Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Leads by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData?.leadsByStatus?.map((status) => (
                    <div key={status.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          status.status === 'new' ? 'bg-blue-500' :
                          status.status === 'contacted' ? 'bg-yellow-500' :
                          status.status === 'meeting_scheduled' ? 'bg-orange-500' :
                          status.status === 'proposal_sent' ? 'bg-purple-500' :
                          status.status === 'negotiation' ? 'bg-indigo-500' :
                          status.status === 'won' ? 'bg-green-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium capitalize">
                          {status.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              status.status === 'new' ? 'bg-blue-500' :
                              status.status === 'contacted' ? 'bg-yellow-500' :
                              status.status === 'meeting_scheduled' ? 'bg-orange-500' :
                              status.status === 'proposal_sent' ? 'bg-purple-500' :
                              status.status === 'negotiation' ? 'bg-indigo-500' :
                              status.status === 'won' ? 'bg-green-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(status.count / (reportData?.totalLeads || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-8 text-right">{status.count}</span>
                      </div>
                    </div>
                  ))}
                  {(!reportData?.leadsByStatus || reportData.leadsByStatus.length === 0) && (
                    <p className="text-center text-muted-foreground py-8">
                      No data available for the selected time period
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Leads by Source */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Leads by Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData?.leadsBySource?.map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{source.source}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(source.count / (reportData?.totalLeads || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-8 text-right">{source.count}</span>
                      </div>
                    </div>
                  ))}
                  {(!reportData?.leadsBySource || reportData.leadsBySource.length === 0) && (
                    <p className="text-center text-muted-foreground py-8">
                      No data available for the selected time period
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Agent</th>
                      <th className="text-right py-3 px-4 font-semibold">Total Leads</th>
                      <th className="text-right py-3 px-4 font-semibold">Won</th>
                      <th className="text-right py-3 px-4 font-semibold">Lost</th>
                      <th className="text-right py-3 px-4 font-semibold">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData?.topAgents?.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{agent.name}</td>
                        <td className="text-right py-3 px-4 font-medium">{agent.leads}</td>
                        <td className="text-right py-3 px-4 text-green-600 font-medium">{agent.conversions}</td>
                        <td className="text-right py-3 px-4 text-red-600 font-medium">
                          {agent.leads - agent.conversions}
                        </td>
                        <td className="text-right py-3 px-4 font-semibold">
                          {agent.leads > 0 ? ((agent.conversions / agent.leads) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                    {(!reportData?.topAgents || reportData.topAgents.length === 0) && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">
                          No team performance data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

