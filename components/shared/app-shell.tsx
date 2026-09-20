'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/app-provider';
import { Building2, LayoutDashboard, Users, MapPin, UserCircle, Handshake, ClipboardList,
         Home, GitCompareArrows, Calendar, BadgeIndianRupee, MessageSquare, CheckSquare,
         BarChart3, Plug, Settings, ChevronLeft, Bell, Search, Menu, X, LogOut, Globe } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  badge?: string;
}

const navSections: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Leads', href: '/leads', icon: Users },
      { label: 'Properties', href: '/properties', icon: Home },
      { label: 'Customers', href: '/customers', icon: UserCircle },
      { label: 'Property Owners', href: '/owners', icon: Building2 },
      { label: 'Matching', href: '/matching', icon: GitCompareArrows },
      { label: 'Site Visits', href: '/visits', icon: Calendar },
      { label: 'Deals', href: '/deals', icon: Handshake },
      { label: 'Commissions', href: '/commissions', icon: BadgeIndianRupee },
    ],
  },
  {
    title: 'Workflow',
    items: [
      { label: 'Communications', href: '/communications', icon: MessageSquare },
      { label: 'Tasks & Follow-ups', href: '/tasks', icon: CheckSquare },
      { label: 'Reports', href: '/reports', icon: BarChart3 },
      { label: 'Integrations', href: '/integrations', icon: Plug },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Team', href: '/team', icon: ClipboardList },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

const mobileNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/leads', icon: Users },
  { label: 'Properties', href: '/properties', icon: Home },
  { label: 'Visits', href: '/visits', icon: Calendar },
  { label: 'Deals', href: '/deals', icon: Handshake },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      {navSections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {section.title}
            </p>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-base',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground'
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto h-5 px-1.5 text-xs bg-primary-foreground/20 text-primary-foreground border-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout, notifications, unreadCount, markAllRead, sidebarOpen, setSidebarOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return <>{children}</>;

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const roleLabel = user.role.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-foreground/10">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-foreground/10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-sidebar-foreground truncate">EstateOS</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">{user.agencyName || 'Platform Admin'}</p>
          </div>
        </div>
        <SidebarContent />
        <div className="border-t border-sidebar-foreground/10 p-3">
          <div className="flex items-center gap-2 px-2 py-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{roleLabel}</p>
            </div>
            <button
              onClick={() => { logout(); toast.success('Signed out successfully'); }}
              className="text-sidebar-foreground/50 hover:text-sidebar-foreground p-1.5 rounded-md hover:bg-sidebar-foreground/10 transition-base"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 flex flex-col bg-sidebar text-sidebar-foreground animate-slide-in-right">
            <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-foreground/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="font-bold text-sm text-sidebar-foreground">EstateOS</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-sidebar-foreground/70">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Bengaluru</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-md hover:bg-muted transition-base">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">No notifications</p>
                  ) : notifications.slice(0, 6).map((n) => (
                    <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-3 px-3">
                      <div className="flex items-center gap-2 w-full">
                        <span className={cn('w-2 h-2 rounded-full flex-shrink-0', n.read ? 'bg-transparent' : 'bg-primary')} />
                        <span className="text-sm font-medium flex-1">{n.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-4">{n.message}</p>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-base">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => { logout(); toast.success('Signed out successfully'); }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex items-center justify-around h-16 z-40 px-2">
          {mobileNavItems.map((item) => {
            const isActive = usePathname() === item.href || usePathname().startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-base',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
