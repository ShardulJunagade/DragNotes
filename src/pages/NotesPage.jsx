import { useContext } from 'react';
import NoteCard from '../components/NoteCard.jsx';
import { NoteContext } from '../context/NoteContext.jsx';
// import {fakeData as notes} from "../assets/fakeData.js"; 

const NotesPage = () => {
  const {notes} = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotesPage;