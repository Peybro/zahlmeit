"use client";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { Zutat } from "@/app/lib/types/Zutat.type";
import EditRezept from "@/app/lib/components/EditRezept.component";
import Link from "next/link";
import Arrow from "@/app/lib/icons/Arrow.icon";
import { ID } from "@/app/lib/types/ID.type";

export default function SpecificRezept() {
  const rezeptName = window.location.pathname.split("/").at(-1);

  const [rezepte, rezepteLoading, rezepteError] = useDocument(
    doc(app, "Rezepte", rezeptName as string),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [tags, tagsLoading, tagsError] = useCollection(collection(app, "Tags"));

  function getTagNameById(id: ID): string {
    if (!tags) return "Lade Tags...";
    const tag = tags.docs.find((doc) => doc.data().id === id);
    return tag ? tag.data().name : "Unbekannter Tag";
  }

  return (
    <>
      <div className="flex justify-between">
        <Link href="/rezepte">
          <div className="flex gap-1">
            <Arrow direction="left" /> zurück zu Rezepten
          </div>
        </Link>
        <EditRezept />
      </div>

      <div className="m-4">
        {rezepteLoading && <p>Lade Rezept...</p>}
        {rezepteError && <p>Fehler: {rezepteError.message}</p>}
        {rezepte && (
          <>
            <h2>{rezepte.data()?.name}</h2>
            <div className="flex gap-2">
              {rezepte.data()?.tags?.map((tag: ID) => {
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

            <div className="flex gap-2">
              <img
                src={rezepte.data()?.bild}
                alt={`[Bild von ${rezepte.data()?.name}]`}
              />
              <div className="block">
                {/* Variablen können auch ohne Aneinanderkettung von Plussen (+'s) in Strings eingesetzt werden: */}
                <h3>Zutaten:</h3>
                {rezepte.data()?.zutaten.map((zutat: Zutat, index: number) => (
                  <div key={zutat.id} className="flex">
                    <input type="checkbox" />
                    <p key={index}>
                      {zutat.name} - {zutat.menge} {zutat.defaultEinheit}
                    </p>
                  </div>
                ))}
                <h3>Zubereitung:</h3>
                {rezepte
                  .data()
                  ?.anleitung.map((schritt: string, index: number) => (
                    <div key={`step-${index}`} className="flex">
                      <input type="checkbox" />
                      <p key={index}>
                        {index + 1}. {schritt}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
