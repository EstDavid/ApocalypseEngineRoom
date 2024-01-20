import BtnGroup from './BtnGroup';
import {Stat, IUpdateStat} from '../types';

function StatView({stat, handler, rollDice}:{stat:Stat, handler:IUpdateStat}) {
  return (
    <div className='StatView'>
      <input type="text" name={stat.name} defaultValue={stat.value}
        onChange={e => handler(stat.name, e.target.value as unknown as number)}/> //!!FIXME
      <p className='statTitle'>{stat.name}</p>
      <BtnGroup rollDice={rollDice} mod={stat.value}/>
    </div>
  );
}

export default StatView;