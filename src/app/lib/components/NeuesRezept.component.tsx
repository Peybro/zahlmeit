"use state";

import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app } from "@/firebase";
import Bewertung from "./Bewertung.component";
import DeleteButton from "./DeleteButton.component";
import Tag from "./Tag.component";
import { Zutat as ZutatType, ID, Rezept } from "../types";
import Zutat from "./Zutat.component";

export default function NeuesRezept() {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [zutatenListe, setZutatenListe] = useState<ZutatType[]>([]);
  const [newZutatName, setNewZutatName] = useState<string>("");
  const [newZutatMenge, setNewZutatMenge] = useState<string>("");
  const [newZutatEinheit, setNewZutatEinheit] = useState<string>("");

  function addNewZutat() {
    setZutatenListe((prev) => [
      ...prev,
      {
        name: newZutatName,
        menge: parseInt(newZutatMenge),
        einheit: newZutatEinheit,
      },
    ]);
    setNewZutatName("");
    setNewZutatMenge("");
    setNewZutatEinheit("");
  }

  const [tagsListe, setTagsListe] = useState<string[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");

  function addNewTag() {
    setTagsListe((prev) => [...prev, newTagName]);
    setNewTagName("");
  }

  async function saveRezept(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const uuid = uuidv4();
    const name = formData.get("name") as string;
    const anleitung = formData.get("anleitung") as string;
    // const bild;
    const bewertung = formData.get("bewertung") as string;

    await setDoc(doc(app, "Rezepte", name), {
      id: uuid,
      name,
      zutaten: zutatenListe,
      anleitung: anleitung.split("\n"),
      bild: "",
      bewertung: parseInt(bewertung),
      tags: tagsListe,
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
              <div className="flex justify-between gap-2">
                <label>
                  Bild
                  <input type="file" name="bild" placeholder="Bild" />
                </label>

                <label>
                  {/* Bewertung */}
                  <Bewertung type="stars" name="bewertung" max={5} />
                </label>
              </div>

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
                {zutatenListe.map((zutat, i) => {
                  return (
                    <Zutat
                      zutat={zutat}
                      onDelete={() =>
                        setZutatenListe((prev) =>
                          prev.filter((_z, j) => i !== j),
                        )
                      }
                    />
                  );
                })}
              </ul>
              <fieldset role="group">
                <input
                  type="text"
                  value={newZutatName}
                  onChange={(e) => setNewZutatName(e.currentTarget.value)}
                  placeholder="Neue Zutat"
                />
                <input
                  type="number"
                  value={newZutatMenge}
                  onChange={(e) => setNewZutatMenge(e.currentTarget.value)}
                  placeholder="Menge"
                />
                <input
                  type="text"
                  value={newZutatEinheit}
                  onChange={(e) => setNewZutatEinheit(e.currentTarget.value)}
                  placeholder="Einheit"
                />
                <button
                  className="outline"
                  onClick={addNewZutat}
                  disabled={
                    newZutatName === "" ||
                    newZutatMenge === "" ||
                    newZutatEinheit === ""
                  }
                >
                  Add
                </button>
              </fieldset>
            </fieldset>
          </form>

          <label className="mt-4">
            Anleitung
            <textarea
              form="newRezeptForm"
              name="anleitung"
              required
              placeholder="Jeder Zeilenumbruch entspricht einem Schritt"
            />
          </label>

          <label>Tags</label>

          <div className="grid mb-2">
            {tagsListe.map((tag, i) => {
              return (
                <Tag
                  tag={tag}
                  onDeleteTag={() =>
                    setTagsListe((prev) => prev.filter((_t, j) => i !== j))
                  }
                />
              );
            })}
          </div>
          <fieldset role="group">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.currentTarget.value)}
              placeholder="Neuer Tag"
            />
            <button
              className="outline"
              onClick={addNewTag}
              disabled={newTagName === ""}
            >
              Add
            </button>
          </fieldset>

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
