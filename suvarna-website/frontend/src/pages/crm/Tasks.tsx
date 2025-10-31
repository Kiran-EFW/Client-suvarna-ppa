import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CheckCircle, Circle, Calendar, Link as LinkIcon, Filter } from 'lucide-react';
// import { getCurrentEmployee } from '@/lib/authApi';
import { format } from 'date-fns';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdAt: string;
  completedAt: string | null;
  assignedTo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  lead: {
    id: string;
    companyName: string;
    firstName: string;
    lastName: string;
  };
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  // const [currentEmployee, setCurrentEmployee] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    leadId: '',
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter]);

  const loadData = async () => {
    try {
      await loadTasks();
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (priorityFilter !== 'all') {
        params.append('priority', priorityFilter);
      }

      const response = await fetch(`${API_BASE_URL}/api/crm/tasks?${params}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setTasks(result.data);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/crm/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          leadId: '',
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
        });
        loadTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleComplete = async (taskId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/crm/tasks/${taskId}/complete`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (response.ok) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');
  const overdueTasks = pendingTasks.filter(t => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate) < new Date();
  });

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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">My Tasks</h1>
              <p className="text-lg text-muted-foreground">
                Manage your assigned tasks and deadlines
              </p>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Task Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter task title"
                      required
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter task description"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Due Date</Label>
                      <Input
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Related Lead (Optional)</Label>
                      <Input
                        placeholder="Lead ID"
                        value={formData.leadId}
                        onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Create Task</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({
                          leadId: '',
                          title: '',
                          description: '',
                          priority: 'medium',
                          dueDate: '',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Tasks</p>
                    <p className="text-3xl font-bold">{pendingTasks.length}</p>
                  </div>
                  <Circle className="h-12 w-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Today</p>
                    <p className="text-3xl font-bold">
                      {completedTasks.filter(t => {
                        if (!t.completedAt) return false;
                        return format(new Date(t.completedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                      }).length}
                    </p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-3xl font-bold text-red-600">{overdueTasks.length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Pending Tasks */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5" />
                <CardTitle>Pending Tasks ({pendingTasks.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => {
                  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                  return (
                    <div
                      key={task.id}
                      className={`p-4 border rounded-lg hover:bg-muted/50 ${
                        isOverdue ? 'border-red-300 bg-red-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          onClick={() => handleComplete(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {task.priority.toUpperCase()}
                            </span>
                            {isOverdue && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                OVERDUE
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {task.lead && (
                              <button
                                onClick={() => window.location.href = `/crm/leads/${task.lead.id}`}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <LinkIcon className="h-3 w-3" />
                                {task.lead.companyName}
                              </button>
                            )}
                            {task.dueDate && (
                              <div className={`flex items-center gap-1 ${
                                isOverdue ? 'text-red-600 font-semibold' : ''
                              }`}>
                                <Calendar className="h-3 w-3" />
                                Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {pendingTasks.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No pending tasks. Great job!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle>Completed Tasks ({completedTasks.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedTasks.slice(0, 20).map((task) => (
                    <div
                      key={task.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 opacity-60"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold line-through">{task.title}</h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {task.lead && (
                              <button
                                onClick={() => window.location.href = `/crm/leads/${task.lead.id}`}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <LinkIcon className="h-3 w-3" />
                                {task.lead.companyName}
                              </button>
                            )}
                            {task.completedAt && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                Completed: {format(new Date(task.completedAt), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {completedTasks.length > 20 && (
                    <p className="text-center text-muted-foreground text-sm py-4">
                      Showing last 20 completed tasks
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

