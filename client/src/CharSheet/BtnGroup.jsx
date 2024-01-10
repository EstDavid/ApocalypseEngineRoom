import { useState, useEffect } from 'react'

function BtnGroup() {
  return (
    <div className='RollButtons'>
        <button className='mainRoll'>Roll</button>
        <div className='lowerBtnDiv'>
            <button>A</button>
            <button>D</button>
        </div>
    </div>
  )
}

export default BtnGroup