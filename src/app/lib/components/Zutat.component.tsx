import { useState } from "react";
import { Zutat as ZutatType } from "../types";
import DeleteButton from "./DeleteButton.component";

export default function Zutat({
  zutat,
  onDelete,
}: {
  zutat: ZutatType;
  onDelete: () => void;
}) {
  const [zutatDeletable, setZutatDeletable] = useState(false);

  return (
    <li
      onMouseEnter={() => setZutatDeletable(true)}
      onMouseLeave={() => setZutatDeletable(false)}
    >
      {zutatDeletable && <DeleteButton onDelete={onDelete} />}
      {zutat.name}: {zutat.menge} {zutat.einheit}
    </li>
  );
}
