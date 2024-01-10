import { useState, useEffect } from 'react'
import BtnGroup from './BtnGroup'

function MoveActionMaker(move) {
    if (move.isAvailable){
        if (move.isRoll) return <BtnGroup></BtnGroup>
        if (move.mod) return <input type='checkbox'/>
    } 
    return <></>
}

function Move({move}) {
  return (
    <div className='MoveDiv'>
        <input className='moveAvailable' type="checkbox" checked={move.isAvailable} onChange={() => {}}/>
        <p><span>{move.name}: </span>{move.description}</p>
        <div className='moveAction'>{MoveActionMaker(move)}</div>
    </div>
  )
}

export default Move