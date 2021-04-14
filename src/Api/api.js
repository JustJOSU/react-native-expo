import axios from 'axios';

export const coinApi = {
    getMarketCodes: async () => {
        const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=false");
        const datas = response.data;
        const marketNames = {};
        datas.forEach(data => marketNames[data.market] = data.korean_name);

        return marketNames;
    }
}