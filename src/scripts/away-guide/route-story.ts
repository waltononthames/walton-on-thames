// Enhancement for src/components/away-guide/RouteStory.astro. The component
// is complete without this: it adds the pinned map, the line that draws up to
// the step being read, and the map moving to frame each step.
//
// Nothing here runs until the story is near the viewport, so it costs nothing
// on first paint.

const STEP_SPAN_M = 700; // how much ground a single step's view covers
const PAD = 0.06; // margin around the route in the overview, as a fraction

type Box = { x0: number; y0: number; x1: number; y1: number };

function init(root: HTMLElement) {
  const W = Number(root.dataset.mapWidth);
  const H = Number(root.dataset.mapHeight);
  const viewport = root.querySelector<HTMLElement>('.map-viewport');
  const stage = root.querySelector<HTMLElement>('.map-stage');
  if (!viewport || !stage || !W || !H) return;

  // RouteStory.astro sets these and the class while the page loads; repeated
  // here so the script also works on its own.
  root.style.setProperty('--map-w-px', `${W}px`);
  root.style.setProperty('--map-h-px', `${H}px`);
  root.classList.add('is-enhanced');

  // Map pixels per metre, from the scale the build used. The route's own
  // bounding box is in map pixels; STEP_SPAN_M is converted with this.
  const pxPerM = Number(root.dataset.pxPerM) || 0.5;

  let current: HTMLElement | null = null;

  const radios = [...root.querySelectorAll<HTMLInputElement>('input[name="walk-route"]')];
  const routeNow = () => radios.find((r) => r.checked)?.value ?? radios[0]?.value;
  const listFor = (route: string) => root.querySelector<HTMLOListElement>(`.steps[data-route="${route}"]`);

  function frame(box: Box) {
    const vw = viewport!.clientWidth;
    const vh = viewport!.clientHeight;
    // Screen margin around the box, wider at the sides so the station and
    // ground labels, which sit to the right of their markers, stay in view.
    const padX = vw < 500 ? 56 : 96;
    const padY = 28;
    const bw = Math.max(1, box.x1 - box.x0);
    const bh = Math.max(1, box.y1 - box.y0);
    const s = Math.min((vw - 2 * padX) / bw, (vh - 2 * padY) / bh);
    const cx = (box.x0 + box.x1) / 2;
    const cy = (box.y0 + box.y1) / 2;
    // Keep the base map covering the viewport: never show past its edge.
    const clamp = (t: number, size: number, view: number) => (size * s >= view ? Math.min(0, Math.max(view - size * s, t)) : (view - size * s) / 2);
    const tx = clamp(vw / 2 - cx * s, W, vw);
    const ty = clamp(vh / 2 - cy * s, H, vh);
    stage!.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    // Lines and markers keep a constant size on screen whatever the zoom.
    stage!.style.setProperty('--inv', String(1 / s));
  }

  function overviewBox(list: HTMLOListElement): Box {
    const [x0, y0, x1, y1] = (list.dataset.box ?? `0,0,${W},${H}`).split(',').map(Number);
    const px = (x1 - x0) * PAD;
    const py = (y1 - y0) * PAD;
    return { x0: x0 - px, y0: y0 - py, x1: x1 + px, y1: y1 + py };
  }

  function activate(step: HTMLElement) {
    const list = step.closest<HTMLOListElement>('.steps');
    if (!list || list.dataset.route !== routeNow()) return;
    current?.classList.remove('is-current');
    current = step;
    step.classList.add('is-current');

    const route = list.dataset.route!;
    const progress = Number(step.dataset.progress ?? 1);
    const line = root.querySelector<SVGPathElement>(`[data-route-line="${route}"]`);
    if (line) line.style.strokeDashoffset = String(1000 * (1 - progress));

    const n = Number(step.dataset.n ?? 0);
    for (const mark of root.querySelectorAll<SVGGElement>(`[data-mark^="${route}-"]`)) {
      const m = Number(mark.dataset.mark!.split('-').pop());
      const overview = step.dataset.focus === 'overview';
      mark.classList.toggle('is-reached', overview || m <= n);
      mark.classList.toggle('is-current', !overview && m === n);
    }

    if (step.dataset.focus === 'overview') {
      frame(overviewBox(list));
    } else {
      const x = Number(step.dataset.x), y = Number(step.dataset.y);
      const half = (STEP_SPAN_M * pxPerM) / 2;
      frame({ x0: x - half, y0: y - half, x1: x + half, y1: y + half });
    }
  }

  // The step nearest the reading line is current. On phones the map takes the
  // top of the screen, so the reading line sits lower.
  const narrow = window.matchMedia('(max-width: 899px)');
  let io: IntersectionObserver | null = null;
  function observe() {
    io?.disconnect();
    io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) activate(e.target as HTMLElement);
    }, { rootMargin: narrow.matches ? '-68% 0px -30% 0px' : '-48% 0px -50% 0px' });
    const list = listFor(routeNow());
    list?.querySelectorAll<HTMLElement>('.step').forEach((s) => io!.observe(s));
  }

  for (const r of radios) {
    r.addEventListener('change', () => {
      const list = listFor(routeNow());
      const overview = list?.querySelector<HTMLElement>('.step--overview');
      // The other route's line goes back to fully drawn, as its muted track.
      for (const l of root.querySelectorAll<SVGPathElement>('[data-route-line]')) l.style.strokeDashoffset = '0';
      if (overview) activate(overview);
      observe();
    });
  }
  narrow.addEventListener('change', observe);
  window.addEventListener('resize', () => { if (current) activate(current); }, { passive: true });

  const start = listFor(routeNow())?.querySelector<HTMLElement>('.step--overview');
  if (start) activate(start);
  observe();
}

for (const root of document.querySelectorAll<HTMLElement>('.route-story')) {
  const near = new IntersectionObserver((entries, obs) => {
    if (entries.some((e) => e.isIntersecting)) {
      obs.disconnect();
      init(root);
    }
  }, { rootMargin: '600px 0px' });
  near.observe(root);
}
