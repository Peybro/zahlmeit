"use client";

import { collection, DocumentData } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import Link from "next/link";
import NeuesRezept from "../lib/components/NeuesRezept.component";
import Bewertung from "../lib/components/Bewertung.component";
import { Rezept } from "../lib/types";

export default function Rezepte() {
  const [rezepte, rezepteLoading, rezepteError] = useCollection(
    collection(app, "Rezepte"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <NeuesRezept />
      <hr />

      {rezepteLoading && <p>Lade Rezepte...</p>}
      {rezepteError && <p>Fehler: {rezepteError.message}</p>}
      {rezepte?.docs.length === 0 && (
        <h3>Es gibt hier noch keine Rezepte...</h3>
      )}
      <div className="grid">
        {rezepte?.docs.map((doc: DocumentData) => {
          const rezept: Rezept = doc.data();
          return (
            <article key={rezept.id}>
              <header>
                <img
                  src={rezept.bild === "" ? undefined : rezept.bild}
                  alt={`[Bild von ${rezept.name}]`}
                />
              </header>
              <h2>{rezept.name}</h2>
              <Bewertung
                type="stars"
                defaultValue={rezept.bewertung}
                max={5}
                editable={false}
              />
              <footer>
                <Link href={`/rezepte/${doc.id}`} role="button">
                  Zum Rezept
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
