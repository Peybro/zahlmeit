import { ID } from "./ID.type";

export type Zutat = {
  id: ID;
  name: string;
  menge?: number;
  defaultEinheit?: ID;
  tags: ID[];
};
