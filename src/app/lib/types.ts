type ID = string;
type Tag = string;

type Zutat = {
  name: string;
  menge: number;
  einheit: string;
};

type Rezept = {
  id: ID;
  name: string;
  zutaten: Zutat[];
  anleitung: string[];
  bild?: string;
  bewertung: number;
  tags?: Tag[];
};

export type { ID, Tag, Zutat, Rezept };
