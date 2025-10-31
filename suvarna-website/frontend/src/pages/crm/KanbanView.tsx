import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Table } from 'lucide-react';
// import { getCurrentEmployee } from '@/lib/authApi';
// import { format } from 'date-fns';

import { getApiPath } from '@/lib/apiConfig';

interface Lead {
  id: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email1: string;
  mobile1: string;
  status: string;
  priority: string;
  source: string;
  location: string;
  state: string;
  createdAt: string;
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  _count: {
    activities: number;
    tasks: number;
  };
}

const STATUS_COLUMNS = [
  { id: 'new', title: 'New', color: 'bg-blue-500' },
  { id: 'contacted', title: 'Contacted', color: 'bg-yellow-500' },
  { id: 'meeting_scheduled', title: 'Meeting Scheduled', color: 'bg-orange-500' },
  { id: 'proposal_sent', title: 'Proposal Sent', color: 'bg-purple-500' },
  { id: 'negotiation', title: 'Negotiation', color: 'bg-indigo-500' },
  { id: 'won', title: 'Won', color: 'bg-green-500' },
  { id: 'lost', title: 'Lost', color: 'bg-red-500' },
];

export default function KanbanView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadLeads();
  }, [priorityFilter]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: '1',
        limit: '1000', // Get all for kanban
      });

      if (priorityFilter !== 'all') {
        params.append('priority', priorityFilter);
      }

      const response = await fetch(getApiPath(`/api/crm/leads?${params}`), {
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setLeads(result.data);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const lead = leads.find(l => l.id === active.id);
    setDraggedLead(lead || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedLead(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as string;

    // Don't update if dropping on same column
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.status === newStatus) return;

    // Optimistically update UI
    setLeads(leads.map(l => 
      l.id === leadId ? { ...l, status: newStatus } : l
    ));

    // Update on server
    try {
      const response = await fetch(getApiPath(`/api/crm/leads/${leadId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // Revert on error
        loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      loadLeads();
    }
  };

  const getLeadsByStatus = (status: string) => {
    let filtered = leads.filter(lead => lead.status === status);
    
    if (searchFilter) {
      const searchLower = searchFilter.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.companyName.toLowerCase().includes(searchLower) ||
        lead.firstName.toLowerCase().includes(searchLower) ||
        lead.lastName.toLowerCase().includes(searchLower) ||
        lead.email1.toLowerCase().includes(searchLower) ||
        lead.mobile1.includes(searchFilter)
      );
    }
    
    return filtered;
  };

  const handleLeadClick = (leadId: string) => {
    window.location.href = `/crm/leads/${leadId}`;
  };

  if (loading && leads.length === 0) {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Leads Pipeline</h1>
              <p className="text-lg text-muted-foreground">
                Drag and drop to change lead status
              </p>
            </div>
            <Button onClick={() => window.location.href = '/crm/leads/table'}>
              <Table className="h-4 w-4 mr-2" />
              Switch to Table
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <CardTitle>Filters</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
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

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-8">
              {STATUS_COLUMNS.map((column) => {
                const columnLeads = getLeadsByStatus(column.id);
                return (
                  <div key={column.id} className="flex flex-col min-w-[280px]">
                    <div className={`${column.color} text-white px-4 py-2 rounded-t-lg flex items-center justify-between`}>
                      <h3 className="font-semibold text-sm">{column.title}</h3>
                      <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold">
                        {columnLeads.length}
                      </span>
                    </div>
                    <div
                      className="flex-1 bg-secondary/20 rounded-b-lg p-2 min-h-[400px] space-y-2"
                      style={{
                        minHeight: columnLeads.length === 0 ? '100px' : undefined
                      }}
                    >
                      {columnLeads.length === 0 ? (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          No leads
                        </div>
                      ) : (
                        columnLeads.map((lead) => (
                          <motion.div
                            key={lead.id}
                            id={lead.id}
                            draggable
                            whileHover={{ scale: 1.02 }}
                            whileDrag={{ scale: 1.05 }}
                            onClick={() => handleLeadClick(lead.id)}
                            className="bg-card border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          >
                            <div className="mb-2">
                              <h4 className="font-semibold text-sm">{lead.companyName}</h4>
                              <p className="text-xs text-muted-foreground">
                                {lead.firstName} {lead.lastName}
                              </p>
                            </div>
                            <div className="space-y-1 text-xs">
                              <p className="text-muted-foreground truncate">
                                📧 {lead.email1}
                              </p>
                              <p className="text-muted-foreground truncate">
                                📱 {lead.mobile1}
                              </p>
                              <p className="text-muted-foreground truncate">
                                📍 {lead.location}, {lead.state}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                                lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {lead.priority.toUpperCase()}
                              </span>
                              {lead.assignedTo && (
                                <span className="text-xs text-muted-foreground">
                                  {lead.assignedTo.firstName}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <DragOverlay>
              {draggedLead ? (
                <div className="bg-card border rounded-lg p-4 shadow-xl opacity-90 w-[280px]">
                  <div className="mb-2">
                    <h4 className="font-semibold text-sm">{draggedLead.companyName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {draggedLead.firstName} {draggedLead.lastName}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground truncate">
                      📧 {draggedLead.email1}
                    </p>
                    <p className="text-muted-foreground truncate">
                      📱 {draggedLead.mobile1}
                    </p>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </motion.div>
      </div>
    </div>
  );
}

