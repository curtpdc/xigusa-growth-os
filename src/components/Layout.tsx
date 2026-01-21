import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';
import { 
  Home, FileText, Wrench, Send, TrendingUp, 
  Menu, X, LogIn, LogOut, User 
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { instance, accounts } = useMsal();
  const location = useLocation();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Content Machine', href: '/content', icon: FileText },
    { name: 'Technical Tracker', href: '/technical', icon: Wrench },
    { name: 'Outreach Pipeline', href: '/outreach', icon: Send },
    { name: 'Growth Metrics', href: '/metrics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">XIGUSA Growth OS</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Button */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center text-sm text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    {accounts[0]?.name || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-blue-700"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 pt-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium bg-primary text-white"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2026 XIGUSA. Powered by Azure + Microsoft 365.
          </p>
        </div>
      </footer>
    </div>
  );
}
