import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bidsAPI } from '@/lib/api';
import type { Bid } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, IndianRupee, Calendar, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const MyBids = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyBids = async () => {
    try {
      setLoading(true);
      const response = await bidsAPI.getMyBids();
      setBids(response.data.bids || response.data);
    } catch (error: any) {
      toast.error('Failed to fetch your bids');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  const pendingBids = bids.filter((bid) => bid.status === 'pending');
  const hiredBids = bids.filter((bid) => bid.status === 'hired');
  const rejectedBids = bids.filter((bid) => bid.status === 'rejected');

  const BidCard = ({ bid }: { bid: Bid }) => {
    const gig = typeof bid.gigId === 'object' ? bid.gigId : null;
    
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge
              variant={
                bid.status === 'hired'
                  ? 'default'
                  : bid.status === 'rejected'
                  ? 'destructive'
                  : 'secondary'
              }
              className="capitalize"
            >
              {bid.status}
            </Badge>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
              <IndianRupee className="h-4 w-4" />
              {bid.price}
            </div>
          </div>
          <CardTitle className="line-clamp-2">{gig?.title || 'Gig Title'}</CardTitle>
          <CardDescription className="line-clamp-3">{bid.message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <Calendar className="h-4 w-4" />
            <span>Submitted on {new Date(bid.createdAt).toLocaleDateString()}</span>
          </div>
          {gig && (
            <Button
              className="w-full mt-4"
              variant="outline"
              onClick={() => navigate(`/gigs/${gig._id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Gig
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen bg-white dark:bg-zinc-950">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">My Bids</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Track all your submitted proposals and their status
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All ({bids.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingBids.length})</TabsTrigger>
          <TabsTrigger value="hired">Hired ({hiredBids.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedBids.length})</TabsTrigger>
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
          ) : bids.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">No bids yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                Start browsing gigs and submit your first bid
              </p>
              <Button
                onClick={() => navigate('/gigs')}
                className="bg-linear-to-r from-blue-600 to-purple-600"
              >
                Browse Gigs
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bids.map((bid) => (
                <BidCard key={bid._id} bid={bid} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingBids.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No pending bids</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingBids.map((bid) => (
                <BidCard key={bid._id} bid={bid} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hired">
          {hiredBids.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No hired bids yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hiredBids.map((bid) => (
                <BidCard key={bid._id} bid={bid} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {rejectedBids.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No rejected bids</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedBids.map((bid) => (
                <BidCard key={bid._id} bid={bid} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
