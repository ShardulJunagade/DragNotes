import { useEffect, useRef, useState } from 'react';
import { Trash } from '../icons/Trash';
import { autoGrow, setNewOffset } from '../utils/utils';

const NoteCard = ({note}) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  let mosueStartPos = {x:0, y:0};
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, [])


  const mouseDown = (e) => {
    mosueStartPos.x = e.clientX;
    mosueStartPos.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
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

  return (
    <div className='card' 
      ref={cardRef}
      style={{backgroundColor: colors.colorBody, 
      left:`${position.x}px`,
      top:`${position.y}px`}}>
        
      <div className='card-header'
        onMouseDown={mouseDown}
        style={{backgroundColor: colors.colorHeader}}>
        <Trash />
      </div>

      <div className='card-body'> 
        <textarea
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