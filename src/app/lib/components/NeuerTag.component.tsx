"use client";

import { app } from "@/firebase";
import { setDoc, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../types/Tag.type";

export default function NeuerTag() {
  const [open, setOpen] = useState<boolean>(false);

  async function saveTag(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await setDoc(doc(app, "Tags", name), {
      id: uuid,
      name,
      description,
    } as Tag).then(() => {
      form.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Neuer Tag</button>

      <dialog open={open}>
        <article>
          <header>
            <button
              aria-label="Close"
              rel="prev"
              onClick={() => setOpen(false)}
            ></button>
            <p>
              <strong>Neuen Tag hinzufügen</strong>
            </p>
          </header>
          <form onSubmit={saveTag}>
            <fieldset>
              <label>
                Name
                <input type="text" name="name" required placeholder="Name" />
              </label>
              <label>
                Beschreibung
                <input
                  type="text"
                  name="description"
                  required
                  placeholder="Beschriebung"
                />
              </label>
            </fieldset>

            <input type="submit" value="Tag speichern" />
          </form>
        </article>
      </dialog>
    </>
  );
}
