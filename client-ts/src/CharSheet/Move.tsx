import BtnGroup from './BtnGroup';
import {Move} from '../types';

function MoveActionMaker(move: Move, toggleMoveAddMod, rollDice) {
  if (move.isAvailable){
    if (move.isRoll) return <BtnGroup rollDice={rollDice} mod={move.mod}></BtnGroup>;
    if (move.mod) return <input className='check' name={move.name + ' Mod'} type='checkbox' checked={move.isModAdded} onChange={e => toggleMoveAddMod(move)}/>;
  }
  return <></>;
}

function Move({move, toggleMoveAvailable, toggleMoveAddMod, rollDice}:{move:Move}) {
  return (
    <div className='MoveDiv'>
      <input className='moveAvailable' name={move.name} type="checkbox" checked={move.isAvailable} onChange={e => toggleMoveAvailable(move)}/>
      <p><span>{move.name}:</span>  {move.description}</p>
      <div className='moveAction'>{MoveActionMaker(move, toggleMoveAddMod, rollDice)}</div>
    </div>
  );
}

export default Move;