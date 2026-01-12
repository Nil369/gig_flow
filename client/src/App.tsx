import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowseGigs } from './pages/BrowseGigs';
import { GigDetail } from './pages/GigDetail';
import { CreateGig } from './pages/CreateGig';
import { MyGigs } from './pages/MyGigs';
import { MyBids } from './pages/MyBids';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="gigflow-theme">
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
              <Navbar />
              <main className="flex-1 bg-white dark:bg-zinc-950 pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/gigs" element={<BrowseGigs />} />
                  <Route path="/gigs/:id" element={<GigDetail />} />
                  <Route
                    path="/create-gig"
                    element={
                      <ProtectedRoute>
                        <CreateGig />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-gigs"
                    element={
                      <ProtectedRoute>
                        <MyGigs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-bids"
                    element={
                      <ProtectedRoute>
                        <MyBids />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster 
              richColors 
              position="top-right" 
              expand={true} 
              closeButton 
              duration={4000}
              toastOptions={{
                classNames: {
                  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
                  success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
                  warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
                  info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
                },
              }}
            />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
