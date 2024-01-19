import { ITextTracker, ITracker, ITrackerHandlers, IUpdateTextTracker, ITrackerValueObj} from "../types";

function HorizontalTracker(tracker, handler) {
  return (
    <div className='Horizontal'>
      {tracker.value.map((c, i) => <input type="checkbox" className='check' name={`${tracker.name}-${i}`} checked={c.value} onChange={e => handler(tracker.name, i, e.target.value)} key={i}/>)}
    </div>
  );
}

function VerticalTracker(tracker, handler) {
  return (
    <div className='Vertical'>
      {tracker.value.map((c, i) => <div className='verticalItem' key={i}>
        <input type="checkbox" className='check' name={`${tracker.name}-${i}`} checked={c.value} onChange={e => handler(tracker.name, i, e.target.value)}/>
        <p>{c.text}</p>
      </div>
      )}
    </div>
  );
}

function TextTracker(tracker:ITracker<string>, handler:IUpdateTextTracker) {
  return (
    <div className='Text'>
      <textarea name={tracker.name} rows={3} defaultValue={tracker.value} onChange={e => handler(tracker.name, e.target.value)}></textarea>
    </div>
  );
}

function contentSetter(tracker:ITracker<ITrackerValueObj[] | string>, trackerHandlers:ITrackerHandlers) {
  if (tracker.type == 'horizontal') return HorizontalTracker(tracker, trackerHandlers.updateCheckboxTracker);
  if (tracker.type == 'vertical') return VerticalTracker(tracker, trackerHandlers.updateCheckboxTracker);
  if (tracker.type == 'text') return TextTracker(tracker<ITracker<string>>, trackerHandlers.updateTextTracker);
}

function Tracker({tracker, trackerHandlers}:{tracker:ITracker<ITrackerValueObj[] | string>, trackerHandlers:ITrackerHandlers}) {
  return (
    <div className='Tracker'>
      <h2>{tracker.name}</h2>
      {tracker.description ? <p>{tracker.description}</p> : ''}
      {contentSetter(tracker, trackerHandlers)}
    </div>
  );
}

export default Tracker;