"use client";

import { app } from "@/firebase";
import { setDoc, getFirestore, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Einheit } from "../types/Einheit.type";
import { Zutat } from "../types/Zutat.type";

export default function NeueZutat() {
  const [open, setOpen] = useState<boolean>(false);

  async function saveZutat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const name = formData.get("labelShort") as string;
    const einheit = formData.get("labelLong") as string;
    const vegetarisch = formData.get("labelLong") as string;
    const vegan = formData.get("labelLong") as string;

    await setDoc(doc(getFirestore(app), "Einheiten", labelLong), {
      id: uuid,
    } as Zutat).then(() => {
      form.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Neue Einheit</button>

      <dialog open={open}>
        <article>
          <header>
            <button
              aria-label="Close"
              rel="prev"
              onClick={() => setOpen(false)}
            ></button>
            <p>
              <strong>Neue Einheit hinzufügen</strong>
            </p>
          </header>
          <form onSubmit={saveZutat}>
            <fieldset>
              <label>
                Name
                <input
                  type="text"
                  name="labelLong"
                  required
                  placeholder="ausgeschrieben"
                />
              </label>
              <label>
                Kurzschreibweise
                <input
                  type="text"
                  name="labelShort"
                  required
                  placeholder="Abk."
                />
              </label>
            </fieldset>

            <input type="submit" value="Einheit speichern" />
          </form>
        </article>
      </dialog>
    </>
  );
}
