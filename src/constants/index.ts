import chalk from 'chalk';

export const THEME = {
  GREEN: '#2CC88D',
  PURPLE: '#573280',
  DARK_BLUE: '#011638',
  DEEP_BLUE: '#020119',
  STEEL_BLUE: '#3F88C5',
  RED: '#e61351',
  ORANGE: '#EAA24E',
  WHITE: '#FFF',
  RED_STOCK: '#f93c3c',
  GREEN_STOCK: '#00b457',
};

export const StockExchanges = [
  { title: 'New York Stock Exchange (NYSE)', value: 'NYSE' },
  { title: 'NASDAQ', value: 'NASDAQ' },
  { title: 'London Stock Exchange (LSE)', value: 'LSE' },
  { title: 'Bombay Stock Exchange (BSE)', value: 'BSE' },
  { title: 'National Stock Exchange of India (NSE)', value: 'NSE' },
  { title: 'Singapore Exchange (SGX)', value: 'SGX' },
  { title: chalk.hex(THEME.STEEL_BLUE)('Enter Manually...'), value: null },
];

export const InteractivePrompts = [
  { title: 'View Ticker', value: 'view' },
  { title: 'Save Ticker', value: 'save' },
  { title: 'View & Save Ticker', value: 'viewAndSave' },
  { title: 'List All Tickers', value: 'list' },
  { title: chalk.hex(THEME.RED)('Delete Current Ticker'), value: 'delete' },
  { title: chalk.hex(THEME.GREEN)('Change Ticker?'), value: 'changeTicker' },
  { title: chalk.hex(THEME.ORANGE)('Exit!'), value: null },
];

export const CLI_DESCRIPTION = `DESCRIPTION:
  tt a CLI app that allows you to continuously track stocks using the AlphaVantage API. An AlphaVantage API key is needed to use this utility.`;

export const FILE_CONFIG_DESC = `FILES
  .ttrc
    The global configuration file.`;

export const CLI_CONFIG_START_MSG = `It's time to set up the CLI!`;
export const CLI_CONFIG_FINISH_MSG = `Awesome! You're now ready to unleash the power of the CLI!`;
export const EXIT_CLI_MSG = `Thank you for using our CLI tool. Have a great day!`;

export const DIAGNOSTIC_MSG = `DIAGNOSTICS:
  The following diagnostics may be issued on stderr:

  Rate limit exceeded.
    The API key used in the configuration has gone past the rate limit set by the AlphaVantage API. \n    Please either wait for a new rate period or upgrade your API key.

  Invalid API key.
    The provided API key is invalid or has been revoked. Please check your API key and try again.

  Stock symbol not found.
    The specified stock symbol could not be found. Please verify the stock symbol and try again.

  Stock exchange not supported.
    The specified stock exchange is not supported by the AlphaVantage API. \n    Please check the exchange abbreviation and try again.

  Configuration file error.
    An error occurred while reading or parsing the configuration file. Please verify the contents of the configuration file and try again.`;
