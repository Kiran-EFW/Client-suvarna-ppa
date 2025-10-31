import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Briefcase } from 'lucide-react';
import { getBuyers, getSellers, getMatches } from '@/lib/adminApi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [buyersCount, setBuyersCount] = useState(0);
  const [sellersCount, setSellersCount] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [buyers, sellers, matches] = await Promise.all([
        getBuyers(),
        getSellers(),
        getMatches()
      ]);
      setBuyersCount(buyers.length);
      setSellersCount(sellers.length);
      setMatchesCount(matches.length);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Manage buyers, sellers, and create matches
          </p>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card onClick={() => navigate('/admin/buyers')} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Buyers</CardTitle>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{loading ? '...' : buyersCount}</p>
                <p className="text-sm text-muted-foreground">Registered buyers</p>
              </CardContent>
            </Card>

            <Card onClick={() => navigate('/admin/sellers')} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sellers</CardTitle>
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{loading ? '...' : sellersCount}</p>
                <p className="text-sm text-muted-foreground">Active sellers</p>
              </CardContent>
            </Card>

            <Card onClick={() => navigate('/admin/matches')} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Matches</CardTitle>
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{loading ? '...' : matchesCount}</p>
                <p className="text-sm text-muted-foreground">Active matches</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
