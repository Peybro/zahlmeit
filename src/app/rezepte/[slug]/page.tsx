"use client";

import { useDocument } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { Zutat } from "@/app/lib/types/Zutat.type";
import { useRouter } from "next/navigation";

export default function SpecificRezept() {
  const id = window.location.pathname.split("/").at(-1);

  const { replace } = useRouter();

  const [value, loading, error] = useDocument(
    doc(getFirestore(app), "Rezepte", id as string),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  async function deleteRezept() {
    // mit Await/Async kann auf Aktionen gewartet werden von denen man nicht genau sagen kann wann sie ausgeführt werden (#Promises)
    // .then() passiert dann erst wenn das vorherige Event abgeschlossen ist
    await deleteDoc(doc(getFirestore(app), "Rezepte", id as string)).then(() =>
      replace("/"),
    );
  }

  return (
    <>
      {loading && <p>Lade Rezept...</p>}
      {error && <p>Fehler: {error.message}</p>}
      {value && (
        <>
          <h2>{value.data()?.name}</h2>
          <button onClick={deleteRezept}>Rezept löschen</button>
          {/* Variablen können auch ohne Aneinanderkettung von Plussen (+'s) in Strings eingesetzt werden: */}
          <img
            src={value.data()?.bild}
            alt={`[Bild von ${value.data()?.name}]`}
          />
          <h3>Zutaten:</h3>
          {value.data()?.zutaten.map((zutat: Zutat, index: number) => (
            <div key={zutat.id} className="flex">
              <input type="checkbox" />
              <p key={index}>
                {zutat.name} - {zutat.menge} {zutat.defaultEinheit}
              </p>
            </div>
          ))}
          <h3>Zubereitung:</h3>
          {value.data()?.anleitung.map((schritt: string, index: number) => (
            <div key={`step-${index}`} className="flex">
              <input type="checkbox" />
              <p key={index}>
                {index + 1}. {schritt}
              </p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
