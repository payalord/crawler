# Simple Crawler

This is a simple crawler server that can accept http request parameter as `/?origin=example.com` where `example.com` is the website domain you want to crawl. The purpose is to gather all the links on the website, internal and external (no follow by external links), along with the images available per each page. The output is JSON formatted list links/images.

## Installation

Installation steps:
1. Please install and use [nodejs](https://nodejs.org/en/) version 10 or higher to build and run this crawler.
2. Run `npm install` to install all required dependencies.

## Build and Run

1. To build solution run: `npm run build`
2. To run the crawl server run: `npm run start`

Server available under default port `3000`

## Tests

1. To run coverage test: `npm run test`
2. To run lint test: `npm run lint`

## License

MIT