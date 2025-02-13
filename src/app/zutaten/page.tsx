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
import { Zutat } from "@/app/lib/types/Zutat.type";
import NeueZutat from "../lib/components/NeueZutat.component";
import DeleteButton from "../lib/components/DeleteButton.component";
import { ID } from "../lib/types/ID.type";
import EditButton from "../lib/components/EditButton.component";

export default function Zutaten() {
  const [zutaten, zutatenLoading, zutatenError] = useCollection(
    collection(app, "Zutaten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [einheiten, einheitenLoading, einheitenError] = useCollection(
    collection(app, "Einheiten"),
  );

  const [tags, tagsLoading, tagsError] = useCollection(collection(app, "Tags"));

  // TODO
  async function editZutat() {
    return;
  }

  async function deleteZutat(id: ID) {
    try {
      const q = query(collection(app, "Zutaten"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(app, "Zutaten", document.id)).then(() =>
            console.info(`Zutat mit ID ${document.id} gelöscht`),
          );
        });
      } else {
        console.info("Kein passendes Dokument gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  }

  function getEinheitNameById(id: ID): string {
    if (!einheiten) return "Lade Einheiten...";
    const einheit = einheiten.docs.find((doc) => doc.data().id === id);
    return einheit ? einheit.data().labelLong : "Unbekannte Einheit";
  }

  function getTagNameById(id: ID): string {
    if (!tags) return "Lade Tags...";
    const tag = tags.docs.find((doc) => doc.data().id === id);
    return tag ? tag.data().name : "Unbekannter Tag";
  }

  return (
    <div>
      <NeueZutat />
      <hr />
      {zutatenLoading && <p>Lade Zutaten...</p>}
      {zutatenError && <p>Fehler: {zutatenError.message}</p>}
      {zutaten?.docs.length === 0 && (
        <h3>Es gibt hier noch keine Zutaten...</h3>
      )}
      {zutaten?.docs.map((doc: DocumentData) => {
        const zutat: Zutat = doc.data();
        return (
          <details key={zutat.id}>
            <summary>{zutat.name}</summary>
            <article>
              <p>
                Standardeinheit:{" "}
                {getEinheitNameById(zutat.defaultEinheit as string)}
              </p>
              <div className="flex gap-2">
                {zutat.tags?.map((tag) => {
                  return (
                    <div
                      key={tag}
                      className="bg-primary text-black rounded-full px-3 py-1"
                    >
                      {getTagNameById(tag)}
                    </div>
                  );
                })}
              </div>
              <footer className="flex gap-2">
                <EditButton onClick={() => editZutat()} />
                <DeleteButton onDelete={() => deleteZutat(zutat.id)} />
              </footer>
            </article>
          </details>
        );
      })}
    </div>
  );
}
