import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ModeToggle } from './mode-toggle';
import { Plus, User, LogOut, Menu, Bell, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { Badge } from './ui/badge';


const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
  >
    {children}
  </Link>
);

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications, clearNotifications } = useSocket();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/logo.png" 
              alt="GigFlow Logo" 
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
            />
            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
              GigFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/gigs">Find Work</NavLink>
            {user && (
              <>
                <NavLink to="/my-gigs">My Gigs</NavLink>
                <NavLink to="/my-bids">My Bids</NavLink>
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <ModeToggle />

          {user ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    {notifications.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold animate-pulse ring-2 ring-white dark:ring-zinc-950 shadow-lg"
                      >
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 pt-2">
                      <DropdownMenuLabel className="text-gray-900 dark:text-white font-bold">Notifications</DropdownMenuLabel>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => clearNotifications()}
                          className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{notification.message}</p>
                          {notification.gigTitle && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                              {notification.gigTitle}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Create Gig Button */}
              <Button
                onClick={() => navigate('/create-gig')}
                size="sm"
                className="hidden md:flex items-center gap-2 font-semibold"
              >
                <Plus className="h-4 w-4" />
                Post a Gig
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-zinc-700 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-2xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none truncate text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs leading-none text-gray-600 dark:text-gray-400 truncate font-medium">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                  <DropdownMenuItem onClick={() => navigate('/my-gigs')} className="cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300">
                    <Briefcase className="mr-2 h-4 w-4" />
                    My Gigs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-bids')} className="cursor-pointer font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300">
                    <User className="mr-2 h-4 w-4" />
                    My Bids
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400 cursor-pointer font-semibold">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold"
              >
                Log in
              </Button>
              <Button
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4 animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/gigs"
              className="text-sm font-medium text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Work
            </Link>
            <Link
              to="/freelancers"
              className="text-sm font-medium text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Talent
            </Link>
            {user && (
              <>
                <Link
                  to="/my-gigs"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Gigs
                </Link>
                <Link
                  to="/my-bids"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bids
                </Link>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      navigate('/create-gig');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Gig
                  </Button>
                </div>
              </>
            )}
            {!user && (
               <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                 <Button onClick={() => navigate('/register')}>Sign Up</Button>
               </div>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
};
