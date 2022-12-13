import { useContext, useRef, useState } from "react";
import NotesList from "components/NotesList";
import AppBanner from "components/AppBanner";
import NoteContext from "noteContext/StickyNoteContext";
import trash from "assets/trash.png";

const App = () => {
  const { notes, removeStickyNote, updateStickyNote } = useContext(NoteContext);
  const trashRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  const _deleteNote = (e) => {
    const id = e.dataTransfer.getData("id");
    removeStickyNote(id);
    _resetTrashTarget(e);
  };

  const _allowDropTrash = (e) => {
    e.preventDefault();
    if (trashRef.current) {
      trashRef.current.style.backgroundColor = "#DC3535";
      trashRef.current.style.height = "8rem";
    }
  };

  const _resetTrashTarget = () => {
    if (trashRef.current) {
      trashRef.current.style.backgroundColor = darkMode ? "grey" : "#aeaeae";
      trashRef.current.style.height = "6rem";
    }
  };

  const _allowDrop = (e) => {
    e.preventDefault();
  };



  const moveNote = (e) => {
    const id = e.dataTransfer.getData("id");
    const width = e.dataTransfer.getData("x");
    const height = e.dataTransfer.getData("y");
    const x = Math.abs(e.clientX - width);
    const y = Math.abs(e.clientY - height);

    updateStickyNote(id, { x, y });
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container" onDragOver={_allowDrop} onDrop={moveNote}>
        <AppBanner handleToggleDarkMode={setDarkMode} />
        <NotesList />
      </div>
      {notes.length > 0 && (
        <div
          className="trash"
          onDrop={_deleteNote}
          onDragOver={_allowDropTrash}
          onDragLeave={_resetTrashTarget}
          ref={trashRef}
        >
          <img src={trash} alt="" />
          -- Drag sticky notes here to delete

        </div>
      )}
    </div>
  );
};

export default App;
