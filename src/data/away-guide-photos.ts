// Photographs supplied for the away guide's slots (docs/away-fans-guide-shot-list.md).
// A slot listed here renders the photograph; any other slot keeps its
// labelled placeholder. Files live in src/assets/away-guide/ and were cut from
// Darren's originals with metadata (including GPS) stripped; the crops are
// recorded in the shot list.
//
// position is the CSS object-position used when the photo fills a frame of a
// different shape (the opening and the chapter breaks).
import type { ImageMetadata } from 'astro';
import openingLandscape from '../assets/away-guide/af-opening-floodlights-landscape.jpg';
import openingPortrait from '../assets/away-guide/af-opening-floodlights-portrait.jpg';
import groundStand from '../assets/away-guide/af-ground-main-stand-landscape.jpg';
import faqsFloodlights from '../assets/away-guide/af-faqs-floodlights-landscape.jpg';
import historyHub from '../assets/away-guide/af-history-sports-hub-landscape.jpg';

export interface AwayPhoto {
  landscape: ImageMetadata;
  /** Served to phones where the slot has one (the opening image). */
  portrait?: ImageMetadata;
  alt: string;
  position?: string;
  /**
   * Lower encoding quality, for the opening image: it is the page's largest
   * contentful paint, and its lower half sits under a dark scrim.
   */
  light?: boolean;
}

export const AWAY_PHOTOS: Record<string, AwayPhoto> = {
  'af-opening-floodlights': {
    landscape: openingLandscape,
    portrait: openingPortrait,
    alt: 'The pitch at the Elmbridge Xcel Sports Hub seen from a corner flag, with players warming up and the covered stand on the right',
    position: '50% 40%',
    light: true,
  },
  'af-ground-main-stand': {
    landscape: groundStand,
    alt: 'The covered stand at the Elmbridge Xcel Sports Hub on a sunny matchday, with spectators in the seats',
    position: '22% 50%',
  },
  'af-history-sports-hub': {
    landscape: historyHub,
    alt: 'A match in progress at the Elmbridge Xcel Sports Hub, seen from the touchline under a cloudy sky',
    position: '50% 60%',
  },
  'af-faqs-floodlights': {
    landscape: faqsFloodlights,
    alt: 'A floodlight tower against the evening sky during a match at the Elmbridge Xcel Sports Hub',
    position: '50% 8%',
  },
};
