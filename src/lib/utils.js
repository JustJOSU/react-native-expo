const tickerListUtils = {
    update: (data, state) => {
        if (!state.coinReducer.tickerList.data) {
            const initState = {
                krw: {},
                btc: {},
                usdt: {},
            }
            const keys = Object.keys(data);
            keys.forEach(key => {
                switch (key.split('-')[0]) {
                    case 'BTC':
                        initState.btc[key] = data[key];
                        break;
                    case 'KRW':
                        initState.krw[key] = data[key];
                        break;
                    case 'USDT':
                        initState.usdt[key] = data[key];
                        break;
                }
            })
            return initState;
        }
        const newState = {
            ...state.coinReducer.tickerList.data
        }
        const keys = Object.keys(data);

        keys.forEach(key => {
            switch (key.split('-')[0]) {
                case 'BTC':
                    newState.btc[key] = data[key];
                    break;
                case 'KRW':
                    newState.krw[key] = data[key];
                    break;
                case 'USDT':
                    newState.usdt[key] = data[key];
                    break;
            }
        })
        return newState;
    }
}

export {
    tickerListUtils
}