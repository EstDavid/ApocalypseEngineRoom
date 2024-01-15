import { useState, useEffect } from 'react'
import BtnGroup from './BtnGroup'

function StatView({stat, handler, rollDice}) {
  return (
    <div className='StatView'>
        <input type="text" name={stat.name} defaultValue={stat.value} onChange={e => handler(stat.name, e.target.value)}/>
        <p className='statTitle'>{stat.name}</p>
        <BtnGroup rollDice={rollDice} mod={stat.value}/>
    </div>
  )
}

export default StatView