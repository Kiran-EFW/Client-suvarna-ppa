import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, AlertCircle, Settings, ListTodo, BarChart3 } from 'lucide-react';
import { getCurrentEmployee } from '@/lib/authApi';

import { getApiPath } from '@/lib/apiConfig';

interface Stats {
  totalLeads: number;
  recentLeads: number;
  statusCounts: Array<{ status: string; count: number }>;
  priorityCounts: Array<{ priority: string; count: number }>;
  winLossRatio: {
    won: number;
    lost: number;
    total: number;
    winRate: string;
  };
  pipelineValue: number;
}

export default function CRMDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Get employee info
        const empData = await getCurrentEmployee();
        setEmployee(empData);

        // Get stats
        const response = await fetch(getApiPath('/api/crm/leads/stats'), {
          credentials: 'include'
        });
        if (response.ok) {
          const result = await response.json();
          setStats(result.data);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading...</p>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">CRM Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Welcome back, {employee?.firstName} {employee?.lastName}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = '/crm/leads/kanban'}>
                Kanban View
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/crm/leads/table'}>
                Table View
              </Button>
              {employee?.role === 'super_admin' && (
                <Button variant="outline" onClick={() => window.location.href = '/crm/employees'}>
                  <Settings className="h-4 w-4 mr-2" />
                  Employees
                </Button>
              )}
              <Button variant="outline" onClick={() => window.location.href = '/crm/tasks'}>
                <ListTodo className="h-4 w-4 mr-2" />
                Tasks
              </Button>
              {employee?.role !== 'agent' && (
                <Button variant="outline" onClick={() => window.location.href = '/crm/reports'}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.totalLeads || 0}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats?.recentLeads || 0} new in last 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pipeline Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹{(stats?.pipelineValue || 0).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Active opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Won Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.winLossRatio.won || 0}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Win rate: {stats?.winLossRatio.winRate || '0.00'}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lost Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.winLossRatio.lost || 0}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Total: {stats?.winLossRatio.total || 0}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lead Status Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Leads by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {stats?.statusCounts.map((status) => (
                  <div key={status.status} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold capitalize">
                        {status.status.replace('_', ' ')}
                      </p>
                      <p className="text-2xl font-bold">{status.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Leads by Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {stats?.priorityCounts.map((priority) => (
                  <div key={priority.priority} className="flex items-center gap-3 p-4 rounded-lg border">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      priority.priority === 'high' ? 'bg-red-100' : 
                      priority.priority === 'medium' ? 'bg-yellow-100' : 
                      'bg-blue-100'
                    }`}>
                      <AlertCircle className={`h-5 w-5 ${
                        priority.priority === 'high' ? 'text-red-600' : 
                        priority.priority === 'medium' ? 'text-yellow-600' : 
                        'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold capitalize">
                        {priority.priority}
                      </p>
                      <p className="text-2xl font-bold">{priority.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

