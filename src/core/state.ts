class ApplicationState {
  private static instance: ApplicationState;

  exchange: string;
  apiKey: string;
  ticker: string;
  stockData: Record<string, any>;
  cache: Record<string, any>;

  private constructor(
    exchange: string,
    apiKey: string,
    ticker: string,
    stockData: Record<string, any>
  ) {
    this.exchange = exchange;
    this.apiKey = apiKey;
    this.ticker = ticker;
    this.stockData = stockData;
    this.cache = {};
  }

  public static getInstance(): ApplicationState {
    if (!ApplicationState.instance) {
      ApplicationState.instance = new ApplicationState('', '', '', {});
    }
    return ApplicationState.instance;
  }

  public setExchange(exchange: string) {
    this.exchange = exchange;
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  public setTicker(ticker: string) {
    this.ticker = ticker;
  }

  public setStockData(
    exchange: string,
    ticker: string,
    stockData: Record<string, any>
  ) {
    if (!this.stockData[exchange]) {
      this.stockData[exchange] = {};
    }
    this.stockData[exchange][ticker] = stockData;
  }

  public getStocksByExchange(exchange: string) {
    return this.stockData[exchange];
  }

  public deleteStockByExchange(exchange: string, ticker: string) {
    if (this.stockData[exchange]) {
      delete this.stockData[exchange][ticker];
    }
  }

  public getProperty(propertyName: string): any {
    return this[propertyName];
  }

  public addToCache(key: string, value: any) {
    this.cache[key] = value;
  }

  public getFromCache(key: string): any {
    return this.cache[key];
  }

  public getState(): Record<string, any> {
    return {
      exchange: this.exchange,
      apiKey: this.apiKey,
      ticker: this.ticker,
      stockData: this.stockData,
    };
  }
}

export default ApplicationState;
