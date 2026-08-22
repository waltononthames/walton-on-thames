import type { CollectionEntry } from 'astro:content';

// Maps an attractions collection entry's data to AttractionCard's props.
// Shared by the hub, Hersham and filter pages so the mapping only lives
// in one place.
export function attractionCardProps(a: CollectionEntry<'attractions'>['data']) {
  return {
    name: a.name,
    area: a.area,
    locationBand: a.locationBand,
    reasonToVisit: a.reasonToVisit,
    planningDetail: a.planningDetail,
    costBand: a.costBand,
    checkBeforeTravelling: a.checkBeforeTravelling,
    seasonality: a.seasonality,
    internalUrl: a.internalUrl,
    officialUrl: a.officialUrl,
    lastVerified: a.lastVerified,
    image: a.image,
  };
}
