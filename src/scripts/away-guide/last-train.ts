// Enhancement for src/components/away-guide/LastTrainFinder.astro. Swaps the
// static tables for a finder: pick a day and how you are getting back to the
// station, and it lists the trains you can catch after full time, with when
// to leave the ground for each. The arithmetic is shared with the server
// render in src/utils/trainTimes.ts.
import { clockFromMinutes, plan, serviceMinutes, type FinderData, type Mode } from '../../utils/trainTimes';

type Data = FinderData & { towpathAfterDark: string | null; busRoute: string | null };

for (const root of document.querySelectorAll<HTMLElement>('[data-finder]')) {
  const raw = root.querySelector('[data-finder-data]')?.textContent;
  const tool = root.querySelector<HTMLElement>('.finder-tool');
  const staticPart = root.querySelector<HTMLElement>('.finder-static');
  const results = root.querySelector<HTMLOListElement>('[data-finder-results]');
  const note = root.querySelector<HTMLElement>('[data-finder-note]');
  if (!raw || !tool || !staticPart || !results || !note) continue;
  const data = JSON.parse(raw) as Data;

  const render = () => {
    const day = root.querySelector<HTMLInputElement>('input[name="finder-day"]:checked')?.value ?? 'saturday';
    const mode = (root.querySelector<HTMLInputElement>('input[name="finder-mode"]:checked')?.value ?? 'road') as Mode;
    const { fullTime, rows } = plan(data, day, mode);
    results.replaceChildren();

    const ft = fullTime == null ? '' : `Full time is usually around ${clockFromMinutes(fullTime)}. `;
    const bus = data.busRoute ? `the ${data.busRoute}` : 'the bus';
    const notes: Record<Mode, string> = {
      road: `${ft}Allows ${data.walk.road} minutes to walk by road and ${data.allowance} minutes to reach the platform.`,
      towpath: `${ft}Allows ${data.walk.towpath} minutes to walk by the river and ${data.allowance} minutes to reach the platform.${data.towpathAfterDark ? ` ${data.towpathAfterDark}.` : ''}`,
      taxi: `${ft}Allows ${data.driveMins} minutes by car and ${data.allowance} minutes to reach the platform. Add the time a car takes to arrive, which can be longer after an evening match.`,
      bus: `${ft}Takes ${bus} from the Xcel to Church Street, then a ${data.bus.stopToStation} minute walk to the station. It runs in the daytime only.`,
    };
    note.textContent = notes[mode];

    if (rows.length === 0) {
      const li = document.createElement('li');
      li.innerHTML = `<span class="none">${mode === 'bus' ? `No bus runs after full time on this day. Walk, or book a car.` : 'No trains found for this choice.'}</span>`;
      results.append(li);
      return;
    }
    for (const r of rows) {
      const li = document.createElement('li');
      li.innerHTML = `<span class="leave">${clockFromMinutes(r.leaveBy)}</span><span class="train">Leave the ground by then for the <strong>${clockFromMinutes(serviceMinutes(r.train.time))}</strong> towards ${r.train.direction}${r.last ? ', the last train that way' : ''}</span>`;
      results.append(li);
    }
  };

  root.addEventListener('change', render);
  tool.hidden = false;
  staticPart.hidden = true;
  render();
}
