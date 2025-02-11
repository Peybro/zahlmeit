"use client";

import { getFirestore, collection, DocumentData } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { Einheit } from "@/app/lib/types/Einheit.type";
import NeueEinheit from "../lib/components/NeueEinheit.component";

export default function Einheiten() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "Einheiten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <NeueEinheit />
      <hr />
      {loading && <p>Lade Einheiten...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {value?.docs.length === 0 && (
        <h3>Es gibt hier noch keine Einheiten...</h3>
      )}
      {value?.docs.map((doc: DocumentData) => {
        const data: Einheit = doc.data();
        return (
          <details key={data.id}>
            <summary>
              {data.labelLong} ({data.labelShort})
            </summary>
            <button>Löschen</button>
          </details>
        );
      })}
    </div>
  );
}
