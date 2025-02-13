"use client";

import { useDocument } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import { doc, getFirestore } from "firebase/firestore";
import { Zutat } from "@/app/lib/types/Zutat.type";
import UpdateRezept from "@/app/lib/components/UpdateRezept.component";
import Link from "next/link";
import Arrow from "@/app/lib/icons/Arrow.icon";

export default function SpecificRezept() {
  const id = window.location.pathname.split("/").at(-1);

  const [rezepte, rezepteLoading, rezepteError] = useDocument(
    doc(getFirestore(app), "Rezepte", id as string),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <>
      <Link href="/rezepte">
        <div className="flex gap-1">
          <Arrow direction="left" /> zurück zu Rezepten
        </div>
      </Link>

      <div className="m-4">
        {rezepteLoading && <p>Lade Rezept...</p>}
        {rezepteError && <p>Fehler: {rezepteError.message}</p>}
        {rezepte && (
          <>
            <h2>{rezepte.data()?.name}</h2>
            <UpdateRezept />
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
