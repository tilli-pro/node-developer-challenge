import axios, { AxiosInstance } from 'axios';
import ApplicationState from '../core/state';
import { AlphaVantageApiResponse } from 'index';
import * as process from 'process';

export class AlphaVantageAPIError extends Error {}

class AlphaVantageService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly axiosInstance: AxiosInstance;
  private applicationState: ApplicationState;

  constructor(apiKey: string) {
    this.applicationState = ApplicationState.getInstance();
    this.apiKey = apiKey;
    this.apiUrl = process.env.ALPHA_VANTAGE_API_URL;
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 5000,
    });
  }

  async getStockInfo(symbol: string) {
    try {
      //check in local cache if we already fetched!
      let checkCacheForSymbol = this.applicationState.getFromCache(symbol);
      if (checkCacheForSymbol) {
        return checkCacheForSymbol;
      }

      const response = await this.axiosInstance.get('', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: this.apiKey,
        },
      });

      this.handleAlphaVantageErrors(response);

      const data = response.data['Global Quote'];
      let apiResponse: AlphaVantageApiResponse = {
        symbol: data['01. symbol'],
        date: data['07. latest trading day'],
        open: parseFloat(data['02. open']),
        high: parseFloat(data['03. high']),
        low: parseFloat(data['04. low']),
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        volume: parseInt(data['06. volume']),
      };
      await this.applicationState.addToCache(symbol, apiResponse);
      return apiResponse;
    } catch (error) {
      throw error;
    }
  }

  private handleAlphaVantageErrors(response) {
    if (response.data['Error Message']) {
      const errorMessage = response.data['Error Message'];
      if (errorMessage.toLowerCase().includes('invalid')) {
        throw new AlphaVantageAPIError('Invalid symbol or API key');
      } else if (errorMessage.toLowerCase().includes('rate limit exceeded')) {
        throw new AlphaVantageAPIError('API rate limit exceeded');
      } else {
        throw new AlphaVantageAPIError(errorMessage);
      }
    }
    if (response.data['Note']) {
      const note = response.data['Note'];
      throw new AlphaVantageAPIError(`API usage limit reached: ${note}`);
    }
    return true;
  }
}

export default AlphaVantageService;
