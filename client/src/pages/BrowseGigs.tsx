import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gigsAPI } from '@/lib/api';
import type { Gig } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, IndianRupee, Calendar, User, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export const BrowseGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchGigs = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const response = await gigsAPI.getGigs(searchTerm);
      // Backend returns array directly
      setGigs(Array.isArray(response.data) ? response.data : response.data.gigs || []);
    } catch (error: any) {
      toast.error('Failed to fetch gigs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Browse Gigs
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl font-medium">
              Discover exciting freelance opportunities and apply to gigs that match your skills
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search gigs by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base shadow-sm"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>
        </div>

        {/* Gigs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full bg-slate-200 dark:bg-slate-800" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-zinc-800 mb-6">
              <Briefcase className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">No gigs found</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {search ? 'Try adjusting your search terms' : 'Be the first to post a gig!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <Card
                key={gig._id}
                className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1"
                onClick={() => navigate(`/gigs/${gig._id}`)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={gig.status === 'open' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {gig.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg">
                      <IndianRupee className="h-5 w-5" />
                      {gig.budget}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {gig.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{gig.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <User className="h-4 w-4" />
                    <span>Posted by {typeof gig.ownerId === 'object' ? gig.ownerId.name : 'Client'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
