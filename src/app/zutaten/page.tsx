"use client";

import {
  getFirestore,
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
import Trash from "../lib/icons/Trash.icon";
import DeleteButton from "../lib/components/DeleteButton.component";
import { ID } from "../lib/types/ID.type";
import { Einheit } from "../lib/types/Einheit.type";
import { useEffect, useState } from "react";
import { Tag } from "../lib/types/Tag.type";

export default function Zutaten() {
  const [zutaten, zutatenLoading, zutatenError] = useCollection(
    collection(getFirestore(app), "Zutaten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [einheiten, einheitenLoading, einheitenError] = useCollection(
    collection(getFirestore(app), "Einheiten"),
  );

  const [tags, tagsLoading, tagsError] = useCollection(
    collection(getFirestore(app), "Tags"),
  );

  async function deleteZutat(id: ID) {
    try {
      const q = query(
        collection(getFirestore(app), "Zutaten"),
        where("id", "==", id),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(getFirestore(app), "Zutaten", document.id)).then(
            () => console.info(`Zutat mit ID ${document.id} gelöscht`),
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
        const data: Zutat = doc.data();
        return (
          <details key={data.id}>
            <summary>{data.name}</summary>
            <article>
              <p>
                Standardeinheit:{" "}
                {getEinheitNameById(data.defaultEinheit as string)}
              </p>
              <div className="flex gap-2">
                {data.tags.map((tag) => {
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
              <footer>
                <DeleteButton onDelete={() => deleteZutat(data.id)} />
              </footer>
            </article>
          </details>
        );
      })}
    </div>
  );
}
