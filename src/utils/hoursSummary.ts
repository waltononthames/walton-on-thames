// Collapses a week of opening hours into short runs, e.g.
// "Mon–Fri 9am–6:30pm · Sat 9am–1pm · Sun closed". Days missing from the
// record are left out rather than guessed.
const ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const SHORT: Record<string, string> = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };

export function summariseHours(hours: Record<string, string> | undefined): string[] {
  if (!hours) return [];
  const runs: { from: string; to: string; value: string }[] = [];
  for (const d of ORDER) {
    const value = hours[d];
    if (!value) continue;
    const last = runs[runs.length - 1];
    const prevDay = last ? ORDER[ORDER.indexOf(last.to as typeof ORDER[number]) + 1] : null;
    if (last && last.value === value && prevDay === d) last.to = d;
    else runs.push({ from: d, to: d, value });
  }
  return runs.map((r) => `${SHORT[r.from]}${r.from === r.to ? '' : `–${SHORT[r.to]}`} ${/^closed$/i.test(r.value) ? 'closed' : r.value}`);
}
