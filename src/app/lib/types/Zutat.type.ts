import { ID } from "./ID.type";

export type Zutat = {
  id: ID;
  name: string;
  menge?: number;
  defaultEinheit?: ID;
  einheit: ID;
  tags?: ID[];
};
