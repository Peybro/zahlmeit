"use client";

import { getFirestore, collection, DocumentData } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import Link from "next/link";
import { Rezept } from "@/app/lib/types/Rezept.type";

export default function Rezepte() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "Rezepte"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <div>
      <button>Neues Rezept</button>
      <hr />
      {loading && <p>Lade Rezepte...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {value?.docs.length === 0 && <h3>Es gibt hier noch keine Rezepte...</h3>}
      {value?.docs.map((doc: DocumentData) => {
        const data: Rezept = doc.data();
        return (
          <details key={doc.id}>
            <summary>{data.name}</summary>
            <h5>Zutaten:</h5>
            {data.zutaten.map((zutat, index) => (
              <p key={index}>
                {zutat.name} - {zutat.menge} {zutat.defaultEinheit}
              </p>
            ))}
            <hr />
            <h5>Zubereitung:</h5>
            {data.anleitung.map((schritt, index) => (
              <p key={index}>
                {index + 1}. {schritt}
              </p>
            ))}

            <Link href={`/rezepte/${doc.id}`}>Zum Rezept</Link>
          </details>
        );
      })}
    </div>
  );
}
