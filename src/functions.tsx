import { setRiderData, setRiderLastDelivery, setRiderMessages, setRiderNewTask, setRiderPayouts, setRiderTasks } from "./redux/actions"
import { useSelector, useDispatch } from "react-redux";
import { Store } from "./redux/store"
import { resolveUri } from "expo-asset/build/AssetSources";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.0.6:5000";





//#111 save rider tasks to redux
export async function fetch_deliveries_request (myId: Number | null, riderTasks: [] | null, riderLastDeliveryID: Number | null) {

    // const dispatch = Store.dispatch

    const function_name = "fetch_deliveries_request"
    // console.log(function_name)
    try{
      await fetch('http://192.168.0.6:5000/fetchDeliveries', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "riderID": myId,
           "riderTasks": riderTasks,
           "lastDelivery": riderLastDeliveryID
       })
  
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
        //   setDeliveries(responseJson.activeDeliveries ? responseJson.activeDeliveries : [])
        // console.log("responseJson:", responseJson.activeDeliveries)
        Store.dispatch(
            setRiderTasks(responseJson.activeDeliveries ? responseJson.activeDeliveries : [{"empty": "empty"}])
            );

            // console.log("lastDelivery", responseJson.lastDelivery)
        Store.dispatch(
            setRiderLastDelivery(responseJson.lastDelivery ? responseJson.lastDelivery : [{"empty": "empty"}])
            );
        //   setLastDelivery(responseJson.lastDelivery ? responseJson.lastDelivery : [])
          
          // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
      }
      // console.log(`here is the response: ${responseJson}`)
    })
  
  } catch(error){
      console.log(`error in ${function_name}: ${error}`)
  } 
  
  
}


//#222 save rider messages to redux
export async function fetch_messages_request (myId: Number){

    const function_name = "fetch_messages_request"
    console.log(function_name)
    try{
      await fetch('http://192.168.0.6:5000/fetchMessages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "riderID": myId,
       })
  
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
          Store.dispatch(
              setRiderMessages(responseJson ? responseJson : [{"empty": "empty"}])
              );
          // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
      }
      // console.log(`here is the response: ${responseJson}`)
    })
  
  } catch(error){
      console.log(`error in ${function_name}: ${error}`)
  } 
  
  
  }


//#333 save rider payouts to redux
export async function fetch_payouts_request (myId: Number){

    const function_name = "fetch_payouts_request"
    console.log(function_name);
    try{
      await fetch('http://192.168.0.6:5000/fetchPayouts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "riderID": myId,
        //    "date": date
       })
  
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          console.log(`payouts from functions: ${JSON.stringify(responseJson[0])}`)
          
          Store.dispatch(setRiderPayouts(responseJson ? responseJson : [{"empty": "empty"}]))
        //   setPayouts(responseJson)
          // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
      }
      // console.log(`here is the response: ${responseJson}`)
    })
  
  } catch(error){
      console.log(`error in ${function_name}: ${error}`)
  } 
  
  
}




//#444 save new message to redux
export async function addNewMessage(textMessage, riderID, messageId, createdAt, messages: [] | null, sent){

    const function_name = "addNewMessage";
    // console.log("messages from function: ", messages)
    // console.log("textMessage from fucntion: ",textMessage)
      // const {messages, rider} = Store.useSelector(state => state.riderReducer);

      
        try{
          
          // if(riderID === rider?.id) {
            if(messages){
              // console.log("if messages: ", messages?.length)
              const newMessageObject = {
                    _id: messageId,
                    text: textMessage,
                    createdAt: new Date(createdAt),
                    // pending: true,
                    sent: sent,
                    longPressed : false,
                    // received: true,
                    user: {
                      _id: riderID,
                      name: "",
                      // avatar: 'https://placeimg.com/140/140/any',
                      },
                }
              const currentMessages : [] = messages
              currentMessages.unshift(newMessageObject)
              Store.dispatch(
                    setRiderMessages(currentMessages) //setRiderMessages parnthes
                 )
            }
            // else {
            //   const newMessageObject = {_id: messageId,
            //     text: textMessage,
            //     createdAt: new Date(createdAt),
            //     // pending: true,
            //     sent: false,
            //     // received: true,
            //     user: {
            //       _id: riderID,
            //       name: "",
            //        // avatar: 'https://placeimg.com/140/140/any',
            //         },
            //     }
            //   console.log("else messages: ", messages)
            //   Store.dispatch(
            //       setRiderMessages([newMessageObject])

            //   )
    
            // }
          
// }

        } catch(error){
          console.log(`error in ${function_name}: ${error}`)
      } 
      

} //function end






//#555 save new task to redux
export async function addNewTask(task, tasks, riderID) {
  const function_name = "acceptNewTask"
  console.log(function_name)
try {
  // console.log("Checking data: ", tasks)
  const data = tasks
  if(data && data.length > 0 && data[0].empty) {
    data.splice(data.findIndex(object => object.empty === "empty"), 1)
    
  }
  console.log("data: ", data)
  task.pendingRider = null
  task.riderID = riderID
  data.push(task);
  Store.dispatch(setRiderTasks(data))
  Store.dispatch(setRiderNewTask(null))
  // console.log("tasks", tasks);
  
} catch(error){
  console.log(`error in ${function_name}: ${error}`)
} 
}


export function acceptNewTask(task, tasks, riderID,) {
  const ENDPOINT = "http://192.168.0.6:5000";
  const socket = socketIOClient(ENDPOINT);  
  const taskID = task?.id
  socket.emit("acceptNewTask", {riderID, taskID, task});
  addNewTask(task, tasks, riderID)
 }

 export function skipNewTask(task, tasks, riderID) {
   //TODO emit the cahnges to backend
  Store.dispatch(setRiderNewTask(null))
 }







//#666 update delivery to redux
export function pickDelivery(task, tasks) {
  const function_name = "pickDelivery"
  console.log(function_name)
try {
 // var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // console.log("task has been picked up: ", task)
            let data = tasks
            if(tasks ) {
              console.log("deliveries ids before",data?.map(it => it.id))
              var foundIndex = data?.findIndex(it => it.id == task.id);
              data[foundIndex] = task;
              // console.log("deliveries ids",data?.map(it => it.id))
              // setDeliveries(deliveries.map(it => it.id !== task.id ? it : task))
              Store.dispatch(setRiderTasks(data))
              // setActive(active === "second" ? "first" : active === "first" ? "second" : "third")
              // console.log("deliveries: ", deliveries, "active is: ", active)
            }
           
} catch(error){
  console.log(`error in ${function_name}: ${error}`)
} 
}








//#777 remove delivery from redux
export function dropDelivery(task, tasks, payouts, dateOfToday) {
  const function_name = "dropDelivery"
  console.log(function_name)
try {
  // console.log("Dropped the following delivery: ", task)
  // setDeliveries(deliveries.filter(it => it.id !== task.id))
  const data = tasks
  data.splice(data.findIndex(item => item.id === task.id) , 1)
  if(!data) {
    Store.dispatch(setRiderTasks([{"empty": "empty"}]))
  } else {
    Store.dispatch(setRiderTasks(data))
  }


  const payoutObject = {
    "date": dateOfToday,
  }


  // payoutsData[payoutIndex].orders.push(task.id);

  // console.log("payoutsData[payoutIndex]", typeof payoutsData[payoutIndex].paymentPerDate)


  //TODO 
  // const payoutsData = payouts
  // const payoutIndex = payoutsData?.findIndex((object => object.status == "unpaid"))

  // payoutObject.payment = task?.riderBasePayout + task?.riderDistancePayment

  // payoutsData[payoutIndex].payment = payoutsData[payoutIndex].payment + task?.riderBasePayout + task?.riderDistancePayment


  Store.dispatch(setRiderPayouts(null));
  // Store.dispatch(setRiderPayouts())
  Store.dispatch(setRiderLastDelivery(task))

} catch(error){
  console.log(`error in ${function_name}: ${error}`)
} 
}








//#888 change rider status to the backend
export async function online_status_request (
  locationNow: Object | null, workingStatus: Number | null, onlineStatus: String, email : String, password : String
  ) {

    

        
  const function_name = "online_status_request"
  console.log(function_name)
  try{
      await fetch('http://192.168.0.6:5000/onlineStatus', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "locationNow": locationNow,
           "workingStatus" : workingStatus,
           "onlineStatus" : onlineStatus,
           "email": email,
           "password": password
       })

    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
        Store.dispatch(setRiderData(responseJson[0]));
      }
      // console.log(`here is the response: ${responseJson}`)
    })

  } catch(error){
      console.log(`error in ${function_name}: ${error}`)
  } 
  

}












//#888 fetch new task from backend and assing it to redux
export async function fetch_new_task_request (myId: Number) {

    
        
  // console.log("here we got")
  const function_name = "fetch_new_Task_request"
  try{
      await fetch('http://192.168.0.6:5000/fetchNewTask', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "riderID": myId,
       })

    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
          // setNewTask(responseJson[0])
          Store.dispatch(setRiderNewTask(responseJson[0]))
      }
      // console.log(`here is the response: ${responseJson}`)
    })

  } catch(error){
      console.log(`error in ${function_name}, ${error}`)
  } 
  

}









