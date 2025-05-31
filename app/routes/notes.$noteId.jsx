import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import styles from "../styles/note-details.css";
import { getStoredNotes } from "../data/notes";

export default function NoteDetailsPage() {
  const selectedNote = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <NavLink to="/notes">Back to Notes</NavLink>
        </nav>
        <h1>{selectedNote?.title}</h1>
      </header>
      <p id="note-details-content">{selectedNote?.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();

  const selectedNote = notes.find((note) => note.id === params.noteId);

  if (!selectedNote) {
    throw json({ message: "Note not found" }, { status: 404 });
  }

  return selectedNote;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta({ data }) {
  return [
    {
      title: data?.title || "Remix Notes",
      description: data?.description || "A simple notes app built with Remix",
    },
  ];
}
