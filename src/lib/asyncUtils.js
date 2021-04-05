import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { call, put } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';
import { v4 as uuidv4 } from 'uuid';
import encoding from 'text-encoding';

export const createPromisSaga = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* saga(action) {
        try {
            const payload = yield call(promiseCreator, action.payload);
            yield put({ type: SUCCESS, payload });
        } catch (e) {
            yield put({ type: ERROR, error: true, payload: e });
        }
    };
}

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
            console.log(state);
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