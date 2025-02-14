"use client";

import {
  collection,
  DocumentData,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { Einheit } from "@/app/lib/types/Einheit.type";
import NeueEinheit from "../lib/components/NeueEinheit.component";
import DeleteButton from "../lib/components/DeleteButton.component";
import EditButton from "../lib/components/EditButton.component";

export default function Einheiten() {
  const [value, loading, error] = useCollection(collection(app, "Einheiten"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // TODO
  async function editEinheit() {
    return;
  }

  async function deleteEinheit(id: string) {
    try {
      const q = query(collection(app, "Einheiten"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(app, "Einheiten", document.id)).then(() =>
            console.info(`Einheit mit ID ${document.id} gelöscht`),
          );
        });
      } else {
        console.info("Kein passendes Dokument gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  }

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
            <div className="flex gap-2">
              <EditButton onClick={() => editEinheit()} />
              <DeleteButton onDelete={() => deleteEinheit(data.id)} />
            </div>
          </details>
        );
      })}
    </div>
  );
}
