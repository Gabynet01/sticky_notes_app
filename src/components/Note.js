import { useDragNote } from "stickyNoteLogic/useDragStickyNote";
import { ResizeableBorder } from "components/ResizeableBorder";
import NoteContext from "noteContext/StickyNoteContext";
import { useContext } from "react";

const Note = ({ note, zIndex }) => {
  const {
    text,
    width = 200,
    height = 200,
    x,
    y,
    bgColor,
  } = note;
  const [ref] = useDragNote({ note });

  const { updateStickyNote, focusStickyNote } = useContext(NoteContext);

  //allows users to change text content in existing sticky notes
  const updateText = (e) => {
    const text = e.target.innerText;
    updateStickyNote(note.id, {
      text,
    });
  };

  //allows users to change existing sticky notes background color
  const updateColor = (e) => {
    const color = e.target.value;
    updateStickyNote(note.id, {
      bgColor: color,
    });
  };
  const handleMouseDown = () => {
    focusStickyNote(note.id);
  };

  return (
    <div
      className="note-container"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <ResizeableBorder note={note} />
      <div
        className="note"
        draggable={true}
        ref={ref}
        style={{ background: bgColor }}
      >
        <p
          contentEditable={true}
          onInput={updateText}
          suppressContentEditableWarning={true}
          className="note-text"
        >
          {text}
        </p>
        <div className="note-footer">
          <input type="color" className="color-input-box" defaultValue={bgColor} onChange={updateColor} />
        </div>
      </div>
    </div>
  );
};

export default Note;
