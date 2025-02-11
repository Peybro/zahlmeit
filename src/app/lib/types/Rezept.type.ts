import { Zutat } from "./Zutat.type";

export type Rezept = {
  id: string;
  name: string;
  zutaten: Zutat[];
  anleitung: string[];
  bild: string;
  bewertung: number;
  vegetarisch: boolean;
  vegan: boolean;
};
