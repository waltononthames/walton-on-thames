// The live map behind "Explore the live map" (src/components/away-guide/LiveMap.astro).
// MapLibre and its stylesheet are imported dynamically, so Vite puts them in
// a separate chunk that is only fetched when the reader taps the button. The
// stylesheet is imported as a URL and added as a <link> on the tap: a dynamic
// CSS import would be hoisted into the page head and block first render.
import maplibreCss from 'maplibre-gl/dist/maplibre-gl.css?url';

function loadCss(href: string) {
  return new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error('stylesheet failed'));
    document.head.append(link);
  });
}

type Marker = { id: string; lat: number; lng: number; category: string; badge: string; name: string };
type Data = { markers: Marker[]; lines: { road: number[][]; towpath: number[][] } };

const COLOURS: Record<string, string> = {
  pub: '#7A3E1D', food: '#B8862E', shop: '#3E6B3A', hotel: '#4B4F8C', bus: '#B3261E', place: '#0B242E',
};

for (const root of document.querySelectorAll<HTMLElement>('[data-live-map]')) {
  const button = root.querySelector<HTMLButtonElement>('[data-live-open]');
  const note = root.querySelector<HTMLElement>('[data-live-note]');
  const canvas = root.querySelector<HTMLElement>('[data-live-canvas]');
  const raw = root.querySelector('[data-live-data]')?.textContent;
  if (!button || !canvas || !raw) continue;
  button.hidden = false;
  if (note) note.hidden = false;

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Loading the map';
    try {
      const [{ default: maplibregl }] = await Promise.all([import('maplibre-gl'), loadCss(maplibreCss)]);
      const data = JSON.parse(raw) as Data;
      canvas.hidden = false;
      button.hidden = true;
      if (note) note.hidden = true;
      const lats = data.markers.map((m) => m.lat), lngs = data.markers.map((m) => m.lng);
      const map = new maplibregl.Map({
        container: canvas,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        bounds: [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
        fitBoundsOptions: { padding: 40 },
        attributionControl: { compact: false },
        cooperativeGestures: true,
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }));
      map.on('load', () => {
        for (const [id, colour, dash] of [['road', '#0B242E', undefined], ['towpath', '#2F7A8C', [2, 1.5]]] as const) {
          map.addSource(`route-${id}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: data.lines[id] } } });
          map.addLayer({ id: `route-${id}`, type: 'line', source: `route-${id}`, paint: { 'line-color': colour, 'line-width': 4, 'line-opacity': 0.75, ...(dash ? { 'line-dasharray': [...dash] } : {}) } });
        }
      });
      for (const m of data.markers) {
        const el = document.createElement('span');
        el.textContent = m.badge;
        el.setAttribute('aria-label', m.name);
        el.style.cssText = `display:grid;place-items:center;min-width:26px;height:26px;padding:0 4px;border-radius:999px;border:2px solid #fff;background:${COLOURS[m.category] ?? '#0B242E'};color:${m.category === 'food' ? '#0B242E' : '#fff'};font:700 12px Inter,system-ui,sans-serif;box-shadow:0 1px 4px rgba(0,0,0,.3)`;
        new maplibregl.Marker({ element: el })
          .setLngLat([m.lng, m.lat])
          .setPopup(new maplibregl.Popup({ offset: 16 }).setText(m.name))
          .addTo(map);
      }
    } catch {
      button.disabled = false;
      button.textContent = 'The live map could not load. Try again';
    }
  });
}
