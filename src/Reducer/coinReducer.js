import { coinApi } from '../Api/api';
import {
    createPromisThunk,
    reducerUtils,
    handleAsyncActions
} from '../lib/asyncUtils';

// 코인 마켓 코드 조회 action type
const GET_MARKET_COINS = "coin/GET_MARKET_COINS";
const GET_MARKET_COINS_SUCCESS = "coin/GET_MARKET_COINS_SUCCESS";
const GET_MARKET_COINS_ERROR = "coin/GET_MARKET_COINS_ERROR";

export const getMarketCoins = createPromisThunk(GET_MARKET_COINS, coinApi.getMarketCodes);

const initilaState = {
    coins: reducerUtils.initial()
};

export default function coinReducer(state = initilaState, action) {
    switch (action.type) {
        case GET_MARKET_COINS:
        case GET_MARKET_COINS_SUCCESS:
        case GET_MARKET_COINS_ERROR:
            return handleAsyncActions(GET_MARKET_COINS, 'coins')(state, action);
        default:
            return state;
    }
}