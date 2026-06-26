import { createBlobAuthStore } from './blobAuthStore.mjs';
import { createMemoryAuthStore } from './memoryAuthStore.mjs';
import { createNetlifyBlobAuthStore } from './netlifyBlobAuthStore.mjs';

/** Production: Netlify Blobs, Vercel Blob, or in-memory for local dev. */
export function createAuthSessionStore() {
  if (process.env.NETLIFY === 'true' || process.env.NETLIFY_LOCAL === 'true') {
    return createNetlifyBlobAuthStore();
  }
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
    return createBlobAuthStore();
  }
  if (process.env.VERCEL) {
    console.warn(
      '[auth] BLOB_READ_WRITE_TOKEN missing — QR sessions will not sync across serverless instances. Link a Blob store in Vercel → Storage.',
    );
  }
  return createMemoryAuthStore();
}
