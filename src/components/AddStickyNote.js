import { useContext, useState } from "react";

import StickyNoteContext from "noteContext/StickyNoteContext";

const AddStickyNote = () => {
  const [noteText, setNoteText] = useState("");
  const { addStickyNote } = useContext(StickyNoteContext);

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleSaveClick = () => {
    addStickyNote({ text: noteText });
    setNoteText("");
  };

  return (
    <div className="note new">
      <textarea
        rows="10"
        cols="10"
        placeholder="Type text here to add to a note..."
        value={noteText}
        onChange={handleChange}
      />
      <div className="note-footer-static">
        <button
          disabled={noteText.trim().length === 0}
          className="stick"
          onClick={handleSaveClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddStickyNote;
