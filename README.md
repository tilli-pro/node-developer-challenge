# Tilli Node.js Developer Challenge

Thank you for your interest in Tilli! The following coding challenge should take no longer than 2-3 hours. Please feel free to reach out for any clarification on the requirements presented below.

## Getting started

Fork this repository and use your fork to build the challenge. When you've finished and all of your work is pushed, let us know so that we can review (you can also submit a PR back to this repo to notify).

## Terminology

| Term               | Description               | AKA | Example |
| :----------------- | :------------------------ | --- | ------- |
| Stock symbol       | A unique series of letters assigned to a stock for trading purposes (e.g. AAPL for Apple Inc.) | Stock ticker, Ticker symbol | AAPL (Apple Inc.) |
| Exchange           | A market where financial securities such as stocks, bonds, and commodities are traded. | Stock exchange | NASDAQ, NYSE, NSE |

## The challenge

Your task is to create an interactive Node.js CLI application that will show summary statistics for requested stock ticker symbols using the [Alpha Vantage](https://www.alphavantage.co/documentation/) API. The interactive CLI app will require managing and persisting state, processing input arguments, and showing interactive prompts and follow up prompts depending on the inputs. The application should be able to handle the below requirements for any amount of stock symbols on any exchange supported via the Alpha Vantage API.

### Features

The output below is a stubbed version of the helper text (`-h` or `--help` flag, though the actual output below is more representative of a `man` page) for the application. Flags in the `OPTIONS` section correspond with features. The interactive CLI app should be able to parse incoming arguments and generate interactive prompts to fill in missing information. Some sections are deliberately left incomplete (they will be marked via `[STUBBED]`); in your final submission should also include updated documentation. Any implementation details that have not been included have been deliberately left out for you to create your own solution.

All of the functionality of the application can be inferred from the

```bash
NAME
  tt - tilli ticker

SYNOPSIS
  tt [-x exchange] [] ticker

DESCRIPTION
  tt  a CLI app that allows you to continuously track stocks using the AlphaVantage API. An AlphaVantage API key is needed to use this utility.

OPTIONS
  -h

FILES
  [STUBBED]

DIAGNOSTICS
  The following diagnostics may be issued on stderr:

  Rate limit exceeded.
    The API key used in the configuration has gone past the rate limit set by AlphaVantage's API. Please either wait for a new rate period or upgrade your API key.
  [STUBBED]

```

## Evaluation Criteria

-

## Some additional notes