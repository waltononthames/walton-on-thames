// Places markers on the static base maps built by scripts/build-gp-maps.mjs.
// The projection here must match that script's projector() exactly.
import mapMeta from '../../data/gp-maps.json';

// Bump after rebuilding the base maps: /images/* is cached for 7 days.
export const MAP_VERSION = '2026-09-21-2';

export interface Frame { south: number; north: number; west: number; east: number }
export interface BaseMap { src: string; frame: Frame; width: number; height: number }
export interface LatLng { lat: number; lng: number }

const M_PER_DEG_LAT = 111_220;

export function project(base: BaseMap, p: LatLng) {
  const { frame, width } = base;
  const mPerDegLon = M_PER_DEG_LAT * Math.cos(((frame.north + frame.south) / 2) * Math.PI / 180);
  const pxPerM = width / ((frame.east - frame.west) * mPerDegLon);
  return {
    x: (p.lng - frame.west) * mPerDegLon * pxPerM,
    y: (frame.north - p.lat) * M_PER_DEG_LAT * pxPerM,
    pxPerM,
  };
}

export const areaBase = mapMeta.area as BaseMap;

export function localBaseFor(slug: string): BaseMap | null {
  const key = (mapMeta.practiceLocal as Record<string, string>)[slug];
  return key ? ((mapMeta.local as Record<string, BaseMap>)[key] ?? null) : null;
}

export interface Crop { x: number; y: number; w: number; h: number }

// A crop of `base` containing every point with `padPx` to spare, widened to
// at least `minAspect` (w/h) so a tall cluster doesn't make a thin strip,
// and clamped to the base.
export function cropAround(base: BaseMap, points: LatLng[], padPx: number, minAspect = 1.25): Crop {
  const xy = points.map((p) => project(base, p));
  let x0 = Math.min(...xy.map((p) => p.x)) - padPx;
  let x1 = Math.max(...xy.map((p) => p.x)) + padPx;
  let y0 = Math.min(...xy.map((p) => p.y)) - padPx;
  let y1 = Math.max(...xy.map((p) => p.y)) + padPx;
  if ((x1 - x0) / (y1 - y0) < minAspect) {
    const want = (y1 - y0) * minAspect, grow = (want - (x1 - x0)) / 2;
    x0 -= grow; x1 += grow;
  } else if ((x1 - x0) / (y1 - y0) > 1.8) {
    const want = (x1 - x0) / 1.8, grow = (want - (y1 - y0)) / 2;
    y0 -= grow; y1 += grow;
  }
  const w = Math.min(x1 - x0, base.width), h = Math.min(y1 - y0, base.height);
  x0 = Math.max(0, Math.min(x0, base.width - w));
  y0 = Math.max(0, Math.min(y0, base.height - h));
  return { x: x0, y: y0, w, h };
}

// CSS that positions the full base image so only the crop shows through a
// container with the crop's aspect ratio.
export function baseImageStyle(base: BaseMap, crop: Crop): string {
  return [
    `width:${(base.width / crop.w) * 100}%`,
    `left:${(-crop.x / crop.w) * 100}%`,
    `top:${(-crop.y / crop.h) * 100}%`,
  ].join(';');
}

// Pushes marker badges apart so none overlaps another, keeping each as near
// its true point as it can. The page draws a leader line from the badge back
// to the true point whenever one has moved.
export function spreadMarkers<T extends { x: number; y: number }>(points: T[], radius: number, fixed: { x: number; y: number }[] = []) {
  const out = points.map((p) => ({ ...p, bx: p.x, by: p.y }));
  const minD = radius * 2.25;
  for (let iter = 0; iter < 200; iter++) {
    let moved = false;
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const a = out[i], b = out[j];
        let dx = b.bx - a.bx, dy = b.by - a.by;
        let d = Math.hypot(dx, dy);
        if (d >= minD) continue;
        // Identical points: separate along a fixed direction so the result
        // is deterministic.
        if (d < 0.01) { dx = 1; dy = 0.35 * (j % 2 ? 1 : -1); d = Math.hypot(dx, dy); }
        const push = (minD - d) / 2;
        a.bx -= (dx / d) * push; a.by -= (dy / d) * push;
        b.bx += (dx / d) * push; b.by += (dy / d) * push;
        moved = true;
      }
      for (const f of fixed) {
        const a = out[i];
        let dx = a.bx - f.x, dy = a.by - f.y;
        let d = Math.hypot(dx, dy);
        if (d >= minD) continue;
        if (d < 0.01) { dx = 0; dy = -1; d = 1; }
        a.bx += (dx / d) * (minD - d); a.by += (dy / d) * (minD - d);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}
