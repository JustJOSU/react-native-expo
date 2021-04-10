const tickerListUtils = {
    update: (data, state) => {
        if (!state) {
            return data;
        }

        const prevPrice = state.tickerList.data;
        return {
            ...prevPrice,

        }
    }
}