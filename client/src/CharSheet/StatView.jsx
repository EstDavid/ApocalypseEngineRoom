import { useState, useEffect } from 'react'
import BtnGroup from './BtnGroup'

function StatView({stat}) {
  return (
    <div className='StatView'>
        <input type="text" name={stat.name} defaultValue={stat.value}/>
        <p className='statTitle'>{stat.name}</p>
        <BtnGroup></BtnGroup>
    </div>
  )
}

export default StatView