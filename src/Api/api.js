import axios from 'axios';

export const coinApi = {
    getMarketCodes: async () => {
        const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=false");
        const data = response.data;
        const markets = {
            krw: [],
            btc: [],
            usdt: [],
        }
        for (let coin of data) {
            if (coin.market[0] === 'B') {
                markets.btc.push(coin);
            }
            if (coin.market[0] === 'K') {
                markets.krw.push(coin);
            }
            if (coin.market[0] === 'U') {
                markets.usdt.push(coin);
            }
        }
        return markets;
    }
}