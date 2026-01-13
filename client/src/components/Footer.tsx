import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/logo.png"
                alt="GigFlow Logo"
                className="h-10 w-10 object-contain group-hover:scale-105 transition-all drop-shadow-lg"
              />
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
                GigFlow
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed font-medium">
              The modern freelance marketplace connecting talent with opportunity. Built for professionals.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/gigs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/create-gig" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Post a Gig
                </Link>
              </li>
              <li>
                <Link to="/my-gigs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  My Gigs
                </Link>
              </li>
              <li>
                <Link to="/my-bids" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  My Bids
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Nil369/gig_flow"
                target='_blank'
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/HalderXi"
                target='_blank'
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-halder-nil/"
                target='_blank'
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            © 2026 GigFlow. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Built with ❤️ for freelancers and clients
          </p>
        </div>
      </div>
    </footer>
  );
};
