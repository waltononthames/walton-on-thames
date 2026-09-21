// Tests for src/utils/pharmacyRanking.ts. Run with `npm run test:pharmacies`.
// Needs Node 23.6 or later, which imports TypeScript directly. Not part of
// prebuild, so the Cloudflare build never depends on it.
//
// Every place and route below is a made-up fixture. Nothing here is read by
// the site, and none of these numbers may be copied into
// src/data/pharmacy-routes.json.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankPharmacies, candidatesFor, straightLineMetres, formatDuration, formatDistance } from '../src/utils/pharmacyRanking.ts';

const origin = { slug: 'fixture-practice', lat: 51.38, lng: -0.40 };
const P = (slug, name, dLat, dLng) => ({ slug, name, lat: 51.38 + dLat, lng: -0.40 + dLng });
const near = P('near', 'Near Pharmacy', 0.001, 0);
const far = P('far', 'Far Pharmacy', 0.02, 0);
const alpha = P('alpha', 'Alpha Pharmacy', 0.005, 0);
const beta = P('beta', 'Beta Pharmacy', 0.005, 0.001);
const outside = P('outside', 'Outside Pharmacy', 0.1, 0);

const route = (destination, duration_s, distance_m, mode = 'drive') => ({
  mode, origin: 'fixture-practice', destination, duration_s, distance_m,
  provider: 'fixture', profile: mode === 'drive' ? 'car' : 'foot', calculated_at: '2000-01-01T00:00:00Z',
});

test('road time decides the order, not straight-line distance', () => {
  // "far" is 2 km away in a straight line but quicker by road.
  const r = rankPharmacies(origin, 'drive', [near, far], [route('near', 600, 3000), route('far', 300, 2500)]);
  assert.deepEqual(r.ranked.map((e) => e.item.slug), ['far', 'near']);
  assert.deepEqual(r.ranked.map((e) => e.rank), [1, 2]);
});

test('equal times break on road distance, then on name', () => {
  const byDistance = rankPharmacies(origin, 'drive', [alpha, beta], [route('alpha', 300, 2000), route('beta', 300, 1500)]);
  assert.deepEqual(byDistance.ranked.map((e) => e.item.slug), ['beta', 'alpha']);
  const byName = rankPharmacies(origin, 'drive', [beta, alpha], [route('alpha', 300, 1500), route('beta', 300, 1500)]);
  assert.deepEqual(byName.ranked.map((e) => e.item.slug), ['alpha', 'beta']);
});

test('a missing route is unavailable, unnumbered and never ranked as quickest', () => {
  const r = rankPharmacies(origin, 'drive', [near, far], [route('far', 900, 5000)]);
  assert.deepEqual(r.ranked.map((e) => e.item.slug), ['far']);
  assert.equal(r.unavailable.length, 1);
  assert.equal(r.unavailable[0].item.slug, 'near');
  assert.equal(r.unavailable[0].rank, null);
  assert.equal(r.unavailable[0].route, null);
});

test('malformed durations are treated as unavailable, not as zero', () => {
  const r = rankPharmacies(origin, 'drive', [near, far], [route('near', Number.NaN, 100), route('far', -5, 100)]);
  assert.equal(r.ranked.length, 0);
  assert.equal(r.hasRoutes, false);
  assert.equal(r.unavailable.length, 2);
});

test('with no routes at all, nothing is ranked and the list keeps every candidate', () => {
  const r = rankPharmacies(origin, 'drive', [far, near], []);
  assert.equal(r.hasRoutes, false);
  assert.equal(r.calculatedAt, null);
  assert.deepEqual(r.unavailable.map((e) => e.item.slug), ['near', 'far']);
});

test('walking is ranked from walking routes only', () => {
  const routes = [
    route('near', 600, 3000, 'drive'), route('far', 300, 2500, 'drive'),
    route('near', 240, 200, 'walk'), route('far', 1800, 2300, 'walk'),
  ];
  assert.deepEqual(rankPharmacies(origin, 'drive', [near, far], routes).ranked.map((e) => e.item.slug), ['far', 'near']);
  assert.deepEqual(rankPharmacies(origin, 'walk', [near, far], routes).ranked.map((e) => e.item.slug), ['near', 'far']);
  // Driving routes never leak into a walking ranking.
  assert.equal(rankPharmacies(origin, 'walk', [near, far], routes.filter((r) => r.mode === 'drive')).hasRoutes, false);
});

test('routes from a different practice are ignored', () => {
  const other = { ...route('near', 60, 100), origin: 'someone-else' };
  assert.equal(rankPharmacies(origin, 'drive', [near], [other]).hasRoutes, false);
});

test('candidate preselection is a radius, nearest first, and drops distant pharmacies', () => {
  assert.deepEqual(candidatesFor(origin, [outside, far, near], 5000).map((p) => p.slug), ['near', 'far']);
});

test('straight-line distance is sane', () => {
  // 0.01 degrees of latitude is about 1.11 km anywhere.
  assert.ok(Math.abs(straightLineMetres({ lat: 51, lng: 0 }, { lat: 51.01, lng: 0 }) - 1112) < 5);
});

test('formatting never shows zero minutes', () => {
  assert.equal(formatDuration(0), 'about 1 min');
  assert.equal(formatDuration(430), 'about 7 min');
  assert.equal(formatDistance(50), '50 m');
  assert.equal(formatDistance(3218.7), '2.0 miles');
});
