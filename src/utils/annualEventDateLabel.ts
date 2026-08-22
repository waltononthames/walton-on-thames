// Brief section 4.2: the visible date label for an annual event is always
// generated at build time from dateStatus + nextStartDate, never hand-set,
// so a lapsed date can't sit on the live site until someone remembers to
// update it. Reused by the hub and the future /things-to-do/annual-events/
// filter page.
export interface AnnualEventDateFields {
  dateStatus: 'confirmed' | 'provisional' | 'to_be_announced' | 'cancelled' | 'completed';
  nextStartDate?: string;
  nextEndDate?: string;
  usualTiming: string;
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function getAnnualEventDateLabel(event: AnnualEventDateFields): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = event.nextStartDate ? new Date(event.nextStartDate + 'T00:00:00') : null;

  if (event.dateStatus === 'cancelled') {
    const year = event.nextStartDate ? new Date(event.nextStartDate).getFullYear() : new Date().getFullYear();
    return `Cancelled for ${year} (usually ${event.usualTiming})`;
  }

  if (event.dateStatus === 'confirmed' && start && start >= today) {
    if (event.nextEndDate && event.nextEndDate !== event.nextStartDate) {
      return `${formatDate(event.nextStartDate!)} to ${formatDate(event.nextEndDate)}`;
    }
    return formatDate(event.nextStartDate!);
  }

  // confirmed-but-past, completed, to_be_announced, provisional all fall
  // through to the same "next date to be announced" treatment.
  return `Next date to be announced (usually ${event.usualTiming})`;
}
