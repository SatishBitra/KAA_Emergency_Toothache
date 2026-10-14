export interface TreatmentPage {
  name: string;
  shortName: string;
  badge?: string;
  href: string;
  description: string;
}

export const TREATMENT_PAGES: TreatmentPage[] = [
  {
    name: "Toothache Care",
    shortName: "Toothache",
    badge: "Urgent Relief",
    href: "/",
    description: "Emergency pain diagnosis & relief",
  },
  {
    name: "Broken Tooth Care",
    shortName: "Broken Tooth",
    badge: "Repairs",
    href: "/broken-tooth",
    description: "Chipped, cracked & damaged teeth",
  },
  {
    name: "Tooth Extraction",
    shortName: "Extraction",
    badge: "Removal",
    href: "/tooth-extraction",
    description: "Emergency & routine extractions",
  },
];
