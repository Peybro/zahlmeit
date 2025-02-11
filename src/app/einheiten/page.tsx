"use client";

import {
  getFirestore,
  collection,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { Einheit } from "@/app/lib/types/Einheit.type";
import NeueEinheit from "../lib/components/NeueEinheit.component";
import DeleteButton from "../lib/components/DeleteButton.component";

export default function Einheiten() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "Einheiten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  async function deleteEinheit(id: string) {
    try {
      const q = query(
        collection(getFirestore(app), "Einheiten"),
        where("id", "==", id),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          await deleteDoc(
            doc(getFirestore(app), "Einheiten", document.id),
          ).then(() => console.info(`Einheit mit ID ${document.id} gelöscht`));
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
            <DeleteButton onDelete={() => deleteEinheit(data.id)} />
          </details>
        );
      })}
    </div>
  );
}
