/** Whether Claude failed for a reason where offline KB answers are acceptable. */
export function shouldFallbackToOfflineKb(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('credit balance') ||
    m.includes('too low') ||
    m.includes('billing') ||
    m.includes('purchase credits') ||
    m.includes('quota') ||
    m.includes('rate limit') ||
    m.includes('overloaded') ||
    m.includes('529') ||
    m.includes('empty response from claude')
  );
}

export function offlineFallbackBanner(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('credit') || m.includes('billing') || m.includes('purchase credits')) {
    return '> ⚠️ **Claude API unavailable** — Anthropic account needs credits. Showing a knowledge-base answer below. Add credits at [console.anthropic.com](https://console.anthropic.com/settings/billing).\n\n';
  }
  return '> ⚠️ **Claude API temporarily unavailable.** Showing a knowledge-base answer below.\n\n';
}
