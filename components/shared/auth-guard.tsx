'use client';

import { useApp } from '@/lib/app-provider';
import { AppShell } from '@/components/shared/app-shell';
import { PageLoader } from '@/components/shared/empty-states';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useApp();

  if (!user) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
