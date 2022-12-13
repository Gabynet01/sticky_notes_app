import { useEffect, useState } from "react";
import { storeNoteWithKey } from "stickyNoteLogic/variableConstants";


function getStickyNotes() {
  console.log("i run");
  let savedNotes;
  try {
    savedNotes = JSON.parse(localStorage.getItem(storeNoteWithKey));
  } catch (error) {
    console.error("Could not retrieve saved notes. Restarting");
  }

  return (
    savedNotes || [
    ]
  );
}
export default function useStickyNotes() {
  //get the sticky notes with default data

  const [notes, setNotes] = useState(getStickyNotes());

  useEffect(() => {
    localStorage.setItem("sticky-note-data", JSON.stringify(notes));
  }, [notes]);

  const addStickyNote = ({ text }) => {
    const latestStickyNote = notes[notes.length - 1];

    setNotes((sn) => {
      return [
        ...sn,
        {
          id: sn.length === 0 ? 1 : sn[sn.length - 1].id + 1,
          text,
          x: latestStickyNote ? latestStickyNote.x + 50 : 0,
          y: latestStickyNote ? latestStickyNote.y + 50 : 0,
          width: 320,
          height: 320,
          bgColor: "#7bf572",
        },
      ];
    });
  };

  const focusStickyNote = (id) => {
    let currentNote = [...notes];
    let index = currentNote.findIndex((n) => {
      return n.id === id;
    });
    let itemToRemove = currentNote.find((n) => {
      return n.id === id;
    })
    currentNote.splice(index, 1);
    currentNote.push(itemToRemove)
    setNotes(currentNote);
  };

  const removeStickyNote = (id) => {
    setNotes((n) => {
      return n.filter((note) => `${note.id}` !== id);
    });
  };

  const updateStickyNote = (id, note) => {
    setNotes((allNotes) => {
      // Find the index of the note to update
      const index = allNotes.findIndex((note) => `${note.id}` === `${id}`);

      // If the note exists, update it in the array
      if (index !== -1) {
        return [
          ...allNotes.slice(0, index),
          {
            ...allNotes[index],
            ...note
          },
          ...allNotes.slice(index + 1)
        ];
      }

      // Otherwise, return the original array of notes
      return allNotes;
    });
  };


  const move = (id, x, y) => {
    updateStickyNote(id, { x, y });
  };

  const resizeStickyNote = (id, x, y, width, height) => {
    updateStickyNote(id, { x, y, width, height });
  };


  return {
    notes,
    addStickyNote,
    removeStickyNote,
    updateStickyNote,
    move,
    resizeStickyNote,
    focusStickyNote,
  };
}
