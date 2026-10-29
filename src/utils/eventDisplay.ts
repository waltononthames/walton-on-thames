// Listing helpers shared by EventRow (What's On) and EventCard (homepage,
// Hersham). Events never have photos, so both lead with a date tile; these
// keep the tile, venue and price treatment identical in both places.
import { parseEventDate } from './eventDates';

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// The three lines of a date tile: "Thu / 29 / Oct", or "Until / 8 / Nov" for
// an event already running, which is better described by when it ends.
export function dateTile(raw: string, until = false) {
  const p = parseEventDate(raw);
  return {
    top: until ? 'Until' : WEEKDAYS_SHORT[p.weekday],
    day: p.day,
    month: MONTHS_SHORT[p.month - 1],
  };
}

// A listing only needs enough to recognise the place; the event page keeps the
// full address. Drop the town, county and postcode segments, keep the first two left.
const LOCALITY = /^(walton-on-thames|hersham|whiteley village|weybridge|esher|surrey\b.*|[a-z]{1,2}\d[a-z\d]? ?\d[a-z]{2})$/i;

export function shortVenue(venue: string): string {
  const segments = venue.split(',').map(s => s.trim()).filter(Boolean);
  const named = segments.filter(s => !LOCALITY.test(s));
  return (named.length ? named : segments).slice(0, 2).join(', ');
}

export const isFreePrice = (price: string) => /^free/i.test(price);

// "See venue for details" and similar say nothing a visitor can act on from a listing.
export const showPrice = (price: string) => !/^see\b/i.test(price);

export const categoryLabel = (category: string) =>
  category === 'food-drink' ? 'Food & Drink' : category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
