import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gigsAPI, bidsAPI } from '@/lib/api';
import type { Gig, Bid } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { IndianRupee, Calendar, User, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isOwner = gig && user && (typeof gig.ownerId === 'object' ? gig.ownerId._id : gig.ownerId) === user._id;

  const fetchGigDetails = async () => {
    try {
      setLoading(true);
      const response = await gigsAPI.getGigById(id!);
      setGig(response.data.gig || response.data);

      // If user is the owner, fetch bids
      if (user && response.data.gig?.ownerId?._id === user._id) {
        try {
          const bidsResponse = await bidsAPI.getBidsByGig(id!);
          // Backend returns array directly
          setBids(Array.isArray(bidsResponse.data) ? bidsResponse.data : bidsResponse.data.bids || []);
        } catch (error) {
          console.log('Could not fetch bids');
        }
      }
    } catch (error: any) {
      toast.error('Failed to fetch gig details');
      navigate('/gigs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGigDetails();
    }
  }, [id, user]);

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a bid');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await bidsAPI.createBid({
        gigId: id!,
        message: bidMessage,
        price: parseFloat(bidPrice),
      });
      toast.success('Bid submitted successfully!');
      setBidDialogOpen(false);
      setBidMessage('');
      setBidPrice('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit bid');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHireFreelancer = async (bidId: string) => {
    try {
      await bidsAPI.hireFreelancer(bidId);
      toast.success('Freelancer hired successfully!');
      fetchGigDetails();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!gig) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-4xl min-h-screen bg-white dark:bg-zinc-950">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant={gig.status === 'open' ? 'default' : 'secondary'} className="capitalize">
              {gig.status}
            </Badge>
            <div className="flex items-center gap-1 text-2xl font-bold text-green-600 dark:text-green-400">
              <IndianRupee className="h-6 w-6" />
              {gig.budget}
            </div>
          </div>
          <CardTitle className="text-3xl">{gig.title}</CardTitle>
          <CardDescription className="text-base mt-4">{gig.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span>
                Posted by{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {typeof gig.ownerId === 'object' ? gig.ownerId.name : 'Client'}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {!isOwner && gig.status === 'open' && user && (
            <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit a Bid
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmitBid} className="space-y-6">
                  <DialogHeader>
                    <DialogTitle>Submit Your Bid</DialogTitle>
                    <DialogDescription>
                      Tell the client why you're the best fit for this gig
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="bidPrice" className="text-base font-semibold text-gray-900 dark:text-white">
                        Your Bid Amount (₹)
                      </Label>
                      <Input
                        id="bidPrice"
                        type="number"
                        step="0.01"
                        placeholder="Enter your price"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        required
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">Budget: ₹{gig.budget}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bidMessage" className="text-base font-semibold text-gray-900 dark:text-white">
                        Cover Message
                      </Label>
                      <Textarea
                        id="bidMessage"
                        placeholder="Explain why you're the best fit for this project..."
                        value={bidMessage}
                        onChange={(e) => setBidMessage(e.target.value)}
                        required
                        rows={8}
                        className="min-h-[200px]"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setBidDialogOpen(false)}
                      className="font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 font-semibold"
                    >
                      {submitting ? 'Submitting...' : 'Submit Bid'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {!user && gig.status === 'open' && (
            <Button
              onClick={() => navigate('/login')}
              className="w-full mt-4 bg-linear-to-r from-blue-600 to-purple-600"
            >
              Login to Submit a Bid
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Bids Section (Only for gig owner) */}
      {isOwner && bids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bids Received ({bids.length})</CardTitle>
            <CardDescription>Review and hire the best freelancer for your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bids.map((bid) => (
              <Card key={bid._id} className={bid.status === 'hired' ? 'border-green-500' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {bid.freelancerId.name}
                        {bid.status === 'hired' && (
                          <CheckCircle className="inline ml-2 h-5 w-5 text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{bid.freelancerId.email}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl font-bold text-green-600">
                        <IndianRupee className="h-5 w-5" />
                        {bid.price}
                      </div>
                      <Badge variant={bid.status === 'hired' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}>
                        {bid.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {bid.message}
                  </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                      Submitted on {new Date(bid.createdAt).toLocaleDateString()}
                    </p>
                  {bid.status === 'pending' && gig.status === 'open' && (
                    <Button
                      onClick={() => handleHireFreelancer(bid._id)}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Hire This Freelancer
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
