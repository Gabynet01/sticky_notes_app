import { useEffect, useRef, useState } from "react";
import useStickyNotes from "stickyNoteLogic/useStickyNotes";

export const useDragNote = ({ note }) => {
  const [isDragging] = useState(false);
  const ref = useRef(null);

  const { focusStickyNote } = useStickyNotes();

  useEffect(() => {
    function onDragStart(e) {
      e.dataTransfer.setData("id", note.id);
      e.dataTransfer.setData("x", ref.current.offsetWidth / 2);
      e.dataTransfer.setData("y", ref.current.offsetHeight / 2)
    }
    let refObserver = ref.current;
    refObserver.addEventListener("dragstart", onDragStart);
    return () => {
      if (refObserver)
        refObserver.removeEventListener("dragstart", onDragStart);
    };
  }, [focusStickyNote, note.id]);

  return [ref, isDragging];
};
