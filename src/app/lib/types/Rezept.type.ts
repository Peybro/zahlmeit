import { ID } from "./ID.type";
import { Zutat } from "./Zutat.type";

export type Rezept = {
  id: ID;
  name: string;
  zutaten: Zutat[];
  anleitung: string[];
  bild?: string;
  bewertung: number;
};
