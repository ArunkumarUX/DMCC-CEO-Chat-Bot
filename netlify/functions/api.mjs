import { handleApiRequest } from '../../server/apiRouter.mjs';
import { createAuthSessionStore } from '../../server/authSessionStore.mjs';

/** Route this function at /api/* so paths match apiRouter (/api/health, /api/auth/login, …). */
export const config = {
  path: '/api/*',
};

export default async function handler(request) {
  try {
    return await handleApiRequest(request, { sessionStore: createAuthSessionStore });
  } catch (err) {
    console.error('[netlify/api]', err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }
}
