import { app } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditButton from "./EditButton.component";

export default function UpdateRezept() {
  const rezeptName = window.location.pathname.split("/").at(-1);

  const { push } = useRouter();

  const [editMode, setEditMode] = useState(false);

  async function deleteRezept() {
    // mit Await/Async kann auf Aktionen gewartet werden von denen man nicht genau sagen kann wann sie ausgeführt werden (#Promises)
    // .then() passiert dann erst wenn das vorherige Event abgeschlossen ist
    await deleteDoc(doc(app, "Rezepte", rezeptName as string)).then(() =>
      push("/rezepte"),
    );
  }

  // TODO
  async function updateRezept() {
    return;
  }

  return (
    <div className="flex gap-2">
      {editMode && (
        <button className="outline secondary" onClick={deleteRezept}>
          Rezept löschen
        </button>
      )}
      {editMode && (
        <button className="" onClick={updateRezept}>
          Bearbeitung speichern
        </button>
      )}
      {editMode && (
        <button onClick={() => setEditMode(false)}>Bearbeiten abbrechen</button>
      )}
      {!editMode && (
        // <button className="secondary" onClick={() => setEditMode(true)}>
        //   Rezept bearbeiten
        // </button>
        <EditButton onClick={() => setEditMode(true)} />
      )}
    </div>
  );
}
