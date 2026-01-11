import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gigsAPI } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Briefcase, ArrowLeft } from 'lucide-react';

export const CreateGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await gigsAPI.createGig({
        title,
        description,
        budget: parseFloat(budget),
      });
      toast.success('Gig posted successfully!');
      navigate('/my-gigs');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-2xl min-h-screen bg-white dark:bg-zinc-950">
      <Button variant="ghost" onClick={() => navigate('/gigs')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Post a New Gig</CardTitle>
              <CardDescription>
                Describe your project and attract talented freelancers
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Build a responsive website"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Write a clear, descriptive title for your project
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail, including requirements, deliverables, and any specific technologies needed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={8}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Be specific about what you need to attract the right talent
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹) *</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                placeholder="e.g., 500.00"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Set a competitive budget to attract quality freelancers
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/gigs')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Posting...' : 'Post Gig'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
