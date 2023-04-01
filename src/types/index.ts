export interface CommanderOptions {
  configFile?: string;
  exchange?: string;
  apiKey?: string;
  ticker?: string;
  view?: boolean;
  save?: boolean;
  list?: boolean;
  delete?: boolean;
}

export interface AlphaVantageApiResponse {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
  change: number;
  volume: number;
}

export interface RCFileContent {
  apiKey?: string;
  exchange?: string;
}
