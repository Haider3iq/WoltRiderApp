import React, { useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import TabTwoScreen from './screens/Home';
import DrawerContainer from "./screens/DrawerContainer/DrawerContainer"

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider} from "react-redux";
import { useDispatch } from "react-redux";
import { Store } from "./src/redux/store"
import { setRiderMessages } from './src/redux/actions';
import { io } from 'socket.io-client';
import { addNewMessage } from './src/functions';
import MainApp from './screens/MainApp';

LogBox.ignoreAllLogs()

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // // const dispatch = null
  // const useSelector = null



  //   //#111111 redux updating
  // const socketMessageRef = useRef();

  // useEffect(() => {
  // //  console.log("newMessage from app.tsx", route.params?.riderMessages)
  //   socketMessageRef.current = io("http://192.168.0.6:5000");
    
  //   console.log("notification: new message received")
  //   socketMessageRef.current.on("message", ({textMessage, riderID, messageId, createdAt}) => {
  //     // console.log("newMessage from app.tsx", route.params?.riderMessages)
  //       addNewMessage(textMessage, riderID, messageId, createdAt)

  //   });

  // },[socketMessageRef])



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={Store}>
      <ActionSheetProvider>
      <SafeAreaProvider>
        
        {/* <Navigation colorScheme={colorScheme}/> */}
        <MainApp colorScheme={colorScheme}/>
        <StatusBar />
      </SafeAreaProvider>
      </ActionSheetProvider>
      </Provider>
    );
  }
}
