import { useState, useEffect } from 'react';
import { getMatches, agreeToTerms, type Match } from '@/lib/buyerApi';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, CheckCircle } from 'lucide-react';
import MatchDetailModal from '@/components/buyer/MatchDetailModal';

export default function BuyerDashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Failed to load matches:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  const handleViewDetails = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading your matches...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Buyer Dashboard</h1>
          <p className="text-lg text-muted-foreground mb-8">
            View and manage your matched PPA opportunities
          </p>

          {matches.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Matches Yet</h3>
              <p className="text-muted-foreground">
                We'll notify you when we find suitable sellers matching your requirements.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl">{match.seller.companyName}</CardTitle>
                        {match.termsAgreed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <CardDescription>
                        {match.seller.projectType} • {match.seller.capacity} MW
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Location:</span>{' '}
                          <span className="text-muted-foreground">
                            {match.seller.location}, {match.seller.state}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Asking Price:</span>{' '}
                          <span className="text-primary font-semibold">
                            ₹{match.seller.askingPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => handleViewDetails(match)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onTermsAgreed={async (matchId: string) => {
            try {
              await agreeToTerms(matchId);
              // Reload matches
              const updatedMatches = await getMatches();
              setMatches(updatedMatches);
              setModalOpen(false);
              setSelectedMatch(null);
            } catch (error) {
              console.error('Failed to agree to terms:', error);
            }
          }}
        />
      )}
    </div>
  );
}

