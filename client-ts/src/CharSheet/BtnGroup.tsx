import { IRollDice } from '../types';

function BtnGroup({rollDice, mod}:{rollDice:IRollDice, mod:number}) {
  return (
    <div className='RollButtons'>
      <button className='mainRoll' onClick={()=>{rollDice('2d6', mod);}}>Roll</button>
      <div className='lowerBtnDiv'>
        <button onClick={()=>{rollDice('3d6kh2', mod);}} aria-description='Roll with advantage'>A</button>
        <button onClick={()=>{rollDice('3d6kl2', mod);}} aria-description='Roll with disadvantage'>D</button>
      </div>
    </div>
  );
}

export default BtnGroup;