"use client";

import { getFirestore, collection, DocumentData } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { Zutat } from "@/app/lib/types/Zutat.type";

export default function Zutaten() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "Zutaten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <button>Neue Zutat</button>
      <hr />
      {loading && <p>Lade Zutaten...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {value?.docs.length === 0 && <h3>Es gibt hier noch keine Zutaten...</h3>}
      {value?.docs.map((doc: DocumentData) => {
        const data: Zutat = doc.data();
        return (
          <details key={data.id}>
            <summary>{data.name}</summary>
          </details>
        );
      })}
    </div>
  );
}
