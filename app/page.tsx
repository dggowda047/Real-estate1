'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const demoAccounts = [
  { role: 'Agency Admin', email: 'rahul@prestigerealty.in', desc: 'Full agency access' },
  { role: 'Agent', email: 'priya@prestigerealty.in', desc: 'Agent workflows' },
  { role: 'Team Manager', email: 'vikram@prestigerealty.in', desc: 'Team management' },
  { role: 'Super Admin', email: 'admin@estateos.com', desc: 'Platform access' },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        toast.success('Welcome back!');
        router.push('/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
        setLoading(false);
      }
    }, 600);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-sidebar to-sidebar" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-sidebar-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">EstateOS</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              The Operating System for Real Estate Businesses
            </h1>
            <p className="text-sidebar-foreground/70 text-lg leading-relaxed">
              Manage leads, properties, site visits, deals, and commissions — all in one place.
              Built for agents and agencies in Bengaluru.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: 'Leads Managed', value: '10,000+' },
                { label: 'Properties Listed', value: '5,000+' },
                { label: 'Deals Closed', value: '1,200+' },
                { label: 'Commission Tracked', value: 'Rs. 50Cr+' },
              ].map((stat) => (
                <div key={stat.label} className="border border-sidebar-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-sidebar-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-sidebar-foreground/40">
            Trusted by real estate professionals across Bengaluru
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">EstateOS</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@agency.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Demo Accounts — Click to fill
            </p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => fillDemo(acc.email)}
                  className="w-full flex items-center justify-between p-2.5 rounded-md border hover:border-primary/50 hover:bg-muted/50 transition-base text-left"
                >
                  <div>
                    <p className="text-sm font-medium">{acc.role}</p>
                    <p className="text-xs text-muted-foreground">{acc.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{acc.desc}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Any password works for demo accounts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
