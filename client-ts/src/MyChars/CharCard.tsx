import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import './MyChars.css';


function CharCard({char, deleteChar}) {
  return (
    <Link to={`CharacterSheet?CharID=${char._id}`}>
      <div className='CharCard'>
        <button onClick={(e) => {e.preventDefault(); deleteChar(char._id);}}><FaTrash className="DelIco"/></button>
        <div className='CardCenterDiv'>
          <p className='CharName'>{char.name}</p>
          <p className='playbook'>{char.playbook}</p>
        </div>
        <p className='system'>{char.system}</p>
      </div>
    </Link>
  );
}

export default CharCard;