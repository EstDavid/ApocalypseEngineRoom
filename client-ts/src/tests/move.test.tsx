import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Move from '../CharSheet/Move';

const user = userEvent.setup();
const mockToggle = jest.fn();
const mockMod = jest.fn();
const mockRoll = jest.fn();

const mockMove = { '_id':'659d689ad7857996ec107866',
  'system': 'Brindlewood Bay',
  'playbook': 'basic',
  'name': 'The Gold Crown Mysteries Move',
  'description': 'Once per mystery, when any Maven says “This reminds me of something that happened to Amanda Delacourt!”, work with the other players to describe how something that is happening in the situation reminds the Mavens of an event from one of the Gold Crown Mysteries. At a minimum, you must provide the following information: The name of the Gold Crown Mystery in question (no repeats, please!), The problem or situation Amanda found herself in that is similar to what the Mavens are experiencing, and How Amanda eventually overcame the problem or resolved the situation. Then, take a 12+ to a single relevant roll OR state a fact about the current situation that the Keeper must incorporate. Note: Generally-speaking, this move can only be used once per mystery, per group.',
  'isAvailable': true,
  'isRoll': true };

it('should call the dice roller on stat click', async () => {
  render(<Move move={mockMove}
    toggleMoveAvailable={mockToggle}
    toggleMoveAddMod={mockMod}
    rollDice={mockRoll} />);

  const rollButton = screen.getByText('Roll');
  await user.click(rollButton);

  expect(mockRoll).toHaveBeenCalled();

});