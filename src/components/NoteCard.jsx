import { useEffect, useRef, useState } from 'react';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../utils/utils';
import { db } from '../appwrite/databases';
import { Spinner } from '../icons/Spinner';
import DeleteButton from './DeleteButton';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const NoteCard = ({note}) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  const {setSelectedNote} = useContext(NoteContext);

  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  let mosueStartPos = {x:0, y:0};
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, [])


  const mouseDown = (e) => {
    if (e.target.className === "card-header") {

      setZIndex(cardRef.current);

      mosueStartPos.x = e.clientX;
      mosueStartPos.y = e.clientY;

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setSelectedNote(note);
    }
  }

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mosueStartPos.x - e.clientX,
      y: mosueStartPos.y - e.clientY
    };
  
    mosueStartPos.x = e.clientX;
    mosueStartPos.y = e.clientY;
  
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition)
  }

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
        await db.notes.update(note.$id, payload);
    } catch (error) {
        console.error(error);
    }

    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000)
  }

  return (
    <div className='card' 
      ref={cardRef}
      style={{backgroundColor: colors.colorBody, 
      left:`${position.x}px`,
      top:`${position.y}px`}}>
        
      <div className='card-header'
        onMouseDown={mouseDown}
        style={{backgroundColor: colors.colorHeader}}>
        <DeleteButton noteId={note.$id} />

        {saving && (
        <div className="card-saving">
          <Spinner color={colors.colorText}/>
          <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
        )}

      </div>

      <div className='card-body'> 
        <textarea
          onKeyUp={handleKeyUp}
          onFocus={()=> {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          ref={textAreaRef}
          style={{color: colors.colorText}}
          defaultValue={body}
          onInput={() => {autoGrow(textAreaRef)}}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;