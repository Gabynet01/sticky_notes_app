import useStickyNotes from "stickyNoteLogic/useStickyNotes";
import { createContext } from "react";

//create a context that will hold the sticky notes data
const stickyNotecontext = createContext({});

export function Notes({ children }) {

  const stickyNoteSettings = useStickyNotes();
  const { notes } = stickyNoteSettings;

  return (
    <stickyNotecontext.Provider value={{ notes, ...stickyNoteSettings }}>
      {children}
    </stickyNotecontext.Provider>
  );
}
export default stickyNotecontext;
