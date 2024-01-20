 function BtnGroup({rollDice, mod}) {
  return (
    <div className='RollButtons'>
      <button className='mainRoll' onClick={()=>{rollDice('2d6', mod);}}>Roll</button>
      <div className='lowerBtnDiv'>
        <button onClick={()=>{rollDice('3d6kh2', mod);}}>A</button>
        <button onClick={()=>{rollDice('3d6kl2', mod);}}>D</button>
      </div>1
    </div>
  );
}

export default BtnGroup;