import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Filter, Download, Search } from 'lucide-react';
// import { getCurrentEmployee } from '@/lib/authApi';
import { format } from 'date-fns';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';

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

export default function TableView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  // const [employee, setEmployee] = useState<any>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   async function loadData() {
  //     try {
  //       const empData = await getCurrentEmployee();
  //       setEmployee(empData);
  //     } catch (error) {
  //       console.error('Error loading employee:', error);
  //     }
  //   }
  //   loadData();
  // }, []);

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: (pagination.pageIndex + 1).toString(),
          limit: pagination.pageSize.toString(),
        });

        if (statusFilter !== 'all') {
          params.append('status', statusFilter);
        }
        if (priorityFilter !== 'all') {
          params.append('priority', priorityFilter);
        }
        if (globalFilter) {
          params.append('search', globalFilter);
        }

        const response = await fetch(`${API_BASE_URL}/api/crm/leads?${params}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setLeads(result.data);
          setTotalPages(result.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLeads();
  }, [pagination.pageIndex, pagination.pageSize, statusFilter, priorityFilter]);

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'companyName',
        header: 'Company',
        cell: (info) => (
          <div className="font-semibold">{info.getValue() as string}</div>
        ),
      },
      {
        accessorKey: 'contact',
        header: 'Contact Person',
        cell: (info) => {
          const row = info.row.original;
          return `${row.firstName} ${row.lastName}`;
        },
      },
      {
        accessorKey: 'email1',
        header: 'Email',
        cell: (info) => (
          <div className="text-sm">{info.getValue() as string}</div>
        ),
      },
      {
        accessorKey: 'mobile1',
        header: 'Mobile',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            info.getValue() === 'won' ? 'bg-green-100 text-green-800' :
            info.getValue() === 'lost' ? 'bg-red-100 text-red-800' :
            info.getValue() === 'new' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {(info.getValue() as string).replace('_', ' ').toUpperCase()}
          </span>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: (info) => (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            info.getValue() === 'high' ? 'bg-red-100 text-red-800' :
            info.getValue() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {(info.getValue() as string).toUpperCase()}
          </span>
        ),
      },
      {
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: (info) => {
          const assignedTo = info.getValue() as any;
          return assignedTo ? `${assignedTo.firstName} ${assignedTo.lastName}` : 'Unassigned';
        },
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: (info) => {
          const row = info.row.original;
          return `${row.location}, ${row.state}`;
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: (info) => format(new Date(info.getValue() as string), 'MMM dd, yyyy'),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = `/crm/leads/${info.row.original.id}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: leads,
    columns,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const handleExport = () => {
    // Simple CSV export
    const csv = [
      ['Company', 'Contact Person', 'Email', 'Mobile', 'Status', 'Priority', 'Location', 'Created'],
      ...leads.map(lead => [
        lead.companyName,
        `${lead.firstName} ${lead.lastName}`,
        lead.email1,
        lead.mobile1,
        lead.status.replace('_', ' '),
        lead.priority,
        `${lead.location}, ${lead.state}`,
        format(new Date(lead.createdAt), 'MMM dd, yyyy'),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Leads Table</h1>
              <p className="text-lg text-muted-foreground">
                View and manage all leads
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => window.location.href = '/crm/leads/kanban'}>
                <Filter className="h-4 w-4 mr-2" />
                Switch to Kanban
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <CardTitle>All Leads</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
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
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b">
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b hover:bg-muted/50 cursor-pointer"
                          onClick={() => window.location.href = `/crm/leads/${row.original.id}`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-4 align-middle">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {leads.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No leads found</p>
                  </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Page {pagination.pageIndex + 1} of {totalPages}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

