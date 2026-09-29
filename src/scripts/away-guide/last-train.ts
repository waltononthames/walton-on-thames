// Enhancement for src/components/away-guide/LastTrainFinder.astro. Swaps the
// static tables for a finder: pick a day and how you are getting back to the
// station, and it works out when to leave the ground for each train.

type Row = { time: string; direction: string };
type Data = {
  allowance: number;
  walk: { road: number; towpath: number };
  driveMins: number;
  towpathAfterDark: string | null;
  bus: { route: string | null; journeyMins: number | null; walkFromStopMins: number | null; last: Record<string, string[]> };
  trains: Record<string, Row[]>;
};

const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const clock12 = (mins: number) => {
  const t = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60), m = t % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `.${String(m).padStart(2, '0')}` : ''}${h >= 12 ? 'pm' : 'am'}`;
};

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
    const mode = root.querySelector<HTMLInputElement>('input[name="finder-mode"]:checked')?.value ?? 'road';
    const rows = data.trains[day] ?? [];
    results.replaceChildren();

    const notes: Record<string, string> = {
      road: `Allows ${data.walk.road} minutes to walk by road and ${data.allowance} minutes to reach the platform.`,
      towpath: `Allows ${data.walk.towpath} minutes to walk by the towpath and ${data.allowance} minutes to reach the platform.${data.towpathAfterDark ? ` ${data.towpathAfterDark}.` : ''}`,
      taxi: `Allows ${data.driveMins} minutes by car and ${data.allowance} minutes to reach the platform. Add the time it takes a car to arrive, which can be longer after an evening match.`,
      bus: `Uses the last buses from the ground, allowing ${data.bus.walkFromStopMins ?? 0} minutes to walk to the stop and ${data.allowance} minutes to reach the platform.`,
    };
    note.textContent = notes[mode] ?? '';

    for (const r of rows) {
      const dep = toMin(r.time);
      let leave: number | null = null;
      if (mode === 'road') leave = dep - data.walk.road - data.allowance;
      else if (mode === 'towpath') leave = dep - data.walk.towpath - data.allowance;
      else if (mode === 'taxi') leave = dep - data.driveMins - data.allowance;
      else if (mode === 'bus' && data.bus.journeyMins != null) {
        // The latest bus that still reaches the station in time for this train.
        const fits = (data.bus.last[day] ?? []).map(toMin)
          .filter((b) => b + data.bus.journeyMins! + data.allowance <= dep)
          .sort((a, b) => b - a)[0];
        if (fits != null) leave = fits - (data.bus.walkFromStopMins ?? 0);
      }
      const li = document.createElement('li');
      if (leave == null) {
        li.innerHTML = `<span class="none">${clock12(dep)} towards ${r.direction}: no bus reaches the station in time. Walk, or book a car.</span>`;
      } else {
        li.innerHTML = `<span class="leave">${clock12(leave)}</span><span class="train">Leave the ground by then for the <strong>${clock12(dep)}</strong> towards ${r.direction}</span>`;
      }
      results.append(li);
    }
  };

  root.addEventListener('change', render);
  tool.hidden = false;
  staticPart.hidden = true;
  render();
}
