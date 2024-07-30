import React from 'react'
import { Trash } from '../icons/Trash'

const DeleteButton = ({noteId, setNotes}) => {
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