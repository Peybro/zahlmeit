"use client";

import { getFirestore, collection, DocumentData } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import Link from "next/link";
import { Rezept } from "@/app/lib/types/Rezept.type";
import NeuesRezept from "../lib/components/NeuesRezept";
import Bewertung from "../lib/components/Bewertung.component";

export default function Rezepte() {
  const [rezepte, rezepteLoading, rezepteError] = useCollection(
    collection(getFirestore(app), "Rezepte"),
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
          const data: Rezept = doc.data();
          return (
            <article>
              <header>
                <img src={data.bild} alt={`[Bild von ${data.name}]`} />
              </header>
              <h2>{data.name}</h2>
              <Bewertung
                type="stars"
                defaultValue={data.bewertung}
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
