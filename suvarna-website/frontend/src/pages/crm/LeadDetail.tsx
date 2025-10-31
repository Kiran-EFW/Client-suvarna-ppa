import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Save, UserPlus, Clock, Mail, Phone, MapPin, 
  Calendar, Briefcase, FileText, CheckCircle, Plus, Globe, 
  Building2, Zap, Users
} from 'lucide-react';
// import { getCurrentEmployee } from '@/lib/authApi';
import { format } from 'date-fns';
import DocumentUpload from '@/components/crm/DocumentUpload';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';

interface Activity {
  id: string;
  type: string;
  subject: string;
  description: string;
  outcome: string;
  duration: number;
  nextFollowUp?: string;
  rating?: number;
  createdAt: string;
  employee: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  completedAt: string;
  assignedTo: {
    firstName: string;
    lastName: string;
  };
}

interface CrmDocument {
  id: string;
  name: string;
  type: string;
  fileSize: number;
  createdAt: string;
  mimeType: string;
  uploadedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Lead {
  id: string;
  companyName: string;
  location: string;
  state: string;
  creditRating: string;
  website?: string;
  annualConsumption?: number;
  industry?: string;
  companySize?: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobile1: string;
  mobile2: string;
  landline: string;
  landline2: string;
  email1: string;
  email2: string;
  status: string;
  priority: string;
  source: string;
  remarks: string;
  estimatedValue: number;
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  activities: Activity[];
  tasks: Task[];
  documents: CrmDocument[];
}

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  // const [employee, setEmployee] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activityData, setActivityData] = useState({
    type: 'note',
    subject: '',
    description: '',
    outcome: '',
    duration: '',
    nextFollowUp: '',
    rating: ''
  });

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
    loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/crm/leads/${id}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const result = await response.json();
        setLead(result.data);
        setEditData(result.data);
      }
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/crm/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        const result = await response.json();
        setLead(result.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleAddActivity = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/crm/leads/${id}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...activityData,
          duration: activityData.duration ? parseInt(activityData.duration) : undefined,
          nextFollowUp: activityData.nextFollowUp ? new Date(activityData.nextFollowUp).toISOString() : undefined,
          rating: activityData.rating ? parseInt(activityData.rating) : undefined
        }),
      });
      if (response.ok) {
        setShowAddActivity(false);
        setActivityData({ type: 'note', subject: '', description: '', outcome: '', duration: '', nextFollowUp: '', rating: '' });
        loadLead();
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Lead not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div>
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{lead.companyName}</h1>
              <p className="text-lg text-muted-foreground">
                {lead.firstName} {lead.lastName}
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Edit Lead
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <CardTitle>Company Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Company Name</Label>
                          <Input
                            value={editData.companyName}
                            onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Credit Rating</Label>
                          <Input
                            value={editData.creditRating || ''}
                            onChange={(e) => setEditData({ ...editData, creditRating: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={editData.location}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>State</Label>
                          <Input
                            value={editData.state}
                            onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Website</Label>
                          <Input
                            type="url"
                            value={editData.website || ''}
                            onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div>
                          <Label>Industry</Label>
                          <Input
                            value={editData.industry || ''}
                            onChange={(e) => setEditData({ ...editData, industry: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Annual Consumption (kWh)</Label>
                          <Input
                            type="number"
                            value={editData.annualConsumption || ''}
                            onChange={(e) => setEditData({ ...editData, annualConsumption: e.target.value ? parseFloat(e.target.value) : null })}
                          />
                        </div>
                        <div>
                          <Label>Company Size</Label>
                          <Input
                            value={editData.companySize || ''}
                            onChange={(e) => setEditData({ ...editData, companySize: e.target.value })}
                            placeholder="e.g., Small, Medium, Large"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Company</p>
                          <p className="text-sm text-muted-foreground">{lead.companyName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{lead.location}, {lead.state}</p>
                        </div>
                      </div>
                      {lead.creditRating && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Credit Rating</p>
                            <p className="text-sm text-muted-foreground">{lead.creditRating}</p>
                          </div>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-start gap-3">
                          <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Website</p>
                            <a 
                              href={lead.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {lead.website}
                            </a>
                          </div>
                        </div>
                      )}
                      {lead.industry && (
                        <div className="flex items-start gap-3">
                          <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Industry</p>
                            <p className="text-sm text-muted-foreground">{lead.industry}</p>
                          </div>
                        </div>
                      )}
                      {lead.annualConsumption && (
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Annual Consumption</p>
                            <p className="text-sm text-muted-foreground">{lead.annualConsumption.toLocaleString('en-IN')} kWh</p>
                          </div>
                        </div>
                      )}
                      {lead.companySize && (
                        <div className="flex items-start gap-3">
                          <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Company Size</p>
                            <p className="text-sm text-muted-foreground">{lead.companySize}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <CardTitle>Contact Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>First Name</Label>
                          <Input
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Last Name</Label>
                          <Input
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Designation</Label>
                        <Input
                          value={editData.designation || ''}
                          onChange={(e) => setEditData({ ...editData, designation: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Email 1</Label>
                          <Input
                            value={editData.email1}
                            onChange={(e) => setEditData({ ...editData, email1: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Email 2</Label>
                          <Input
                            value={editData.email2 || ''}
                            onChange={(e) => setEditData({ ...editData, email2: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Mobile 1</Label>
                          <Input
                            value={editData.mobile1}
                            onChange={(e) => setEditData({ ...editData, mobile1: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Mobile 2</Label>
                          <Input
                            value={editData.mobile2 || ''}
                            onChange={(e) => setEditData({ ...editData, mobile2: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Landline</Label>
                          <Input
                            value={editData.landline || ''}
                            onChange={(e) => setEditData({ ...editData, landline: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Landline 2</Label>
                          <Input
                            value={editData.landline2 || ''}
                            onChange={(e) => setEditData({ ...editData, landline2: e.target.value })}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <UserPlus className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Contact Person</p>
                          <p className="text-sm text-muted-foreground">
                            {lead.firstName} {lead.lastName}
                            {lead.designation && ` - ${lead.designation}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{lead.email1}</p>
                          {lead.email2 && <p className="text-sm text-muted-foreground">{lead.email2}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Mobile</p>
                          <p className="text-sm text-muted-foreground">{lead.mobile1}</p>
                          {lead.mobile2 && <p className="text-sm text-muted-foreground">{lead.mobile2}</p>}
                        </div>
                      </div>
                      {(lead.landline || lead.landline2) && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Landline</p>
                            {lead.landline && <p className="text-sm text-muted-foreground">{lead.landline}</p>}
                            {lead.landline2 && <p className="text-sm text-muted-foreground">{lead.landline2}</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activities */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <CardTitle>Activity Timeline</CardTitle>
                    </div>
                    <Button size="sm" onClick={() => setShowAddActivity(!showAddActivity)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showAddActivity && (
                    <div className="mb-6 p-4 border rounded-lg bg-muted/20">
                      <div className="space-y-4">
                        <div>
                          <Label>Activity Type</Label>
                          <Select
                            value={activityData.type}
                            onValueChange={(value) => setActivityData({ ...activityData, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="call">Phone Call</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="note">Note</SelectItem>
                              <SelectItem value="status_change">Status Change</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <Input
                            value={activityData.subject}
                            onChange={(e) => setActivityData({ ...activityData, subject: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={activityData.description}
                            onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Outcome</Label>
                          <Textarea
                            value={activityData.outcome}
                            onChange={(e) => setActivityData({ ...activityData, outcome: e.target.value })}
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input
                            type="number"
                            value={activityData.duration}
                            onChange={(e) => setActivityData({ ...activityData, duration: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Next Follow-up Date</Label>
                          <Input
                            type="datetime-local"
                            value={activityData.nextFollowUp}
                            onChange={(e) => setActivityData({ ...activityData, nextFollowUp: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Rating (1-5)</Label>
                          <Select
                            value={activityData.rating}
                            onValueChange={(value) => setActivityData({ ...activityData, rating: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAddActivity}>
                            Save Activity
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAddActivity(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {lead.activities.map((activity) => (
                      <div key={activity.id} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                              {activity.type.toUpperCase()}
                            </span>
                            {activity.subject && (
                              <span className="font-semibold text-sm">{activity.subject}</span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(activity.createdAt), 'MMM dd, yyyy HH:mm')}
                          </span>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                        )}
                        {activity.outcome && (
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Outcome:</strong> {activity.outcome}
                          </p>
                        )}
                        {activity.duration && (
                          <p className="text-xs text-muted-foreground">
                            Duration: {activity.duration} minutes
                          </p>
                        )}
                        {activity.rating && (
                          <p className="text-xs text-muted-foreground">
                            Rating: {'★'.repeat(activity.rating)}{'☆'.repeat(5 - activity.rating)} ({activity.rating}/5)
                          </p>
                        )}
                        {activity.nextFollowUp && (
                          <p className="text-xs text-muted-foreground">
                            Next Follow-up: {format(new Date(activity.nextFollowUp), 'MMM dd, yyyy HH:mm')}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          By: {activity.employee.firstName} {activity.employee.lastName}
                        </p>
                      </div>
                    ))}
                    {lead.activities.length === 0 && !showAddActivity && (
                      <p className="text-center text-muted-foreground py-4">
                        No activities yet. Click "Add Activity" to log one.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lead Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label>Status</Label>
                        <Select
                          value={editData.status}
                          onValueChange={(value) => setEditData({ ...editData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                            <SelectItem value="negotiation">Negotiation</SelectItem>
                            <SelectItem value="won">Won</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select
                          value={editData.priority}
                          onValueChange={(value) => setEditData({ ...editData, priority: value })}
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
                        <Label>Source</Label>
                        <Input
                          value={editData.source}
                          onChange={(e) => setEditData({ ...editData, source: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Estimated Value (₹)</Label>
                        <Input
                          type="number"
                          value={editData.estimatedValue || ''}
                          onChange={(e) => setEditData({ ...editData, estimatedValue: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'won' ? 'bg-green-100 text-green-800' :
                          lead.status === 'lost' ? 'bg-red-100 text-red-800' :
                          lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lead.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                          lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {lead.priority.toUpperCase()} PRIORITY
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Source</p>
                        <p className="text-sm text-muted-foreground capitalize">{lead.source}</p>
                      </div>
                      {lead.estimatedValue && (
                        <div>
                          <p className="text-sm font-medium">Estimated Value</p>
                          <p className="text-lg font-semibold">₹{lead.estimatedValue.toLocaleString('en-IN')}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">Assigned To</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.assignedTo ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName}` : 'Unassigned'}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tasks</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lead.tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold text-sm">{task.title}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {task.status.toUpperCase()}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${
                            task.priority === 'high' ? 'text-red-600' :
                            task.priority === 'medium' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            {task.priority.toUpperCase()}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(task.dueDate), 'MMM dd')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {lead.tasks.length === 0 && (
                      <p className="text-center text-muted-foreground py-4 text-sm">
                        No tasks yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents Section */}
            <div className="md:col-span-2 space-y-6">
              <DocumentUpload
                leadId={lead.id}
                documents={lead.documents}
                onDocumentAdded={loadLead}
                onDocumentDeleted={loadLead}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-1 mt-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle>Timeline</CardTitle>
                </div>
              </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-medium">
                      {format(new Date(lead.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="text-sm font-medium">
                      {format(new Date(lead.updatedAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Remarks */}
              {lead.remarks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Remarks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{lead.remarks}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

