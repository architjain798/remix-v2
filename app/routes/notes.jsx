import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as NewNoteLinks } from "../components/NewNote";
import NoteList, { links as notesListLink } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";

export default function Notes() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  console.log("Loader called in notes route");
  console.log("Loaded notes:", notes.length);
  if (!notes || notes.length === 0) {
    throw json(
      { message: "No notes found!" },
      { status: 404, statusText: "No notes found!" }
    );
  }

  return notes;
}

export async function action({ request }) {
  console.log("Action called in notes route");
  console.log("Received data:", request);

  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get("title"),
  //   content: formData.get("content"),
  // };
  const noteData = Object.fromEntries(formData);
  // Add the validation logic here

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title must be atleast 5 character long" };
  }

  const exisitingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = exisitingNotes.concat(noteData);
  console.log("Updated notes:", updatedNotes);
  await storeNotes(updatedNotes);

  // to add extra delay to see loading state
  // This is not necessary in production, but useful for demo purposes
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return redirect("/notes");
}

export function links() {
  return [...NewNoteLinks(), ...notesListLink()];
}

// // error boundary for not found
// export function CatchBoundary() {
//   const caughtResponse = useCatch();

//   const message = caughtResponse.data?.message || "Data not found!";

//   return (
//     <main>
//       <NewNote />
//       <p className="info-message">{message}</p>
//     </main>
//   );
// }

// // global error boundary for this route
// export function ErrorBoundary({ error }) {
//   return (
//     <main className="error">
//       <h1>An error related to notes occurred!</h1>
//       <p>{error.message}</p>
//       <p>
//         Back to <a href="/">safety</a>!
//       </p>
//     </main>
//   );
// }

export function meta() {
  return [
    {
      title: "All Notes",
      description: "Manage your notes with ease.",
    },
  ];
}
