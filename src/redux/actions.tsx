export const SET_RIDER_DATA = "SET_RIDER_DATA";
export const SET_RIDER_TASKS = "SET_RIDER_TASKS";
export const SET_RIDER_PAYOUTS = "SET_RIDER_PAYOUTS";
export const SET_RIDER_MESSAGES = "SET_RIDER_MESSAGES";
export const SET_RIDER_NEW_MESSAGE = "SET_RIDER_NEW_MESSAGE";
export const SET_RIDER_NEW_TASK = "SET_RIDER_NEW_TASK";
export const RIDER_LAST_DELIVERY = "RIDER_LAST_DELIVERY";
export const SET_NEW_DEVICE = "SET_NEW_DEVICE";

const nameOfPage = "actions.tsx"


export const setRiderData = riderData => dispatch => {
    try{
    dispatch({
        type: SET_RIDER_DATA,
        payload: riderData,
    })
    } catch (error) {
    console.log(`try catch error in ${nameOfPage}: ${error}`)
  }

};

export const setRiderTasks = tasks => dispatch => {
    try{

        dispatch({
            type: SET_RIDER_TASKS,
            payload: tasks,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }
    
};

export const setRiderPayouts = payouts => dispatch => {
    try{

        dispatch({
            type: SET_RIDER_PAYOUTS,
            payload: payouts,
        })
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }

    
};

export const setRiderMessages = messages => dispatch => {
    try{

        dispatch({
            type: SET_RIDER_MESSAGES,
            payload: messages,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }

    
};

export const setRiderNewMessage = newMessage => dispatch => {
    try{

        dispatch({
            type: SET_RIDER_NEW_MESSAGE,
            payload: newMessage,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }
    
};

export const setRiderNewTask = newTask => dispatch => {
    try{

        dispatch({
            type: SET_RIDER_NEW_TASK,
            payload: newTask,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }
   
};


export const setRiderLastDelivery = lastDelivery => dispatch => {
    try{
        
        dispatch({
            type: RIDER_LAST_DELIVERY,
            payload: lastDelivery,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }
}


export const setNewDevice = newDevice => dispatch => {
    try{
        
        dispatch({
            type: SET_NEW_DEVICE,
            payload: newDevice,
        })
        
    } catch (error) {
      console.log(`try catch error in ${nameOfPage}: ${error}`)
    }
}

