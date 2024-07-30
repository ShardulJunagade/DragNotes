import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const Color = ({ color }) => {
  const { selectedNote, notes, setNotes, db } = useContext(NoteContext);

  const changeColor = async () => {
    console.log("Color: ", color);
    console.log("Selected Note: ", selectedNote);
    
      const currentNoteIndex = notes.findIndex(
          (note) => note.$id === selectedNote.$id
      );

      const updatedNote = {
          ...notes[currentNoteIndex],
          colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes(newNotes);

      const response = await db.notes.update(selectedNote.$id, {
          colors: JSON.stringify(color),
      });
  };

  return (
    <div className='color' onClick={changeColor} style={{ backgroundColor: color.colorHeader }}>
    </div>
  );
};

export default Color;