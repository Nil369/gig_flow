import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gigsAPI } from '@/lib/api';
import type { Gig } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, IndianRupee, Calendar, Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const MyGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyGigs = async () => {
    try {
      setLoading(true);
      const response = await gigsAPI.getMyGigs();
      setGigs(response.data.gigs || response.data);
    } catch (error: any) {
      toast.error('Failed to fetch your gigs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const openGigs = gigs.filter((gig) => gig.status === 'open');
  const assignedGigs = gigs.filter((gig) => gig.status === 'assigned');

  const GigCard = ({ gig }: { gig: Gig }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={gig.status === 'open' ? 'default' : 'secondary'} className="capitalize">
            {gig.status}
          </Badge>
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
            <IndianRupee className="h-4 w-4" />
            {gig.budget}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{gig.title}</CardTitle>
        <CardDescription className="line-clamp-2">{gig.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <Calendar className="h-4 w-4" />
          <span>Posted on {new Date(gig.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => navigate(`/gigs/${gig._id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen bg-white dark:bg-zinc-950">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">My Gigs</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Manage your posted projects and track applications</p>
        </div>
        <Button
          onClick={() => navigate('/create-gig')}
          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Post New Gig
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All ({gigs.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({openGigs.length})</TabsTrigger>
          <TabsTrigger value="assigned">Assigned ({assignedGigs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">No gigs yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">Start by posting your first gig</p>
              <Button
                onClick={() => navigate('/create-gig')}
                className="bg-linear-to-r from-blue-600 to-purple-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Post a Gig
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="open">
          {openGigs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No open gigs</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openGigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assigned">
          {assignedGigs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No assigned gigs</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedGigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
