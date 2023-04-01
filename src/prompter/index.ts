import prompts, { PromptObject } from 'prompts';
import * as path from 'path';
import { promises as fs } from 'fs';
import { RCFileContent } from '../types';
import ApplicationState from '../core/state';
import chalk from 'chalk';
import { logError, spacer } from '../utils';
import {
  THEME,
  StockExchanges,
  InteractivePrompts,
  EXIT_CLI_MSG,
  CLI_CONFIG_START_MSG,
  CLI_CONFIG_FINISH_MSG,
} from '../constants';
import { InteractivePromptsHandler } from './actions';

class Prompter {
  private exchange: string;
  private apiKey: string;
  private viewStock: boolean;
  private saveStock: boolean;
  private listStock: boolean;
  private deleteStock: boolean;
  private configFile: string;
  private ticker: string;
  private isManualMode: Boolean = false;
  private applicationState: ApplicationState;

  constructor(params) {
    this.applicationState = ApplicationState.getInstance();
    const {
      exchange,
      apiKey,
      view,
      save,
      list,
      delete: deleteOption,
      configFile,
      ticker,
    } = params;

    this.exchange = exchange;
    this.apiKey = apiKey;
    this.viewStock = view;
    this.saveStock = save;
    this.listStock = list;
    this.deleteStock = deleteOption;
    this.configFile = configFile;
    this.ticker = ticker;

    if (this.ticker && ticker.includes(':')) {
      const [exchangeValue, tickerValue] = ticker.split(':');
      this.exchange = exchangeValue;
      this.ticker = tickerValue;
    }

    this.promptForMandatory();
  }

  private mapArgsToActionPrompts() {
    let actionToTake = '';
    switch (true) {
      case this.viewStock && this.saveStock:
        actionToTake = 'viewAndSave';
        break;
      case this.viewStock:
        actionToTake = 'view';
        break;
      case this.saveStock:
        actionToTake = 'save';
        break;
      case this.deleteStock:
        actionToTake = 'delete';
        break;
      case this.listStock:
        actionToTake = 'list';
        break;
      default:
        break;
    }
    return actionToTake;
  }

  public async actionPrompts() {
    let actions = new InteractivePromptsHandler();
    let actionToTake = this.mapArgsToActionPrompts();
    if (actionToTake !== '') {
      this.isManualMode = true;
      await actions.handleSelectedOption(actionToTake);
    } else {
      this.isManualMode = false;
      const { selectedOption } = await prompts({
        type: 'select',
        name: 'selectedOption',
        message: 'Which action would you like to perform?',
        choices: InteractivePrompts,
      });
      if (!selectedOption) {
        spacer();
        console.log(chalk.hex(THEME.ORANGE)(EXIT_CLI_MSG));
        spacer();
        return;
      }
      if (selectedOption === 'changeTicker') {
        const { ticker } = await prompts({
          type: 'text',
          name: 'ticker',
          message: 'Please provide ticker:',
          validate: (value) =>
            value.length < 3 ? 'Please enter a valid ticket' : true,
        });
        this.ticker = ticker;
        this.applicationState.setTicker(ticker);
      }
      await actions.handleSelectedOption(selectedOption);
      await this.actionPrompts();
    }
  }

  public async promptForMandatory() {
    const promptsToRun: PromptObject[] = [];
    if (this.configFile) {
      let processConfigFile = await this.checkForConfigFile();
      if (!processConfigFile) return;
    }
    if (!this.exchange || !this.apiKey) {
      console.log(chalk.bgHex(THEME.PURPLE)(CLI_CONFIG_START_MSG));
      spacer();
    }
    if (!this.apiKey) {
      promptsToRun.push({
        type: 'text',
        name: 'apiKey',
        message: 'Enter the API key:',
        validate: (value) =>
          value.length < 3 ? 'Please enter valid api key' : true,
      });
    }
    if (!this.exchange) {
      promptsToRun.push({
        type: 'select',
        name: 'exchange',
        message: 'Select a stock exchange:',
        choices: StockExchanges,
      });
      promptsToRun.push({
        type: (prev) => (prev === null ? 'text' : null),
        name: 'exchange',
        message: 'Please provide the exchange code.',
        validate: (value) =>
          value < 3 ? `Please provide valid exchange code.` : true,
      });
    }
    if (!this.ticker) {
      promptsToRun.push({
        type: 'text',
        name: 'ticker',
        message: 'Please provide ticker:',
        validate: (value) =>
          value.length < 3 ? 'Please enter a valid ticket' : true,
      });
    }

    const { exchange, apiKey, ticker } = await prompts(promptsToRun);
    this.exchange = exchange || this.exchange;
    this.apiKey = apiKey || this.apiKey;
    this.ticker = ticker || this.ticker;
    this.applicationState.setApiKey(this.apiKey);
    this.applicationState.setExchange(this.exchange);
    this.applicationState.setTicker(this.ticker);
    spacer();
    if (this.isManualMode) {
      console.log(chalk.bgHex(THEME.PURPLE)(CLI_CONFIG_FINISH_MSG));
      spacer();
    }
    await this.actionPrompts();
  }

  private async checkForConfigFile() {
    try {
      const filePath = path.resolve(process.cwd(), this.configFile);
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData: RCFileContent = JSON.parse(data);
      this.apiKey = jsonData.apiKey || null;
      this.exchange = jsonData.exchange || null;
      this.applicationState.setApiKey(this.apiKey);
      this.applicationState.setExchange(this.exchange);
      return true;
    } catch (error) {
      logError(`Invalid .ttrc File.`);
      return false;
    }
  }
}

export default Prompter;
