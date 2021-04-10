import { coinApi } from '../Api/api';
import {
    reducerUtils,
    handleAsyncActions,
    createPromisSaga,
    createConnectSocketSaga
} from '../lib/asyncUtils';
import { put, select, takeEvery } from 'redux-saga/effects';
import { tickerListUtils } from '../lib/utils';

// 코인 마켓 코드 조회 action type
const GET_MARKET_COINS = "coin/GET_MARKET_COINS";
const GET_MARKET_COINS_SUCCESS = "coin/GET_MARKET_COINS_SUCCESS";
const GET_MARKET_COINS_ERROR = "coin/GET_MARKET_COINS_ERROR";

const CONNECT_TICKER_SOCKET = "coin/CONNECT_TICKER_SOCKET";
const CONNECT_TICKER_SOCKET_SUCCESS = "coin/CONNECT_TICKER_SOCKET_SUCCESS";
const CONNECT_TICKER_SOCKET_ERROR = "coin/CONNECT_TICKER_SOCKET_ERROR";

const START_INIT = "coin/START_INIT";

export const getMarketCoins = () => ({ type: GET_MARKET_COINS });
export const connectTickerSocket = () => ({ type: CONNECT_TICKER_SOCKET });
export const startInit = () => ({ type: START_INIT });

const getMarketCoinsSaga = createPromisSaga(GET_MARKET_COINS, coinApi.getMarketCodes);
const connectTickerSocketSaga = createConnectSocketSaga(CONNECT_TICKER_SOCKET, "ticker", tickerListUtils.update);

function* startInitSaga() {
    yield getMarketCoinsSaga();
    const state = yield select();
    const marketNames = Object.keys(state.coinReducer.markets.data.krw);

    yield connectTickerSocketSaga({ payload: marketNames });
}
export function* coinSaga() {
    yield takeEvery(GET_MARKET_COINS, getMarketCoinsSaga);
    yield takeEvery(START_INIT, startInitSaga);
}

const initilaState = {
    markets: {
        error: null,
        data: null
    },
    tickerList: {
        error: null,
        data: null
    }
};

export default function coinReducer(state = initilaState, action) {
    switch (action.type) {
        case GET_MARKET_COINS_SUCCESS:
        case GET_MARKET_COINS_ERROR:
            return handleAsyncActions(GET_MARKET_COINS, 'markets')(state, action);
        case CONNECT_TICKER_SOCKET_SUCCESS:
        case CONNECT_TICKER_SOCKET_ERROR:
            return handleAsyncActions(CONNECT_TICKER_SOCKET, 'tickerList')(state, action);
        default:
            return state;
    }
}