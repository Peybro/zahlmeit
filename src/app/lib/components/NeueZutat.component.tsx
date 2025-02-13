"use client";

import { app } from "@/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Einheit } from "../types/Einheit.type";
import { Zutat } from "../types/Zutat.type";
import { useCollection } from "react-firebase-hooks/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { Tag } from "../types/Tag.type";
import NeuerTag from "./NeuerTag.component";
import NeueEinheit from "./NeueEinheit.component";
import { ID } from "../types/ID.type";

export default function NeueZutat() {
  const [open, setOpen] = useState<boolean>(false);

  const [einheitenValue, einheitenLoading, einheitenError] = useCollection(
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

  async function saveZutat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const name = formData.get("name") as string;
    const einheit = formData.get("einheit") as ID;
    const tagIDs = formData.getAll("tag") as ID[];

    await setDoc(doc(app, "Zutaten", name), {
      id: uuid,
      name,
      defaultEinheit: einheit,
      tags: tagIDs,
    } as Zutat).then(() => {
      form.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Neue Zutat</button>

      <dialog open={open}>
        <article>
          <header>
            <button
              aria-label="Close"
              rel="prev"
              onClick={() => setOpen(false)}
            ></button>
            <p>
              <strong>Neue Zutat hinzufügen</strong>
            </p>
          </header>
          <form id="newZutatForm" onSubmit={saveZutat}>
            <fieldset>
              <label>
                Name
                <input type="text" name="name" required placeholder="Name" />
              </label>
              <label>
                Standardeinheit
                <select name="einheit" defaultValue="select">
                  <option value="select" disabled>
                    - auswählen -
                  </option>
                  {einheitenValue?.docs.map((doc: DocumentData, i) => {
                    const einheit: Einheit = doc.data();
                    return (
                      <option key={einheit.id} value={einheit.id}>
                        {einheit.labelLong}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Tags
                {tagValue?.docs.map((doc: DocumentData, i) => {
                  const tag: Tag = doc.data();
                  return (
                    <label key={tag.id}>
                      <input type="checkbox" name="tag" value={tag.id} />
                      {tag.name}
                    </label>
                  );
                })}
              </label>
            </fieldset>
          </form>

          <div className="flex gap-1">
            <NeueEinheit />
            <NeuerTag />
          </div>

          <footer>
            <input
              type="submit"
              form="newZutatForm"
              value="Einheit speichern"
            />
          </footer>
        </article>
      </dialog>
    </>
  );
}
