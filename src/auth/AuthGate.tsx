import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { WELCOME_PATH } from '../config/auth';
import { hasVerifiedToken, needsWelcome } from './authStorage';

/** Requires PIN verification */
export function RequireAuth({ children }: { children: ReactNode }) {
  if (!hasVerifiedToken()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/** Requires verified session and completed welcome screen */
export function RequireOnboarding({ children }: { children: ReactNode }) {
  if (!hasVerifiedToken()) {
    return <Navigate to="/" replace />;
  }
  if (needsWelcome()) {
    return <Navigate to={WELCOME_PATH} replace />;
  }
  return children;
}
