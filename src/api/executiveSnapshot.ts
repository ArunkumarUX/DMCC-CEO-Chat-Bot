import type { ExecutiveState } from '../data/executiveStore';

export type ExecutiveSnapshotPatch = {
  version: number;
  lastSync: string;
  refreshedAt?: string;
  timezone?: string;
  meetings: ExecutiveState['meetings'];
  actionRegister: ExecutiveState['actionRegister'];
  marketSnapshot: ExecutiveState['marketSnapshot'];
  metrics: Partial<ExecutiveState['metrics']> & { openActions?: number };
  documentUploadedAt?: Record<string, string>;
  regulatoryHeadline?: string;
};

export async function fetchExecutiveSnapshotPatch(): Promise<ExecutiveSnapshotPatch | null> {
  try {
    const res = await fetch('/api/executive/snapshot', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as { ok?: boolean; patch?: ExecutiveSnapshotPatch };
    return data.patch ?? null;
  } catch {
    return null;
  }
}
