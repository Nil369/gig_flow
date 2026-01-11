import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Users, Shield, Zap, ArrowRight, Star } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Spotlight } from '@/components/ui/spotlight';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Quality Gigs',
      description: 'Find high-quality freelance opportunities from verified clients globally.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Talented Freelancers',
      description: 'Connect with skilled professionals ready to bring your ideas to life.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Platform',
      description: 'Built with enterprise-grade security to protect your data and transactions.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-time Updates',
      description: 'Get instant notifications when someone bids or hires you. Never miss an opportunity.',
    },
  ];

  const stats = [
    { label: 'Active Gigs', value: '1,200+' },
    { label: 'Freelancers', value: '5,000+' },
    { label: 'Completed Projects', value: '10,000+' },
    { label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-zinc-950 dark:via-blue-950/20 dark:to-zinc-950">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-zinc-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.6))] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold border border-blue-200 dark:border-blue-800 shadow-sm">
              <Star className="h-4 w-4 fill-current" />
              <span>#1 Trusted Freelance Platform</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                Find the Perfect
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600">Freelance Services</span>
              </h1>
              <div className="h-20 flex items-center justify-center">
                 <TextGenerateEffect 
                    words="Connect with talent. Build your dream. Succeed together." 
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto"
                 />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              {user ? (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/gigs')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 h-13 font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 transition-all hover:scale-105 active:scale-[0.98]"
                  >
                    Browse Gigs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/create-gig')}
                    className="text-lg px-8 h-12 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-slate-500 transition-all"
                  >
                    Post a Gig
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 h-12 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-105"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/gigs')}
                    className="text-lg px-8 h-12 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-slate-500 transition-all"
                  >
                    Explore Gigs
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Why Choose GigFlow?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We provide everything you need to succeed in the freelance economy with an enterprise-grade platform.
            </p>
          </div>
          <HoverEffect items={features} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-zinc-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="GigFlow Logo" 
              className="h-24 w-24 object-contain drop-shadow-2xl"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-blue-50 dark:text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of freelancers and clients already using GigFlow to transform the way they work.
          </p>
          <Button
            size="lg"
            onClick={() => navigate(user ? '/gigs' : '/register')}
            className="text-lg px-10 h-14 bg-white hover:bg-slate-50 text-blue-600 shadow-2xl hover:shadow-2xl transition-all hover:scale-105 font-semibold"
          >
            {user ? 'Browse Gigs' : 'Create Your Free Account'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
