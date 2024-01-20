import BtnGroup from './BtnGroup';
import {IMove, IRollDice, IToggleMoveAvailable, IToggleMoveAddMod} from '../types';

function MoveActionMaker(move: IMove, toggleMoveAddMod:IToggleMoveAddMod, rollDice:IRollDice) {
  if (move.isAvailable){
    if (move.isRoll) return <BtnGroup rollDice={rollDice} mod={move.mod as number}></BtnGroup>;
    if (move.mod) return <input className='check' name={move.name + ' Mod'} type='checkbox' checked={move.isModAdded} onChange={() => toggleMoveAddMod(move)}/>;
  }
  return <></>;
}

function Move({move, toggleMoveAvailable, toggleMoveAddMod, rollDice}:{move:IMove,toggleMoveAvailable:IToggleMoveAvailable, toggleMoveAddMod:IToggleMoveAddMod, rollDice:IRollDice}) {
  return (
    <div className='MoveDiv'>
      <input className='moveAvailable' name={move.name} type="checkbox" checked={move.isAvailable} onChange={() => toggleMoveAvailable(move)}/>
      <p><span>{move.name}:</span>  {move.description}</p>
      <div className='moveAction'>{MoveActionMaker(move, toggleMoveAddMod, rollDice)}</div>
    </div>
  );
}

export default Move;