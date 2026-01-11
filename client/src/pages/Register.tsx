import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(name, email, password);
      // toast.success('Account created successfully!');
      navigate('/gigs');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
              Start your <br /> journey.
            </h1>
            <p className="mt-6 font-medium text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
               Join thousands of professionals on GigFlow. Showcase your talent, find amazing projects, and get paid securely.
            </p>
        </div>

         <div className="max-w-md w-full mx-auto rounded-2xl p-8 md:p-10 shadow-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 backdrop-blur-xl">
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm max-w-sm mt-2 dark:text-gray-400">
              Fill in the details to get started
            </p>
     
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-5">
                <LabelInputContainer>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </LabelInputContainer>
              </div>

              <LabelInputContainer className="mb-5">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                   id="email" 
                   placeholder="you@example.com" 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                />
              </LabelInputContainer>
              
              <LabelInputContainer className="mb-8">
                <Label htmlFor="password">Password</Label>
                <PasswordInput 
                   id="password" 
                   placeholder="Create a strong password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   minLength={8}
                   className="mb-4 dark:bg-slate-800 dark:border-slate-700"
                   showStrength={true}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Must be at least 8 characters long.
                </p>
              </LabelInputContainer>
     
              <button
                className="bg-gradient-to-br relative group/btn from-blue-600 dark:from-blue-600 dark:to-blue-700 to-blue-700 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--blue-800)_inset,0px_-1px_0px_0px_var(--blue-800)_inset]"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
                <BottomGradient />
              </button>
     
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
     
              <div className="flex flex-col space-y-4">
                 <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Sign In
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