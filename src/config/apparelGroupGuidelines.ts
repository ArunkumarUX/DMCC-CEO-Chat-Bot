/**
 * @deprecated Import from `./dmccGuidelines` instead.
 * Legacy re-exports — DMCC is the canonical brand source for this project.
 * @see src/config/dmccGuidelines.ts
 */
import {
  DMCC_BRAND,
  DMCC_LEADERSHIP,
  DMCC_FACTS,
  DMCC_ECOSYSTEMS,
  DMCC_PRIORITIES,
  DMCC_MEMBER_BRANDS,
  DMCC_DECK_FOOTER,
  DMCC_DECK_BRAND_PROMPT,
} from './dmccGuidelines';

export const APPAREL_GROUP_BRAND = DMCC_BRAND;

export const APPAREL_GROUP_LEADERSHIP = DMCC_LEADERSHIP;

export const APPAREL_GROUP_FACTS = {
  stores: DMCC_FACTS.memberCompanies,
  brands: DMCC_FACTS.licensedActivities,
  employees: DMCC_FACTS.professionals,
  countries: DMCC_FACTS.countries,
  markets: [...DMCC_FACTS.destinations],
  emergingMarkets: [] as string[],
} as const;

export const APPAREL_GROUP_PORTFOLIO = DMCC_ECOSYSTEMS.map((e) => ({
  id: e.id,
  name: e.name,
  tagline: e.tagline,
  ceo: null as string | null,
}));

export const APPAREL_GROUP_KEY_BRANDS = DMCC_MEMBER_BRANDS;

export const APPAREL_GROUP_PRIORITIES = DMCC_PRIORITIES;

export const APPAREL_GROUP_AWARDS = DMCC_FACTS.awards;

export const APPAREL_GROUP_DECK_FOOTER = DMCC_DECK_FOOTER;

export const APPAREL_GROUP_DECK_BRAND_PROMPT = DMCC_DECK_BRAND_PROMPT;
