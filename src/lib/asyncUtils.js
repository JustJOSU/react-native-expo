import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { call, delay, flush, put, select } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';
import { v4 as uuidv4 } from 'uuid';
import encoding from 'text-encoding';

export const createPromisSaga = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* saga(action = {}) {
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
                    { ticket: uuidv4() },
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

export const createConnectSocketSaga = (type, connectType) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* (action = {}) {
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
                                obj[data.code].timestamp > data.timestamp ? obj[data.code] : data;
                        } else {
                            obj[data.code] = data;
                        }
                    });

                    const sortedData = Object.keys(obj).map(
                        (data) => obj[data]
                    );
                    console.log(`sortedData length : ${sortedData.length}`)
                    yield put({ type: SUCCESS, payload: sortedData });
                }
                yield delay(500);
            } catch (e) {
                yield put({ type: ERROR, payload: e });
            }
        }
    };
};

// 웹 소켓 연결 Thunk
export const createConnectSocketThunk = (type, connectType) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (action = {}) => (dispatch, getState) => {
        const client = new W3CWebSocket("wss://api.upbit.com/websocket/v1");
        client.binaryType = "arraybuffer";
        client.onopen = () => {
            client.send(
                JSON.stringify([
                    { ticket: uuidv4() },
                    { type: connectType, codes: action.payload }
                ])
            );
        };
        client.onmessage = (response) => {
            const encode = new encoding.TextDecoder('utf-8');
            const textArray = new Uint8Array(response.data);
            const data = JSON.parse(encode.decode(textArray));
            const state = getState();
            dispatch({ type: SUCCESS, payload: data })
        }
        client.onerror = (error) => {
            dispatch({ type: ERROR, payload: error });
        }
    };
}
export const reducerUtils = {
    success: payload => ({
        data: payload,
        error: null
    }),
    error: error => ({
        data: null,
        error: error
    })
};

export const handleAsyncActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
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