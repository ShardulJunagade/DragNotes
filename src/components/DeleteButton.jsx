import React, { useContext } from 'react'
import { Trash } from '../icons/Trash'
import { NoteContext } from '../context/NoteContext';

const DeleteButton = ({noteId}) => {

  const {setNotes} = useContext(NoteContext);

  const handleDelete = async () => {
    db.notes.delete(noteId);
    setNotes((prevState) => {
      return prevState.filter((note) => note.$id !== noteId)
    });
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  )
}

export default DeleteButton;