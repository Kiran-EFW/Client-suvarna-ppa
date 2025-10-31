import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitLeadToCRM, type LeadFormData } from '@/lib/api';
import { indianStates } from '@/data/indianStates';
import { CheckCircle, XCircle } from 'lucide-react';

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    companyName: '',
    location: '',
    state: '',
    creditRating: '',
    priority: '',
    firstName: '',
    lastName: '',
    designation: '',
    mobile1: '',
    mobile2: '',
    landline: '',
    landline2: '',
    email1: '',
    email2: '',
    remarks: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitLeadToCRM(formData);
      setSubmitStatus('success');
      // Reset form on success
      setFormData({
        companyName: '',
        location: '',
        state: '',
        creditRating: '',
        priority: '',
        firstName: '',
        lastName: '',
        designation: '',
        mobile1: '',
        mobile2: '',
        landline: '',
        landline2: '',
        email1: '',
        email2: '',
        remarks: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Interested in Renewable Energy Solutions?</CardTitle>
        <CardDescription className="text-base">
          Fill out the form below and our team will get back to you with tailored solutions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange('state', value)}
                  required
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="creditRating">Credit Rating</Label>
                <Input
                  id="creditRating"
                  value={formData.creditRating}
                  onChange={(e) => handleInputChange('creditRating', e.target.value)}
                  placeholder="e.g., A-, BBB+"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange('priority', value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Person Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Person</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobile1">Mobile 1 *</Label>
                <Input
                  id="mobile1"
                  type="tel"
                  value={formData.mobile1}
                  onChange={(e) => handleInputChange('mobile1', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile2">Mobile 2</Label>
                <Input
                  id="mobile2"
                  type="tel"
                  value={formData.mobile2}
                  onChange={(e) => handleInputChange('mobile2', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="landline">Landline</Label>
                <Input
                  id="landline"
                  type="tel"
                  value={formData.landline}
                  onChange={(e) => handleInputChange('landline', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="landline2">Landline 2</Label>
                <Input
                  id="landline2"
                  type="tel"
                  value={formData.landline2}
                  onChange={(e) => handleInputChange('landline2', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email1">Email 1 *</Label>
                <Input
                  id="email1"
                  type="email"
                  value={formData.email1}
                  onChange={(e) => handleInputChange('email1', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email2">Email 2</Label>
                <Input
                  id="email2"
                  type="email"
                  value={formData.email2}
                  onChange={(e) => handleInputChange('email2', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              placeholder="Any additional information or specific requirements..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </Button>

          {submitStatus === 'success' && (
            <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800">Thank you! We'll get back to you soon.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">{errorMessage || 'Something went wrong. Please try again.'}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
