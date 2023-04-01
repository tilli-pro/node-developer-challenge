#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { spacer } from './utils';
import {
  THEME,
  DIAGNOSTIC_MSG,
  CLI_DESCRIPTION,
  FILE_CONFIG_DESC,
} from './constants';
import Prompter from './prompter';
import { CommanderOptions } from './types';

class TilliTicker {
  init() {
    console.log(
      chalk.bgHex(THEME.DEEP_BLUE).hex(THEME.RED)(
        figlet.textSync('Tilli Ticker', {
          horizontalLayout: 'full',
        })
      )
    );

    spacer();

    const program = new Command();
    program
      .name(chalk.bgHex(THEME.DARK_BLUE)(`tt`))
      .usage(
        chalk.bgHex(THEME.DARK_BLUE)(
          '[-x exchange] [-a api-key] [-c config-file] [exchange:]ticker'
        )
      )
      .option(
        '-x, --exchange',
        `Specific stock exchange to use when doing the stock symbol lookup. This can be appended to the ticker argument directly by preceding the ticker argument with the exchange plus ":" (e.g. NASDAQ:AAPL) Throws if the exchange does not exist or if the stock symbol is not found on the exchange.`
      )
      .option(
        '-a, --apiKey',
        'Use specified AlphaVantage API key. If no global config present or global config has no API key then interactive mode will launch to query the user for an API key.'
      )
      .option(
        '-v, --view',
        'View the stock summary stats for the current day once found or chosen. Is inferred to be true if the -s flag is not present.'
      )
      .option('-s, --save', 'Save the stock symbol and its summary statistics.')
      .option('-l, --list', 'View all saved stocks.')
      .option('-d, --delete', 'Delete a saved stock symbol.')
      .option(
        '-c, --configFile <FILE>',
        'Specify the configuration file to use.'
      )
      .argument('[ticker]')
      .on('--help', () => {
        spacer();
        console.log(chalk.bgHex(THEME.DARK_BLUE)(CLI_DESCRIPTION));
        spacer();
        console.log(FILE_CONFIG_DESC);
        spacer();
        console.log(chalk.hex(THEME.ORANGE)(DIAGNOSTIC_MSG));
        spacer();
      });
    program.parse(process.argv);
    const options: CommanderOptions = program.opts();
    options.ticker = program.processedArgs.pop();
    const prompter = new Prompter(options);
  }
}

const tilliTicker = new TilliTicker();
tilliTicker.init();
