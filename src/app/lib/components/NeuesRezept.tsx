"use state";

import {
  collection,
  doc,
  DocumentData,
  getFirestore,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ID } from "../types/ID.type";
import { app } from "@/firebase";
import { Rezept } from "../types/Rezept.type";
import Bewertung from "./Bewertung.component";
import { useCollection } from "react-firebase-hooks/firestore";
import { Einheit } from "../types/Einheit.type";
import { Zutat } from "../types/Zutat.type";
import Zutaten from "@/app/zutaten/page";

export default function NeuesRezept() {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedZutat, setSelectedZutat] = useState<Zutat>();
  const [selectedEinheit, setSelectedEinheit] = useState<Einheit>();
  const [newMenge, setNewMenge] = useState<number>();
  const [zutatenList, setZutatenList] = useState<
    {
      zutat: Zutat;
      menge: number;
      einheit: Einheit;
    }[]
  >([]);

  const [zutaten, zutatenLoading, zutatenError] = useCollection(
    collection(getFirestore(app), "Zutaten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [einheiten, einheitenLoading, einheitenError] = useCollection(
    collection(getFirestore(app), "Einheiten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    setSelectedEinheit(
      einheiten?.docs
        .find((e) => {
          const einheit = e.data() as Einheit;
          return einheit.id === selectedZutat!.defaultEinheit;
        })
        ?.data() as Einheit
    );
  }, [selectedZutat]);

  async function saveRezept(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const name = formData.get("name") as string;
    const anleitung = formData.get("anleitung") as string;
    // const bild;
    const bewertung = formData.get("bewertung") as string;

    await setDoc(doc(getFirestore(app), "Rezepte", name), {
      id: uuid,
      name,
      zutaten: zutatenList.map((zutat) => ({
        id: zutat.zutat.id,
        name: zutat.zutat.name,
        menge: zutat.menge,
        einheit: zutat.einheit.id,
      })),
      anleitung: anleitung.split("\n"),
      bewertung: parseInt(bewertung),
    } as Rezept).then(() => {
      form.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Neues Rezept</button>

      <dialog open={open}>
        <article>
          <header>
            <button
              aria-label="Close"
              rel="prev"
              onClick={() => setOpen(false)}
            ></button>
            <p>
              <strong>Neues Rezept hinzufügen</strong>
            </p>
          </header>
          <form id="newRezeptForm" onSubmit={saveRezept}>
            <fieldset>
              <label>
                Bewertung
                <Bewertung type="stars" name="bewertung" max={5} />
              </label>

              <label>
                Bild
                <input type="file" name="bild" placeholder="Bild" />
              </label>

              <label>
                Name
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={name}
                  onInput={(e) => setName(e.currentTarget.value)}
                />
              </label>

              <label>
                Zutaten
                <article>
                  <ul>
                    {zutatenList.map((zutat) => {
                      return (
                        <li key={zutat.zutat.id}>
                          {zutat.zutat.name}: {zutat.menge}{" "}
                          {zutat.einheit.labelLong}
                        </li>
                      );
                    })}
                  </ul>
                </article>
                <fieldset role="group">
                  <select
                    defaultValue="defaultSelectZutat"
                    onChange={(e) =>
                      setSelectedZutat(
                        JSON.parse(e.currentTarget.value) as Zutat
                      )
                    }
                  >
                    <option value="defaultSelectZutat" disabled>
                      - Zutat -
                    </option>
                    {zutaten?.docs.map((doc, i) => {
                      const zutat = doc.data() as Zutat;
                      return (
                        <option key={zutat.id} value={JSON.stringify(zutat)}>
                          {zutat.name}
                        </option>
                      );
                    })}
                  </select>

                  <input
                    type="number"
                    placeholder="Menge"
                    value={newMenge}
                    onChange={(e) =>
                      setNewMenge(parseInt(e.currentTarget.value))
                    }
                  />

                  <select
                    defaultValue="defaultSelectEinheit"
                    value={JSON.stringify(selectedEinheit)}
                    onChange={(e) =>
                      setSelectedEinheit(
                        JSON.parse(e.currentTarget.value) as Einheit
                      )
                    }
                  >
                    <option value="defaultSelectEinheit" disabled>
                      - Einheit -
                    </option>
                    {einheiten?.docs.map((doc, i) => {
                      const einheit = doc.data() as Einheit;
                      return (
                        <option
                          key={einheit.id}
                          value={JSON.stringify(einheit)}
                        >
                          {einheit.labelShort}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="outline secondary"
                    onClick={() =>
                      setZutatenList((prev) => [
                        ...prev,
                        {
                          zutat: selectedZutat!,
                          menge: newMenge!,
                          einheit: selectedEinheit!,
                        },
                      ])
                    }
                  >
                    Hinzufügen
                  </button>
                </fieldset>
              </label>

              <label>
                Anleitung
                <textarea
                  name="anleitung"
                  required
                  placeholder="Jeder Zeilenumbruch entspricht einem Schritt"
                />
              </label>
            </fieldset>
          </form>

          <footer>
            <input
              type="submit"
              form="newRezeptForm"
              value={`${name === "" ? "Rezept" : name} speichern`}
            />
          </footer>
        </article>
      </dialog>
    </>
  );
}
