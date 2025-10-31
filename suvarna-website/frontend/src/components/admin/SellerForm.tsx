import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { indianStates } from '@/data/indianStates';
import type { Seller } from '@/lib/adminApi';

interface SellerFormProps {
  seller?: Seller | null;
  onSubmit: (data: Partial<Seller>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const projectTypes = [
  { value: 'Solar', label: 'Solar' },
  { value: 'Wind', label: 'Wind' },
  { value: 'Hybrid', label: 'Hybrid' },
];

export default function SellerForm({ seller, onSubmit, onCancel, isLoading }: SellerFormProps) {
  const [formData, setFormData] = useState({
    companyName: seller?.companyName || '',
    contactPerson: seller?.contactPerson || '',
    contactEmail: seller?.contactEmail || '',
    contactPhone: seller?.contactPhone || '',
    projectType: seller?.projectType || '',
    capacity: seller?.capacity?.toString() || '',
    location: seller?.location || '',
    state: seller?.state || '',
    askingPrice: seller?.askingPrice?.toString() || '',
    status: seller?.status || 'active',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      capacity: parseFloat(formData.capacity),
      askingPrice: parseFloat(formData.askingPrice),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{seller ? 'Edit Seller' : 'Add New Seller'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="projectType">Project Type *</Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleInputChange('projectType', value)}
                required
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="capacity">Capacity (MW) *</Label>
              <Input
                id="capacity"
                type="number"
                step="0.1"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
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
              <Label htmlFor="askingPrice">Asking Price (₹/kWh) *</Label>
              <Input
                id="askingPrice"
                type="number"
                step="0.０1"
                value={formData.askingPrice}
                onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                required
              />
            </div>
            {seller && (
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : seller ? 'Update Seller' : 'Add Seller'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

