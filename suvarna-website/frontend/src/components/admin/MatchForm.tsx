import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBuyers, getSellers, type Buyer, type Seller } from '@/lib/adminApi';

interface MatchFormProps {
  onSubmit: (userId: string, sellerId: string) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function MatchForm({ onSubmit, onCancel, isLoading }: MatchFormProps) {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [sellerId, setSellerId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [buyersData, sellersData] = await Promise.all([
        getBuyers(),
        getSellers()
      ]);
      setBuyers(buyersData);
      setSellers(sellersData.filter(s => s.status === 'active'));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !sellerId) {
      alert('Please select both buyer and seller');
      return;
    }
    await onSubmit(userId, sellerId);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Match</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userId">Buyer *</Label>
            <Select value={userId} onValueChange={setUserId} required>
              <SelectTrigger id="userId">
                <SelectValue placeholder="Select buyer" />
              </SelectTrigger>
              <SelectContent>
                {buyers.map((buyer) => (
                  <SelectItem key={buyer.id} value={buyer.id}>
                    {buyer.companyName} ({buyer.firstName} {buyer.lastName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sellerId">Seller *</Label>
            <Select value={sellerId} onValueChange={setSellerId} required>
              <SelectTrigger id="sellerId">
                <SelectValue placeholder="Select seller" />
              </SelectTrigger>
              <SelectContent>
                {sellers.map((seller) => (
                  <SelectItem key={seller.id} value={seller.id}>
                    {seller.companyName} - {seller.projectType} ({seller.capacity} MW)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !userId || !sellerId}>
              {isLoading ? 'Creating...' : 'Create Match'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

