export const
INCREMENT = 'INCREMENT',
DECREMENT = 'DECREMENT',
EXCHANGE = 'EXCHANGE',
EXCHANGE_ELEM_FOR_EXCHANGE = 'EXCHANGE_ELEM_FOR_EXCHANGE';


export function increment(){
    return {type: INCREMENT};
}

export function decrement(){
    return {type: DECREMENT};
}

export function exchanged(id){
    return {type: EXCHANGE, id};
}

export function exchangedElem(id){
    return {type: EXCHANGE_ELEM_FOR_EXCHANGE, id};
}