import { DECREMENT, INCREMENT, EXCHANGE, EXCHANGE_ELEM_FOR_EXCHANGE } from './actions';
import { createStore } from 'redux';


function rootReducer(state = { value: 3, index: null, elemForExchange: null }, action) {
    switch (action.type) {
        case INCREMENT:
            if (state.value >= 6) return { ...state, value: state.value };
            return { ...state, value: state.value + 1 };
        case DECREMENT:
            if (state.value <= 2) return { ...state, value: state.value };
            return { ...state, value: state.value - 1 };
        
        case EXCHANGE:
            return { ...state, index: action.id };
        case EXCHANGE_ELEM_FOR_EXCHANGE:
            return { ...state, elemForExchange: action.id };

        default:
            return state
    }
}

export const store = createStore(rootReducer);
store.subscribe(() => console.log('subscribe store=', store.getState()))