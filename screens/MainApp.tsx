import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../navigation';
import { useDispatch, useSelector } from "react-redux";
// import { io } from 'socket.io-client';

import { acceptNewTask, addNewMessage, dropDelivery, fetch_new_task_request, pickDelivery } from '../src/functions';
import { setNewDevice, setRiderNewTask, setSocketMessageRef } from '../src/redux/actions';

// socket
import socketIOClient from "socket.io-client";
import moment from 'moment';
import { Store } from '../src/redux/store';
const ENDPOINT = "http://192.168.0.6:5000";
// LogBox.ignoreAllLogs()

export default function MainApp({colorScheme}) {



  const {messages, riderData, tasks, payouts, newTask, newDevice } = useSelector(state => state.riderReducer);




  //login updating
//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);  
    
//     if(newDevice && !newDevice.includes("Another") && newDevice.length > 10) {
//       socket.on("riderLogin", ({riderID, code}) => {
//         // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
//               // console.log("another device newRiderLogin ", code)
//               // console.log("currernt code: ", code)
//               // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
//               // console.log(riderData?.id);
              
//               if(riderData?.id === riderID) {
//                 console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
//               // console.log("code: ", code)
//               // console.log("new device code: ", newDevice);
//               // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
//                 if(!newDevice.includes(code)) {
//                   // Store.dispatch(setNewDevice("Another device has just connected to this account!"))
//                   // Store.dispatch(setNewDevice("Another device has just connected to this account!"));
//                 }        
//               }
//         });
//     }
    
// }, [riderData?.id, newDevice])







  useEffect(() => {
  //  console.log("newMessage from app.tsx", route.params?.riderMessages)
    const socket = socketIOClient(ENDPOINT);
    // socketMessageRef.current = io("http://192.168.0.6:5000");
    
    // console.log("test test messages", messages?.length)

    socket.on("message", ({textMessage, riderID, messageId, createdAt, sent}) => {
        // console.log("messages from MainApp for all users: ", messageId)
        if(riderID === riderData?.id) {
            // console.log("messages from MainApp: ", messages?.length)
            // console.log("newMessage from app.tsx", route.params?.riderMessages
                addNewMessage(textMessage, riderID, messageId, createdAt, messages, sent)
            
              
        }
      

    });

  },[riderData, messages])







      //#111 accpet new task updating
      // useEffect(() => {
      //   // console.log("socketref",socket)
      //  const socket = socketIOClient(ENDPOINT);  
  
      //  socket.on("acceptNewTask", ({task}) => {
      //       if(task.riderID === riderData?.id && tasks?.map((item) => item.id !== task.id)) {
      //       console.log("new task added: ", task)
      //       acceptNewTask(task, tasks)
            
      //       }
           
  
      //     });
  
      // },[tasks, riderData])
  
  











      //#222 skip new task updating
      useEffect(() => {
        
       const socket = socketIOClient(ENDPOINT); 
       socket.on("skipNewTask", ({task}) => {
            if(task.pendingRider === rider?.id) {
            console.log("new task skipped: ", task)
            // deliveries.push(task)
            setNewTask({})
            }
           
    
          });
  
      },[])
  
  










      //#333 drop task updating
      useEffect(() => {
        
        
       const socket = socketIOClient(ENDPOINT); 
       socket.on("dropDelivery", ({task}) => {
          console.log("task from dropDelivery io: ", task.id)
          // console.log(deliveries?.map(object => object.id))
          // console.log("first deilvery: ", deliveries[0]?.id)
          const dateOfToday = moment(new Date()).format('YYYY-MM-DD')
          // console.log("current delivery io: ", currentDelivery)
            if(tasks && !tasks.empty && tasks.filter(it => it.id === task.id)) {
                  dropDelivery(task, tasks, payouts, dateOfToday)
            } 
           
          });
  
      },[riderData, tasks, payouts])
  









      

      //#444 pick task updating
      useEffect(() => {
       const socket = socketIOClient(ENDPOINT); 
      //  console.log("task useEffect mainApp")
       socket.once("pickDelivery", ({task}) => {
        // console.log("task id pickDelivery mainApp: ", task?.riderID)
            if(task?.riderID === riderData?.id) {
              // console.log("task main app: ", task)
              pickDelivery(task,tasks)
              
            }
           
    
          });
  
      },[riderData, tasks])




      
      //#555 fetch new task
      useEffect(() => {
        if(riderData?.id) {
          fetch_new_task_request(riderData?.id)
        }
      }, [riderData?.id])




 
    return (
   

      
       <Navigation colorScheme={colorScheme}/> 


    );

  }
