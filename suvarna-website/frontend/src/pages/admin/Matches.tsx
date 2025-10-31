import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMatches, createMatch, deleteMatch, type Match } from '@/lib/adminApi';
import MatchForm from '@/components/admin/MatchForm';
import { Plus, Trash2, Briefcase, CheckCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await getMatches();
      setMatches(data);
    } catch (error) {
      console.error('Failed to load matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleDelete = async (match: Match) => {
    if (!window.confirm(`Are you sure you want to delete this match? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteMatch(match.id);
      await loadMatches();
    } catch (error) {
      console.error('Failed to delete match:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete match. Please try again.');
    }
  };

  const handleSubmit = async (userId: string, sellerId: string) => {
    try {
      setIsSubmitting(true);
      await createMatch(userId, sellerId);
      await loadMatches();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create match:', error);
      alert(error instanceof Error ? error.message : 'Failed to create match');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading matches...</p>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Matches Management</h1>
              <p className="text-lg text-muted-foreground">Create and manage buyer-seller matches</p>
            </div>
            {!showForm && (
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Create Match
              </Button>
            )}
          </div>

          {showForm ? (
            <MatchForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matches.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="py-12 text-center">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No matches yet. Click "Create Match" to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                matches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{match.user.companyName}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {match.user.firstName} {match.user.lastName}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          match.status === 'active' ? 'bg-green-100 text-green-800' :
                          match.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {match.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Seller</p>
                          <p className="text-sm text-muted-foreground">
                            {match.seller.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {match.seller.projectType} • {match.seller.capacity} MW
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {match.seller.location}, {match.seller.state}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Asking Price</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{match.seller.askingPrice}/kWh
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Matched: {format(new Date(match.matchedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {match.termsAgreement && (
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-sm text-green-600">Terms Agreed</p>
                          </div>
                        )}
                      </div>
                      {!match.termsAgreement && (
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(match)}
                            className="flex-1 text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      )}
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

