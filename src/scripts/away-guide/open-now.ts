// "Open now" labels and filters for src/components/away-guide/VenueList.astro.
// Computed in Europe/London time from each venue's sourced hours. A venue
// without sourced hours has no data-hours attribute and never gets a label.
import { isOpenAt, londonNow, type Hours } from '../../utils/openingHours';

function refresh() {
  const { day, mins } = londonNow();
  for (const li of document.querySelectorAll<HTMLElement>('[data-venues] [data-hours]')) {
    const open = isOpenAt(JSON.parse(li.dataset.hours!) as Hours, day, mins);
    li.dataset.openNow = String(open);
    const label = li.querySelector<HTMLElement>('[data-open-label]');
    if (label) {
      label.hidden = false;
      label.dataset.state = open ? 'open' : 'closed';
      label.textContent = open ? 'Open now' : 'Closed now';
    }
  }
}

for (const box of document.querySelectorAll<HTMLElement>('[data-venue-filters]')) {
  const list = box.nextElementSibling;
  if (!list) continue;
  box.hidden = false;
  box.addEventListener('change', () => {
    const now = box.querySelector<HTMLInputElement>('[data-filter="now"]')?.checked;
    const evening = box.querySelector<HTMLInputElement>('[data-filter="evening"]')?.checked;
    for (const li of list.querySelectorAll<HTMLElement>('.venue')) {
      // With a filter on, venues without sourced hours are hidden: we cannot
      // say they are open.
      li.hidden = Boolean((now && li.dataset.openNow !== 'true') || (evening && li.dataset.evening !== 'true'));
    }
  });
}

refresh();
setInterval(refresh, 60_000);
