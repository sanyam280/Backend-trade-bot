import Binance from "node-binance-api";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
});

// Trading pair
const SYMBOL = "BTCUSDT";

console.log(chalk.blue(`📡 Streaming LTP for ${SYMBOL}...`));

// WebSocket Mini Ticker — gives last price updates
binance.websockets.miniTicker(markets => {
  if (markets[SYMBOL]) {
    const lastPrice = markets[SYMBOL].close; // last traded price
    console.log(`${new Date().toLocaleTimeString()} | LTP: ${chalk.yellow(lastPrice)}`);
  }
});