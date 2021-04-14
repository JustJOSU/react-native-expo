import { createConnectSocketSaga } from "./asyncUtils";

const tickerListUtils = {
    update: (data, state) => {
        const keys = Object.keys(data);

        if (!state.coinReducer.tickerList.data) {
            const initState = {
                KRW: {},
                BTC: {},
                USDT: {},
            }

            keys.forEach(key => {
                const curr_key = key.split('-')[0]

                switch (curr_key) {
                    case 'BTC':
                        initState.BTC[key] = {
                            trade_price: data[key]['trade_price'],
                            signed_change_rate: data[key]['signed_change_rate'],
                            acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                            change: data[key]['change'],
                            diff: ''
                        }

                        break;
                    case 'KRW':
                        initState.KRW[key] = {
                            trade_price: data[key]['trade_price'],
                            signed_change_rate: data[key]['signed_change_rate'],
                            acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                            change: data[key]['change'],
                            diff: ''
                        }
                        break;
                    case 'USDT':
                        initState.USDT[key] = {
                            trade_price: data[key]['trade_price'],
                            signed_change_rate: data[key]['signed_change_rate'],
                            acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                            change: data[key]['change'],
                            diff: ''
                        }
                        break;
                }
            })
            return initState;
        }
        const newState = {
            ...state.coinReducer.tickerList.data
        }

        keys.forEach(key => {
            const curr_key = key.split('-')[0];
            const diff = data[key]['trade_price'] === state.coinReducer.tickerList.data[curr_key][key]['trade_price'] ? '' : data[key]['trade_price'] > state.coinReducer.tickerList.data[curr_key][key]['trade_price'] ? 'blue' : 'red';

            switch (curr_key) {
                case 'BTC':
                    newState.BTC[key] = {
                        trade_price: data[key]['trade_price'],
                        signed_change_rate: data[key]['signed_change_rate'],
                        acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                        change: data[key]['change'],
                        diff: diff
                    }
                    break;
                case 'KRW':
                    newState.KRW[key] = {
                        trade_price: data[key]['trade_price'],
                        signed_change_rate: data[key]['signed_change_rate'],
                        acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                        change: data[key]['change'],
                        diff: diff
                    }
                    break;
                case 'USDT':
                    newState.USDT[key] = {
                        trade_price: data[key]['trade_price'],
                        signed_change_rate: data[key]['signed_change_rate'],
                        acc_trade_price_24h: data[key]['acc_trade_price_24h'],
                        change: data[key]['change'],
                        diff: diff
                    }
                    break;
            }
        })
        return newState;
    }
}

export {
    tickerListUtils
}