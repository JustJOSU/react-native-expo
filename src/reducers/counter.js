export const INCRESE = "COUNT/INCRESE";
export const DECRESE = "COUNT/DECRESE";

export const increseCount = () => ({ type: INCRESE });
export const decreseCount = () => ({ type: DECRESE });

const initialState = {
    count: 0,
    tick: 0,
}

const counter = (state = initialState, action) => {
    switch (action.type) {
        case INCRESE:
            return {
                ...state,
                count: state.count + 1
            }
        case DECRESE:
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
};

export default counter;