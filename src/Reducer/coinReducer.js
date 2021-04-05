import { coinApi } from '../Api/api';
import {
    reducerUtils,
    handleAsyncActions,
    createPromisSaga
} from '../lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects';

// 코인 마켓 코드 조회 action type
const GET_MARKET_COINS = "coin/GET_MARKET_COINS";
const GET_MARKET_COINS_SUCCESS = "coin/GET_MARKET_COINS_SUCCESS";
const GET_MARKET_COINS_ERROR = "coin/GET_MARKET_COINS_ERROR";

const CONNECT_TICKER_SOCKET = "coin/CONNECT_TICKER_SOCKET";
const CONNECT_TICKER_SOCKET_SUCCESS = "coin/CONNECT_TICKER_SOCKET_SUCCESS";
const CONNECT_TICKER_SOCKET_ERROR = "coin/CONNECT_TICKER_SOCKET_ERROR";

export const getMarketCoins = () => ({ type: GET_MARKET_COINS });
export const connectTickerSocket = () => ({ type: CONNECT_TICKER_SOCKET });

const getMarketCoinsSaga = createPromisSaga(GET_MARKET_COINS, coinApi.getMarketCodes);

export function* coinSaga() {
    yield takeEvery(GET_MARKET_COINS, getMarketCoinsSaga);
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
            return handleAsyncActions(GET_MARKET_COINS, 'markets', true)(state, action);
        // case CONNECT_TICKER_SOCKET_SUCCESS:
        // case CONNECT_TICKER_SOCKET_ERROR:
        //     return 
        default:
            return state;
    }
}