import { BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill
} from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const valToIcon = {
  1: BsDice1Fill,
  2: BsDice2Fill,
  3: BsDice3Fill,
  4: BsDice4Fill,
  5: BsDice5Fill,
  6: BsDice6Fill
};

function dieStyle(dice, die) {
  if (dice.length == 2) return 'Die';
  return die.modifierFlags == 'd' ? 'Die Dismiss' : 'Die Highlight';
}

function diceIcons(dice) {
  return dice.map((die, i) => {
    const Icon = valToIcon[die.value];
    return < Icon key={i} className={dieStyle(dice, die)}/>;
  });
}

function RollResultView({roll, index, removeRoll}) {
  return (
    <div className="RollResult">
      {diceIcons(roll.rolls[0].rolls)}
      <p>
        {roll.rolls.slice(1).map(m => `${m}`).join(' ')} = {roll.total}
      </p>
      <div className="rollCloseBtn" onClick={() => {removeRoll(index);}}>
        <RxCross2 />
      </div>
    </div>
  );
}

export default RollResultView;