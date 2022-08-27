import { 
    SET_RIDER_DATA, 
    SET_RIDER_TASKS,
    SET_RIDER_NEW_TASK,
    SET_RIDER_MESSAGES,
    SET_RIDER_NEW_MESSAGE,
    SET_RIDER_PAYOUTS,
    RIDER_LAST_DELIVERY,
    SET_NEW_DEVICE,
} from "./actions";

const nameOfPage = "reducers.tsx";


const initialState = {
    rider: null,
    tasks: null,
    newTask: null,
    messages: null,
    newMessage: null,
    payouts: null,
    lastDelivery: null,
    socketMessageRef: null,
    newDevice: null,
}

function riderReducer(state = initialState, action) {


        switch (action.type) {
            //#111
            case SET_RIDER_DATA: 
            return {...state, riderData: action.payload};

            //#222
            case SET_RIDER_TASKS: 
            return {...state, tasks: action.payload};

            //#333
            case SET_RIDER_PAYOUTS: 
            return {...state, payouts: action.payload};

            //#444
            case SET_RIDER_NEW_TASK: 
            return {...state, newTask: action.payload};

            //#555
            case SET_RIDER_MESSAGES: 
            return {...state, messages: action.payload};

            //#666
            case SET_RIDER_NEW_MESSAGE: 
            return {...state, newMessage: action.payload};

            //#771
            case SET_NEW_DEVICE:
            return {...state, newDevice: action.payload}

            //#881
            case RIDER_LAST_DELIVERY: 
            return {...state, lastDelivery: action.payload};

            //#999


            
            default: 
            return state;
        }

       
}

export default riderReducer;