import Note from "components/Note";
import AddNote from "components/AddStickyNote";
import { useContext } from "react";
import NoteContext from "noteContext/StickyNoteContext";

//component for creating new sticky notes
const NotesList = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div className="notes-grid">
      {notes.map((note, i) => (
        <Note
          key={note.id}
          note={note}
          zIndex={i}
        />
      ))}
      <AddNote />
    </div>
  );
};

export default NotesList;
