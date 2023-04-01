import Table from 'cli-table3';
import chalk from 'chalk';
import { THEME } from '../constants';

export const spacer = () => console.log('');

export const logError = (msg) =>
  console.log(chalk.bgHex(THEME.RED).hex(THEME.WHITE)(msg));

export const displayStockDetails = (obj) => {
  const table = new Table({
    head: [
      'Ticker ✌️',
      'Date ⌚',
      'Open ☼',
      'High ▲',
      'Low ▼',
      'Price $',
      'Change ∓',
      'Volume 📦',
    ],
    style: { head: [], border: [] },
  });

  const arrayOfValues = obj.map((obj) => {
    const color =
      obj.change < 0
        ? chalk.hex(THEME.RED_STOCK)
        : chalk.hex(THEME.GREEN_STOCK);
    return Object.values(obj).map((value) => color(value));
  });

  table.push(...arrayOfValues);
  spacer();
  console.log(table.toString());
  spacer();
};
