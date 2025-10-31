import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSellers, createSeller, updateSeller, deleteSeller, type Seller } from '@/lib/adminApi';
import SellerForm from '@/components/admin/SellerForm';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';

export default function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    try {
      setLoading(true);
      const data = await getSellers();
      setSellers(data);
    } catch (error) {
      console.error('Failed to load sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSeller(null);
    setShowForm(true);
  };

  const handleEdit = (seller: Seller) => {
    setEditingSeller(seller);
    setShowForm(true);
  };

  const handleDelete = (seller: Seller) => {
    setDeletingSeller(seller);
  };

  const confirmDelete = async () => {
    if (!deletingSeller) return;
    try {
      await deleteSeller(deletingSeller.id);
      await loadSellers();
      setDeletingSeller(null);
    } catch (error) {
      console.error('Failed to delete seller:', error);
      alert('Failed to delete seller. Please try again.');
    }
  };

  const handleSubmit = async (data: Partial<Seller>) => {
    try {
      setIsSubmitting(true);
      if (editingSeller) {
        await updateSeller(editingSeller.id, data);
      } else {
        await createSeller(data);
      }
      await loadSellers();
      setShowForm(false);
      setEditingSeller(null);
    } catch (error) {
      console.error('Failed to save seller:', error);
      alert(error instanceof Error ? error.message : 'Failed to save seller');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSeller(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading sellers...</p>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Sellers Management</h1>
              <p className="text-lg text-muted-foreground">Manage renewable energy sellers and their projects</p>
            </div>
            {!showForm && (
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Seller
              </Button>
            )}
          </div>

          {showForm ? (
            <SellerForm
              seller={editingSeller}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sellers.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No sellers yet. Click "Add Seller" to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                sellers.map((seller) => (
                  <Card key={seller.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{seller.companyName}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{seller.projectType} • {seller.capacity} MW</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          seller.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {seller.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Contact Person</p>
                          <p className="text-sm text-muted-foreground">{seller.contactPerson}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{seller.contactEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{seller.contactPhone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{seller.location}, {seller.state}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Asking Price</p>
                          <p className="text-sm text-muted-foreground">₹{seller.askingPrice}/kWh</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(seller)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(seller)}
                          className="flex-1 text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

