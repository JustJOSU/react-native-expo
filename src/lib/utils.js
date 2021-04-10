const tickerListUtils = {
    update: (data, state) => {
        if (!state.coinReducer.tickerList.data) {
            return data;
        }
        const newState = {
            ...state.coinReducer.tickerList.data
        }
        const keys = Object.keys(data);

        keys.forEach(key => {
            newState[key] = data[key];
        })
        return newState;
    }
}

export {
    tickerListUtils
}