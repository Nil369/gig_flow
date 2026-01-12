import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      // toast.success('Welcome back!');
      navigate('/gigs');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex md:items-center md:justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950 antialiased relative overflow-hidden">
      <div className="p-8 md:p-12 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
           <div className="inline-flex items-center justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="GigFlow Logo" 
                className="h-20 w-20 object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-gray-50 dark:via-gray-200 dark:to-gray-400 leading-tight">
              Welcome back <br /> to GigFlow.
            </h1>
            <p className="mt-6 font-medium text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
               The professional marketplace for top-tier freelancers. Sign in to manage your gigs, track bids, and grow your business.
            </p>
        </div>

         <div className="max-w-md w-full mx-auto rounded-2xl p-8 md:p-10 shadow-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 backdrop-blur-xl">
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
              Sign In
            </h2>
            <p className="text-gray-600 text-sm max-w-sm mt-2 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
     
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-5">
                <Label htmlFor="email" className="text-gray-900 dark:text-white font-semibold mb-2">Email Address</Label>
                <Input 
                   id="email" 
                   placeholder="you@example.com" 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-5">
                <Label htmlFor="password" className="text-gray-900 dark:text-white font-semibold mb-2">Password</Label>
                <PasswordInput 
                   id="password" 
                   placeholder="••••••••" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                />
              </LabelInputContainer>

              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center space-x-2.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 transition-all" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                </label>
                <Link to="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Forgot password?
                </Link>
              </div>
     
              <button
                className="bg-gradient-to-br relative group/btn from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 block w-full text-white rounded-lg h-12 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <BottomGradient />
              </button>
     
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
     
              <div className="flex flex-col space-y-4">
                 <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Create account
                    </Link>
                 </p>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};