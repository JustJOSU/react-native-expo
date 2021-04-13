import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { call, delay, flush, put, select } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';
import { v4 as uuidv4 } from 'uuid';
import encoding from 'text-encoding';
import { getMarketCoins, connectTickerSocket } from '../Reducer/coinReducer'

export const createPromisSaga = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* (action = {}) {
        yield put(getMarketCoins());
        try {
            const payload = yield call(promiseCreator, action.payload);
            yield put({ type: SUCCESS, payload });
        } catch (e) {
            yield put({ type: ERROR, error: true, payload: e });
        }
    };
}

// 웹 소켓 연결 Saga
const createSocket = () => {
    const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
    client.binaryType = "arraybuffer";
    console.log('socket created!!!');
    return client;
}

const connectSocket = (socket, connectType, action, buffer) => {

    return eventChannel((emit) => {
        socket.onopen = () => {
            socket.send(
                JSON.stringify([
                    { ticket: 'test' },
                    { type: connectType, codes: action.payload }
                ])
            );
        };
        socket.onmessage = (res) => {
            const encoder = new encoding.TextDecoder("utf-8");
            const data = JSON.parse(encoder.decode(res.data));
            emit(data);
        }
        socket.onerror = (error) => {
            emit(error);
            emit(END);
        };
        const unsubscribe = () => {
            socket.close();
        }
        return unsubscribe;
    }, buffer || buffer.none());
};

export const createConnectSocketSaga = (type, connectType, dataMaker) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* (action = {}) {
        yield put(connectTickerSocket());
        const client = yield call(createSocket);
        const clientChannel = yield call(
            connectSocket,
            client,
            connectType,
            action,
            buffers.expanding(500)
        );

        while (true) {
            try {
                const datas = yield flush(clientChannel);
                const state = yield select();
                if (datas.length) {
                    const obj = {};
                    datas.forEach((data) => {
                        if (obj[data.code]) {
                            obj[data.code] =
                                obj[data.code].timestamp > data.timestamp ? obj[data.code] : data.trade_price;
                        } else {
                            obj[data.code] = data.trade_price;
                        }
                    });
                    yield put({ type: SUCCESS, payload: dataMaker(obj, state) });
                }
                yield delay(500);
            } catch (e) {
                yield put({ type: ERROR, payload: e });
            }
        }
    };
};

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    error: error => ({
        loading: false,
        data: null,
        error: error
    })
};

export const handleAsyncActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading()
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    };
};