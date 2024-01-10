import { useState, useEffect } from 'react'

function HorizontalTracker(tracker) {
    return (
        <div className='Horizontal'>
            {tracker.value.map((c, i) => <input type="checkbox" checked={c.value} onChange={() => {}} key={i}/>)}
        </div>
    )
}
  
function VerticalTracker(tracker) {
    return (
        <div className='vertical'>
            {tracker.value.map((c, i) => <div key={i}>
                <input type="checkbox" checked={c.value} onChange={() => {}}/>
                {c.text}
            </div> 
            )}
        </div>
    )
}

function TextTracker(tracker) {
    return (
        <div className='Text'>
            <textarea rows="3" value={tracker.value} onChange={()=> {}}></textarea>
        </div>
    )
}

function contantSetter(tracker) {
    if (tracker.type == 'horizontal') return HorizontalTracker(tracker)
    if (tracker.type == 'vertical') return VerticalTracker(tracker)
    if (tracker.type == 'text') return TextTracker(tracker)
}

function Tracker({tracker}) {
  return (
    <div className='Tracker'>
        <h2>{tracker.name}</h2>
        {tracker.description ? <p>{tracker.description}</p> : ""}
        {contantSetter(tracker)}
    </div>
  )
}

export default Tracker