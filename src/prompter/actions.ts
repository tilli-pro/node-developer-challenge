import ApplicationState from '../core/state';
import AlphaVantageService, {
  AlphaVantageAPIError,
} from '../core/alpha-vantage';
import { createSpinner } from 'nanospinner';
import { displayStockDetails, logError, spacer } from '../utils';

export class InteractivePromptsHandler {
  private applicationState: ApplicationState;
  private alphaVantageService: AlphaVantageService;

  constructor() {
    this.applicationState = ApplicationState.getInstance();
    this.alphaVantageService = new AlphaVantageService(
      this.applicationState.getProperty('apiKey')
    );
  }

  public async handleSelectedOption(selectedOption: string) {
    switch (selectedOption) {
      case 'view':
        await this.handleView();
        break;
      case 'save':
        await this.handleSave();
        break;
      case 'viewAndSave':
        await this.handleView();
        await this.handleSave();
        break;
      case 'list':
        await this.handleList();
        break;
      case 'delete':
        await this.handleDelete();
        break;
      default:
        break;
    }
  }

  private async handleView() {
    try {
      let spin = createSpinner('Loading...');
      spacer();
      let { ticker, exchange } = this.applicationState.getState();
      let getTickerInfo = await this.alphaVantageService.getStockInfo(
        `${ticker}.${exchange}`
      );
      spin.success({ text: 'Loaded' });
      displayStockDetails([getTickerInfo]);
      return true;
    } catch (e) {
      if (e instanceof AlphaVantageAPIError) {
        logError(`Alpha Vantage API error: ${e.message}`);
      } else {
        logError(`Unexpected error: ${e.message}`);
      }
    }
  }

  private async handleSave() {
    try {
      let spin = createSpinner('Processing...');
      spacer();
      const { ticker, exchange } = this.applicationState.getState();
      let getTickerInfo = await this.alphaVantageService.getStockInfo(
        `${ticker}.${exchange}`
      );
      this.applicationState.setStockData(exchange, ticker, getTickerInfo);
      spin.success({ text: 'Done....' });
      spacer();
      return true;
    } catch (e) {
      if (e instanceof AlphaVantageAPIError) {
        logError(`Alpha Vantage API error: ${e.message}`);
      } else {
        logError(`Unexpected error: ${e.message}`);
      }
    }
  }

  private async handleList() {
    try {
      let spin = createSpinner('Loading...');
      spacer();
      const { exchange } = this.applicationState.getState();
      let stocksByExchange =
        this.applicationState.getStocksByExchange(exchange);
      const output = [];
      for (let key in stocksByExchange) {
        output.push(stocksByExchange[key]);
      }
      spin.success({ text: 'Done....' });
      displayStockDetails(output);
    } catch (e) {
      logError(`Unexpected error: ${e.message}`);
    }
  }

  private async handleDelete() {
    try {
      let spin = createSpinner('Processing...');
      spacer();
      const { ticker, exchange } = this.applicationState.getState();
      this.applicationState.deleteStockByExchange(exchange, ticker);
      spin.success({ text: 'Done....' });
      spacer();
    } catch (e) {
      logError(`Unexpected error: ${e.message}`);
    }
  }
}
