import { AUTH_STORAGE_KEY, type StoredAuth } from '../config/auth';

function normalizeAuth(raw: StoredAuth): StoredAuth {
  if (raw.welcomeComplete !== undefined && raw.tourComplete !== undefined) {
    return raw;
  }
  const legacyDone = Boolean(raw.onboardingComplete);
  return {
    ...raw,
    welcomeComplete: raw.welcomeComplete ?? legacyDone,
    tourComplete: raw.tourComplete ?? legacyDone,
  };
}

export function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    if (!parsed?.token) return null;
    return normalizeAuth(parsed);
  } catch {
    return null;
  }
}

export function saveStoredAuth(auth: StoredAuth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

/** After PIN / QR verify — welcome screen first, then app + optional in-app tour */
export function saveVerifiedSession(token: string) {
  saveStoredAuth({
    token,
    welcomeComplete: false,
    tourComplete: false,
    onboardingComplete: false,
    verifiedAt: Date.now(),
  });
}

/** Start in-app tour after login when not yet completed */
export function startTourIfNeeded() {
  if (needsTour()) {
    window.dispatchEvent(new CustomEvent('adgm-tour-start'));
  }
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function markWelcomeComplete() {
  const current = loadStoredAuth();
  if (!current) return;
  saveStoredAuth({ ...current, welcomeComplete: true });
}

export function markTourComplete() {
  const current = loadStoredAuth();
  if (!current) return;
  saveStoredAuth({
    ...current,
    tourComplete: true,
    onboardingComplete: true,
  });
}

/** @deprecated Use markTourComplete */
export function markOnboardingComplete() {
  markTourComplete();
}

export function needsWelcome(): boolean {
  const a = loadStoredAuth();
  return Boolean(a?.token && !a.welcomeComplete);
}

export function needsTour(): boolean {
  const a = loadStoredAuth();
  return Boolean(a?.token && a.welcomeComplete && !a.tourComplete);
}

export function isFullyAuthenticated(): boolean {
  const a = loadStoredAuth();
  return Boolean(a?.token && a.welcomeComplete && a.tourComplete);
}

export function restartProductTour() {
  const current = loadStoredAuth();
  if (!current?.token) return false;
  saveStoredAuth({
    ...current,
    welcomeComplete: true,
    tourComplete: false,
    onboardingComplete: false,
  });
  window.dispatchEvent(new CustomEvent('adgm-tour-start'));
  return true;
}

export function hasVerifiedToken(): boolean {
  return Boolean(loadStoredAuth()?.token);
}
