"use state";

import { collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app } from "@/firebase";
import { Rezept } from "../types/Rezept.type";
import Bewertung from "./Bewertung.component";
import { useCollection } from "react-firebase-hooks/firestore";
import { Einheit } from "../types/Einheit.type";
import { Zutat } from "../types/Zutat.type";
import NeueZutat from "./NeueZutat.component";
import DeleteButton from "./DeleteButton.component";
import { Tag } from "../types/Tag.type";
import NeuerTag from "./NeuerTag.component";
import { ID } from "../types/ID.type";

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
    collection(app, "Zutaten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [einheiten, einheitenLoading, einheitenError] = useCollection(
    collection(app, "Einheiten"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [tagValue, tagLoading, tagError] = useCollection(
    collection(app, "Tags"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    setSelectedEinheit(
      einheiten?.docs
        .find((e) => {
          const einheit = e.data() as Einheit;
          return einheit.id === selectedZutat!.defaultEinheit;
        })
        ?.data() as Einheit,
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
    const tags = formData.getAll("tag") as ID[];

    await setDoc(doc(app, "Rezepte", name), {
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
      tags,
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

              <label>Zutaten</label>

              <ul>
                {zutatenList.map((zutat) => {
                  return (
                    <li key={zutat.zutat.id}>
                      <DeleteButton
                        onDelete={() =>
                          setZutatenList((prev) =>
                            prev.filter((z) => z.zutat.id !== zutat.zutat.id),
                          )
                        }
                      />
                      {zutat.zutat.name}: {zutat.menge}{" "}
                      {zutat.einheit.labelLong}
                    </li>
                  );
                })}
              </ul>

              {/* evtl durch "downshift" ersetzen */}
              {/* <input
                list="zutatenListe"
                type="text"
                onChange={(e) => setSelectedZutat(e.currentTarget.value)}
              />
              <datalist id="zutatenListe">
                {zutaten?.docs.map((doc, i) => {
                  const zutat = doc.data() as Zutat;
                  return (
                    <option key={zutat.id} value={JSON.stringify(zutat)}>
                      {zutat.name}
                    </option>
                  );
                })}
              </datalist> */}

              <fieldset role="group">
                <select
                  defaultValue="defaultSelectZutat"
                  onChange={(e) =>
                    setSelectedZutat(JSON.parse(e.currentTarget.value) as Zutat)
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
                  onChange={(e) => setNewMenge(parseInt(e.currentTarget.value))}
                />

                <select
                  defaultValue="defaultSelectEinheit"
                  value={JSON.stringify(selectedEinheit)}
                  onChange={(e) =>
                    setSelectedEinheit(
                      JSON.parse(e.currentTarget.value) as Einheit,
                    )
                  }
                >
                  <option value="defaultSelectEinheit" disabled>
                    - Einheit -
                  </option>
                  {einheiten?.docs.map((doc, i) => {
                    const einheit = doc.data() as Einheit;
                    return (
                      <option key={einheit.id} value={JSON.stringify(einheit)}>
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
                  disabled={
                    selectedZutat === undefined ||
                    newMenge === undefined ||
                    selectedEinheit === undefined ||
                    zutatenList.find(
                      (z) => z.zutat.id === selectedZutat?.id,
                    ) !== undefined
                  }
                >
                  {zutatenList.find((z) => z.zutat.id === selectedZutat?.id) ===
                  undefined
                    ? "Hinzufügen"
                    : "vorhanden"}
                </button>
              </fieldset>

              <label>Tags</label>
              <div className="grid">
                {tagValue?.docs.map((doc, i) => {
                  const tag = doc.data() as Tag;
                  return (
                    <div key={tag.id}>
                      <input type="checkbox" name="tag" value={tag.id} />
                      <label>{tag.name}</label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </form>

          <div className="flex gap-1">
            <NeueZutat />
            <NeuerTag />
          </div>

          <label className="mt-4">
            Anleitung
            <textarea
              form="newRezeptForm"
              name="anleitung"
              required
              placeholder="Jeder Zeilenumbruch entspricht einem Schritt"
            />
          </label>

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
