import axios from 'axios';

export const coinApi = {
    getMarketCodes: async () => {
        const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=false");
        const datas = response.data;
        const markets = {
            krw: {},
            btc: {},
            usdt: {},
        }

        for (let coin of datas) {
            if (coin.market[0] === 'B') {
                markets.btc[coin.market] = coin.korean_name;
            }
            if (coin.market[0] === 'K') {
                markets.krw[coin.market] = coin.korean_name;
            }
            if (coin.market[0] === 'U') {
                markets.usdt[coin.market] = coin.korean_name;
            }
        }

        return markets;
    }
}