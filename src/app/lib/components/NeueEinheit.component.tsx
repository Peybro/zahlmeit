"use client";

import { app } from "@/firebase";
import { setDoc, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Einheit } from "../types/Einheit.type";

export default function NeueEinheit() {
  const [open, setOpen] = useState<boolean>(false);

  async function saveEinheit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const labelShort = formData.get("labelShort") as string;
    const labelLong = formData.get("labelLong") as string;

    await setDoc(doc(app, "Einheiten", labelLong), {
      id: uuid,
      labelShort,
      labelLong,
    } as Einheit).then(() => {
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
          <form onSubmit={saveEinheit}>
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
