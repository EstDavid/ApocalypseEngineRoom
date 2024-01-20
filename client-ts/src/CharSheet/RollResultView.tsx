import { BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill
} from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { IRemoveRoll } from '../types';
import RollResults from '@dice-roller/rpg-dice-roller/types/results/RollResults.js';
import RollResult from '@dice-roller/rpg-dice-roller/types/results/RollResult.js';
import { IconType } from 'react-icons';

interface ValToIcon {
  1:IconType
  2:IconType
  3:IconType
  4:IconType
  5:IconType
  6:IconType
}

const valToIcon:ValToIcon = {
  1: BsDice1Fill,
  2: BsDice2Fill,
  3: BsDice3Fill,
  4: BsDice4Fill,
  5: BsDice5Fill,
  6: BsDice6Fill
};

function dieStyle(dice:RollResults[], die:RollResult) {
  if (dice.length == 2) return 'Die';
  return die.modifierFlags == 'd' ? 'Die Dismiss' : 'Die Highlight';
}

function diceIcons(dice:RollResults[]) {
  return dice.map((die, i) => {

    const Icon = valToIcon[die.value as 1 | 2 | 3 | 4 | 5 | 6];
    return < Icon key={i} className={dieStyle(dice, die as unknown as RollResult)}/>;
  });
}

function RollResultView({roll, index, removeRoll}:{roll:DiceRoll, index:number, removeRoll:IRemoveRoll}) {
  return (
    <>
      <div className="RollResult">
        {Array.isArray(roll.rolls) && diceIcons(roll.rolls as RollResults[])}
        <p>
          {roll.rolls.slice(1).map(m => `${m}`).join(' ')} = {roll.total}
        </p>
        <div className="rollCloseBtn" onClick={() => {removeRoll(index);}}>
          <RxCross2 />
        </div>
      </div>
    </>
  );
}

export default RollResultView;