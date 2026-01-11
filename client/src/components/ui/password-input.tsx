import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
  onStrengthChange?: (strength: number) => void;
}

export const PasswordInput = ({ 
  className, 
  showStrength = false, 
  onStrengthChange,
  value,
  onChange,
  ...props 
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalPassword, setInternalPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const currentValue = value !== undefined ? String(value) : internalPassword;

  const calculateStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return 0;

    // Length check
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;

    // Contains lowercase
    if (/[a-z]/.test(pass)) score += 10;

    // Contains uppercase
    if (/[A-Z]/.test(pass)) score += 15;

    // Contains numbers
    if (/\d/.test(pass)) score += 15;

    // Contains special characters
    if (/[^A-Za-z0-9]/.test(pass)) score += 10;

    return Math.min(score, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    if (value === undefined) {
      setInternalPassword(newPassword);
    }
    
    if (showStrength) {
      const newStrength = calculateStrength(newPassword);
      setStrength(newStrength);
      onStrengthChange?.(newStrength);
    }

    onChange?.(e);
  };


  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 60) return 'bg-yellow-500';
    if (strength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            'h-11 w-full min-w-0 rounded-lg border border-input bg-background px-4 py-2.5 pr-12 text-sm font-medium text-gray-900 shadow-sm transition-all outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-ring/60 dark:hover:border-ring/40',
            'focus:border-ring focus:ring-4 focus:ring-ring/10',
            'dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-gray-500',
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      
      {showStrength && currentValue.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', getStrengthColor())}
                style={{ width: `${strength}%` }}
              />
            </div>
            <span className={cn('text-xs font-medium', 
              strength < 30 ? 'text-red-500' :
              strength < 60 ? 'text-yellow-500' :
              strength < 80 ? 'text-blue-500' :
              'text-green-500'
            )}>
              {getStrengthText()}
            </span>
          </div>
          {currentValue.length < 8 && (
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters
            </p>
          )}
        </div>
      )}
    </div>
  );
};
