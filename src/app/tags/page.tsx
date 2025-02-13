"use client";

import {
  collection,
  DocumentData,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import NeuerTag from "../lib/components/NeuerTag.component";
import { Tag } from "../lib/types/Tag.type";
import DeleteButton from "../lib/components/DeleteButton.component";
import EditButton from "../lib/components/EditButton.component";

export default function Einheiten() {
  const [value, loading, error] = useCollection(collection(app, "Tags"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // TODO
  async function editTag() {
    return;
  }

  async function deleteTag(id: string) {
    try {
      const q = query(collection(app, "Tags"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(app, "Tags", document.id)).then(() =>
            console.info(`Tag mit ID ${document.id} gelöscht`),
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
      <NeuerTag />
      <hr />
      {loading && <p>Lade Tags...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {value?.docs.length === 0 && <h3>Es gibt hier noch keine Tags...</h3>}
      {value?.docs.map((doc: DocumentData) => {
        const data: Tag = doc.data();
        return (
          <details key={data.id}>
            <summary>{data.name}</summary>
            <article>
              <p>{data.description}</p>
              <footer className="flex gap-2">
                <EditButton onClick={() => editTag()} />
                <DeleteButton onDelete={() => deleteTag(data.id)} />
              </footer>
            </article>
          </details>
        );
      })}
    </div>
  );
}
