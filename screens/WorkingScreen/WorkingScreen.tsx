import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {View, Text, Dimensions, Modal, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import customStyles from "../../AppTheme/customStyles";
import Empty from "../../navigation/Empty message/Empty";
import Home from "../Home";
import DrivingABikeLotte from "../../assets/lottie/DrivingABikeLottie.json"
import CustomerHouse from "../assets/images/newTask.png";
import fridge from "../../assets/images/fridge.png";
import siteMapPhoto from "../assets/images/sitemap.png";

import { useActionSheet } from '@expo/react-native-action-sheet';


import LottieView from 'lottie-react-native';
import GoOfflineButton from "../DrawerContainer/Components/GoOfflineButton";
import { Rider } from "../../src/Types/Modals";
import { useNavigation, useRoute } from "@react-navigation/native";
import SliderButton from "../../components/SliderButton";
import OnlineStatusButton from "../../components/OnlineStatusButton";
import DeliveryDetails from "../../components/DeliveryDetails";
import { StatusBar } from "expo-status-bar";
import moment, { now } from "moment";
import RiderTask from "../../components/RiderTask";

import { useSelector } from "react-redux";
import { acceptNewTask, addNewTask, fetch_deliveries_request, online_status_request, skipNewTask } from "../../src/functions";


import { Store } from "../../src/redux/store";
import { setNewDevice, setRiderData, setRiderNewTask } from "../../src/redux/actions";
import NewTaskScreen from "../../components/ScreenComponents/NewTaskScreen";
import styles  from "./WorkingScreenStyles"
import FoodItemsScreen from "../../components/ScreenComponents/FoodItemsScreen";


//socket.io
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.0.6:5000";




// import FoodPreparingTime from "./Components/FoodPreparingTime";


export default function WorkingScreen () {

const {riderData, tasks, newDevice} = useSelector(state => state.riderReducer)
const riderLastDelivery = useSelector(state=> state.riderReducer.lastDelivery)
const riderNewTask = useSelector(state=> state.riderReducer.newTask)

    let DATA = {
        "customerName": "Jesse Said",
        "customerAddress": "Palosaarentie 62",
        "customerNote": "Please deliver the food to the door without contact or calling me... thanks a lot.",
        "customerPhoneNumber": "358467891",
        "orderCode": "387",
        "vendorName": "Macdonald's",
        "vendorNote": "Our location is located right inside The Rwell Center building... go to the second floor where you see Macdonald's",
        "vendorAddress": "pitkälahdenkatu 31",
    } 
    let itemsData = [
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
      {"itemTitle": "Double cheese burger", "itemImage": fridge},
  ]


    const navigation = useNavigation();
    const route = useRoute();

const [data, setData] = useState(DATA)    
const [show, setShow] = useState(false)
const [modal, setModal] = useState(false);
const [rider, setRider] = useState<Rider | null>(riderData)
const [riderMessages, setRiderMessages] = useState([])
const [deliveries, setDeliveries] = useState<[] | null>(tasks ? tasks : []);
const [active, setActive] = useState("first")
const [ready, setReady] = useState("prepare")
const [timeRemainig, setTimeRemaining] = useState("0")
const [currentDelivery, setCurrentDelivery] = useState({});
const [showItems, setShowItems] = useState(false);
const [timer, setTimer] = useState(0)
// const [ newTask, setNewTask] = useState(riderNewTask ? riderNewTask : {});
const [newTaskReadyAt, setNewTaskReadyAt] = useState("");
const [lastDelivery, setLastDelivery] = useState(riderLastDelivery ? riderLastDelivery : {})





const createdAt = new Date(2022, 6, 12, 15, 0, 0, 0);
const mustBeReadyAt = new Date();


const preparationTimeRemaining = createdAt.getTime() - mustBeReadyAt.getTime();
const timeInString = preparationTimeRemaining.toString()


const deviceCode = route.params?.deviceCode;



// useEffect(() => {

//   // console.log("new device is: ", newDevice)
//   if(newDevice === "Another device has just connected to this account!") {
//     console.log("another device connected", newDevice)
//     Store.dispatch(setNewDevice(null))
//     Store.dispatch(setRiderNewTask(null));
    
//     navigation.navigate("Login", {"anotherDevice": "Another device has just connected to this account!"})
//   }
// }, [newDevice])



  //login updating
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);  
    
    // if(newDevice && !newDevice.includes("Another") && newDevice.length > 10) {
      socket.on("riderLogin", ({riderID, code}) => {
        // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
              // console.log("another device newRiderLogin ", code)
              // console.log("currernt code: ", code)
              // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
              // console.log(riderData?.id);
              
              if(riderData?.id === riderID) {
                console.log("current device code and new device code match: ", newDevice.includes(code) ? "true" : "false")
              // console.log("code: ", code)
              // console.log("new device code: ", newDevice);
              // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
                if(!newDevice.includes(code)) {
                  // Store.dispatch(setNewDevice("Another device has just connected to this account!"))
                  Store.dispatch(setRiderNewTask(null));
                  Store.dispatch(setRiderData(null))
                  navigation.navigate("Login", {"anotherDevice": "Another device has just connected to this account!"})
                }        
              }
        });
    // }
    
}, [riderData?.id, newDevice])



useEffect(() => {
  setRider(riderData)
}, [riderData])



useEffect(() => {
  if(!tasks) {
    fetch_deliveries_request(rider?.id, rider?.activeTasks, rider?.lastDelivery);
  }
},[])



useEffect(() => {
  if(!!rider?.id){
    // console.log("rider ID", rider?.id)
    // fetch_new_task_request(rider?.id)
  }
  
},[rider?.id])


//Time

const LottieRef = React.useRef(null);

useEffect(() => {
  // console.log("riderLastDelivery",riderLastDelivery)
  setLastDelivery(riderLastDelivery ? riderLastDelivery : [])
},[riderLastDelivery])

useEffect(() => {
  // console.log(`tasks: ${tasks && tasks[0]}`)
  if(rider?.onlineStatus === "online" && tasks && tasks[0]?.empty) {
    // console.log("play")
    LottieRef?.current?.play()
  } else {
    // console.log("ref: ", LottieRef.current)
    LottieRef?.current?.reset();
  }
  
},[rider?.onlineStatus, tasks])


// useEffect(() => {
//   // console.log("riderNewTask?. id", riderNewTask ? riderNewTask : null)
//   setNewTask(riderNewTask ? riderNewTask : null)
// },[riderNewTask])



useEffect(() => {
  if(tasks) {
    // console.log("tasks is not null", tasks)
    setDeliveries(tasks)
    
  }
  
  // console.log("newt task from main app", riderNewTask)
},[tasks])




















const onCustomerLocationPress = () => {
  console.log("customer lat and long: ", currentDelivery?.customerLatLong)
  const Lati = JSON.parse(currentDelivery?.customerLatLong);
  console.log("Address: ", currentDelivery?.customerAddress,
  "latitude: ", Lati.latitude,
  "longitude: ", Lati.longitude,
  "customer name: ", currentDelivery?.customerName,
  "riderName: ", `${rider?.firstName} ${rider?.lastName}`,
  "data: ", rider
  
  );

  navigation.navigate("Home", {
  "Address": currentDelivery?.customerAddress,
  "latitude": Lati.latitude,
  "longitude": Lati.longitude,
  "customerName": currentDelivery?.customerName,
  "iconName": "ios-person-circle-outline",
  "riderName": `${rider?.firstName} ${rider?.lastName}`,
  "data": rider
})
}

const onVendorLocationPress = () => {
  const Lati = JSON.parse(currentDelivery?.vendorLatLong);
  console.log("Address: ", currentDelivery?.vendorAddress,
  "latitude: ", Lati.latitude,
  "longitude: ", Lati.longitude,
  "vendor name: ", currentDelivery?.vendorName);

  navigation.navigate("Home", {
  "Address": currentDelivery?.vendorAddress,
  "latitude": Lati.latitude,
  "longitude": Lati.longitude,
  "vendorName": currentDelivery?.vendorName,
  "iconName": "ios-restaurant",
  "riderName": `${rider?.firstName} ${rider?.lastName}`,
  "data": rider
})
}



   




// useEffect(() => {
//  setRider(route.params?.data)
// },[rider?.onlineStatus])

// useEffect(() => {
//   if(rider?.onlineStatus === "online"){
//     fetch_deliveries_request(rider?.id)
//   }
// },[rider?.onlineStatus])

const onlineStatusPress = () => {
  if(rider?.onlineStatus === "online") {
    online_status_request(null, null, "offline", rider?.email, rider?.password)
  } else {
    online_status_request(null, null, "online",  rider?.email, rider?.password)
  }
}

const timeRemainigFunction = () => {
  // if(deliveries[0]?.id && !!currentDelivery) {
   
  //   //actul dates
  //   var nowDate = new Date()
  //   var shouldBeDeliveredDate = new Date(currentDelivery?.shouldBeDeliveredAt);
  //   const shouldBeReadyDate = new Date(currentDelivery?.mustBePreparedAt);
    
  //   //time converitng to minutes
  //   const nowTime = nowDate.getTime() / (1000 * 60)
  //   const shouldBeDelivereTime = shouldBeDeliveredDate.getTime() / (1000 * 60)
  //   const shouldBeReady = shouldBeReadyDate.getTime() / (1000 * 60);
    
  //   //time remaining
  //   const preparationTimeRemaining = shouldBeReady - nowTime;
  //   const deliveryTimeRemaining = shouldBeDelivereTime - nowTime;
    
    
    
    
  //   console.log("prepartoin: ", preparationTimeRemaining.toFixed())
  //   console.log("delivery time remining: ", deliveryTimeRemaining.toFixed())
  //   //for first mounting
  //   if(!currentDelivery.preparedAt && !currentDelivery.pickedUpAt) {
  //     setTimeRemaining(`Ready in  ${preparationTimeRemaining.toFixed()}`)
  //   } else {
  //     setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
  //   }
    
  //   //continuous
  // const interval = setInterval(() => {
  //  if(!currentDelivery.preparedAt && !currentDelivery.pickedUpAt) {
  //    console.log("deliveryID: ",currentDelivery?.id)
  //    setTimeRemaining(`Ready in  ${preparationTimeRemaining.toFixed()}`)
  //  } else if(!!currentDelivery.pickedUpAt){
  //   setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
  //  } else {
  //    setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
  //  }
  // }, 60000);
  // return () => clearInterval(interval);
  // }
}


  useEffect(() => {

    if(deliveries[0]?.id) {
        if(active === "first") {
          // console.log("hello here", deliveries[0])
            setCurrentDelivery(deliveries[0])
          // console.log("data", currentDelivery)
        } else if (active === "second") {
            setCurrentDelivery(deliveries[1])
        } else if (active === "third") {
            setCurrentDelivery(deliveries[2])
        }
    }
    else {
      setCurrentDelivery(data);
    }
   

  },[active, deliveries[0], deliveries[1], deliveries[2], deliveries[3], deliveries[4]])

  useEffect(() => {
    if(deliveries[0]?.id && !!currentDelivery) {
   
      //actul dates
      var nowDate = new Date()
      var shouldBeDeliveredDate = new Date(currentDelivery?.shouldBeDeliveredAt);
      const shouldBeReadyDate = new Date(currentDelivery?.mustBePreparedAt);
      
      //time converitng to minutes
      const nowTime = nowDate.getTime() / (1000 * 60)
      const shouldBeDelivereTime = shouldBeDeliveredDate.getTime() / (1000 * 60)
      const shouldBeReady = shouldBeReadyDate.getTime() / (1000 * 60);
      
      //time remaining
      const preparationTimeRemaining = shouldBeReady - nowTime;
      const deliveryTimeRemaining = shouldBeDelivereTime - nowTime;
      
      
      
      
      // console.log("prepartoin: ", preparationTimeRemaining.toFixed())
      // console.log("delivery time remining: ", deliveryTimeRemaining.toFixed())
      //for first mounting
      if(!currentDelivery.preparedAt && !currentDelivery?.pickedUpAt) {
        setTimeRemaining(`Ready in  ${preparationTimeRemaining.toFixed()}`)
      } else {
        setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
      }
      
      //continuous
    const interval = setInterval(() => {
     if(!currentDelivery?.preparedAt && !currentDelivery?.pickedUpAt) {
       console.log("deliveryID: ",currentDelivery?.id)
       setTimeRemaining(`Ready in  ${preparationTimeRemaining.toFixed()}`)
     } else if(!!currentDelivery?.pickedUpAt){
      setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
     } else {
       setTimeRemaining(`Deliver in ${deliveryTimeRemaining.toFixed()}`)
     }
    }, 60000);
    return () => clearInterval(interval);
    }
  },[active, deliveries[0], deliveries[1], deliveries[2], deliveries[3], deliveries[4], currentDelivery?.id, currentDelivery?.preparedAt, currentDelivery?.pickedUpAt])













  const dropDelivery = () => {
    const task = currentDelivery;
    const riderID = rider?.id;
    const taskID = currentDelivery?.id
    const dateOfToday = moment(new Date()).format('YYYY-MM-DD')
    const payoutAmount = currentDelivery?.riderBasePayout + currentDelivery?.riderDistancePayment
    
    const socket = socketIOClient(ENDPOINT);  
    socket.emit("dropDelivery", {riderID, taskID, dateOfToday, payoutAmount, task});
  }
  
  
  
  const pickDelivery = () => {
    console.log("picking delivery now")
    const task = currentDelivery;
    const riderID = rider?.id;
    const taskID = currentDelivery?.id
    
    const socket = socketIOClient(ENDPOINT);  
    socket.emit("pickDelivery", {riderID, taskID, task});
  }
  


  const {showActionSheetWithOptions} = useActionSheet();

  const onPickDeliveryPress = (index) => {
      if(index === 0) {
        pickDelivery();
      } else if(index ===2) {
          null
      } 
      // else {
      //     // pickImage()
      // }
  };

  const onDropDeliveryPress = (index) => {
    if(index === 0) {
        dropDelivery();
    } else if(index ===2) {
        null
    } 
    // else {
    //     // pickImage()
    // }
};

  const openMessageMenu = (pickDelivery, dropDelivery) => {

    
      
      const options = [pickDelivery ? "Pick delivery" : "Drop delivery"];
      
      // options.push("Chose from library");

      options.push("Cancel")
      const destructiveButtonIndex = 0;
      const cancelButtonIndex = 2;
      const title = `Are you sure you want to ${pickDelivery ? "pick delivery" : "drop delivery"}?`
      
      showActionSheetWithOptions(
      {
          title,
          options,
          destructiveButtonIndex,
      }, 
      pickDelivery ? onPickDeliveryPress : onDropDeliveryPress,
      );
  } 




return (
  <>


      {/* //items modal */}
        <Modal
              statusBarTranslucent
              // style={{backgroundColor: "red", paddingBottom: 300}}
              animationType="slide"
                transparent={false}
                visible={showItems} 
                
                // onRequestClose={() => setModal(it => !it)}
                
              >

                <FoodItemsScreen onPress={() => {setShowItems(it => !it)}} itemsData={itemsData} />
       
        <StatusBar style={"light"}  backgroundColor={customStyles.primaryColor} />
      </Modal>



      {/* //new task modal */}
      <Modal
      statusBarTranslucent
      // style={{backgroundColor: "red"}}
      animationType="fade"
        transparent={false}
        visible={riderNewTask?.id ? true : false} 
        
        // onRequestClose={() => setModal(it => !it)}
      >
        <NewTaskScreen riderNewTask={riderNewTask} acceptNewTask={() => acceptNewTask(riderNewTask, tasks, riderData?.id)} skipNewTask={() => skipNewTask(riderNewTask, tasks, riderData?.id)} />
        
        <StatusBar style={"light"}  backgroundColor={customStyles.primaryColor} />
      </Modal>

    <View
          style={
            styles.modalView
          }
          >
             <Text
            style={styles.deliveriesTitle}
            >
              {deliveries[0]?.id ? `Deliveries details` : `No Deliveries yet`}
            </Text>
            

            {/* <View
            style={{backgroundColor: "red"}}
            > */}

            
           {deliveries[0]?.id && <View
            style={{
              backgroundColor: customStyles.primaryBackgroundColor,
              padding: "2%",
              borderRadius: 10,
              marginBottom: "-1.5%",
              alignSelf: "center",
              marginHorizontal: "5%",
            }}
            >
              <Text
              style={{color: customStyles.secondPrimaryColor}}
              >
                {`${timeRemainig} min`}
              </Text>
            </View>}

            {/* </View> */}





            {deliveries[0]?.id && <View
          style={styles.readyTextMainView}
          >
            {<View
            style={[styles.readyTextView, !deliveries[0]?.preparedAt && !deliveries[0]?.pickedUpAt &&  {backgroundColor: customStyles.negativeColor}, deliveries[0]?.preparedAt && !deliveries[0]?.pickedUpAt && {backgroundColor: customStyles.successColor}, deliveries[0]?.pickedUpAt && {backgroundColor: customStyles.speacialColor} ]}
            >
              <Text
              style={[styles.readyText, {color: customStyles.white}]}
              >
               {!deliveries[0]?.pickedUpAt ? `${!deliveries[0]?.preparedAt ? "Prepare" : "Ready"}` : "Picked"} 
              </Text>
            </View>}


            {deliveries[1]?.id && <View
            style={[styles.readyTextView, !deliveries[1]?.preparedAt && !deliveries[1]?.pickedUpAt &&  {backgroundColor: customStyles.negativeColor}, deliveries[1]?.preparedAt && !deliveries[1]?.pickedUpAt && {backgroundColor: customStyles.successColor}, deliveries[1]?.pickedUpAt && {backgroundColor: customStyles.speacialColor} ]}
            >
              <Text
              style={[styles.readyText, {color: customStyles.white}]}
              >
               {!deliveries[1]?.pickedUpAt ? `${!deliveries[1]?.preparedAt ? "Prepare" : "Ready"}` : "Picked"} 
              </Text>
            </View>}

            {deliveries[2]?.id && <View
            style={[styles.readyTextView, !deliveries[2]?.preparedAt && !deliveries[2]?.pickedUpAt &&  {backgroundColor: customStyles.negativeColor}, deliveries[2]?.preparedAt && !deliveries[2]?.pickedUpAt && {backgroundColor: customStyles.successColor}, deliveries[2]?.pickedUpAt && {backgroundColor: customStyles.speacialColor} ]}
            >
              <Text
              style={[styles.readyText, {color: customStyles.white}]}
              >
                {!deliveries[2]?.pickedUpAt ? `${!deliveries[2]?.preparedAt ? "Prepare" : "Ready"}` : "Picked"} 
              </Text>
            </View>}
          </View>}


          {/* <Image
          source={CustomerHouse}
          style={styles.image}
          /> */}

          {deliveries[0]?.id && <View
          style={styles.selctionMainView}
          >
            <TouchableOpacity
            onPress={() => setActive("first")}
            style={active === "first" ? [styles.selectionView, {backgroundColor: customStyles.primaryColor,}] : styles.selectionView}
            >
              <Text
              style={active === "first" ? [styles.selectionText, {color: customStyles.white}] : styles.selectionText}
              >
          {`# ${deliveries[0]?.orderCode}`}
              </Text>
            </TouchableOpacity>

            {deliveries[1]?.id && <TouchableOpacity
            onPress={() => setActive("second")}
            style={active === "second" ? [styles.selectionView, {backgroundColor: customStyles.primaryColor}] : styles.selectionView}
            >
              <Text
              style={active === "second" ? [styles.selectionText, {color: customStyles.white}] : styles.selectionText}
              >
          {`# ${deliveries[1]?.orderCode}`}
              </Text>
            </TouchableOpacity>}

            {deliveries[2]?.id && <TouchableOpacity 
            onPress={() => setActive("third")}
            style={active === "third" ? [styles.selectionView, {backgroundColor: customStyles.primaryColor}] : styles.selectionView}
            >
              <Text
              style={active === "third" ? [styles.selectionText, {color: customStyles.white}] : styles.selectionText}
              >
          {`# ${deliveries[2]?.orderCode}`}
              </Text>
            </TouchableOpacity>}
          </View>}


           
    </View>


    {deliveries[0]?.id && <ScrollView
    style={[styles.mainView, {borderRadius: 0}]}>
        <>
        
     {currentDelivery?.pickedUpAt && <DeliveryDetails 
          details={null}
          widgetColor={undefined}
          widget1firstTitle={"Customer details"}
          widget1firstText={currentDelivery?.customerName}
          widget1firstIcon={"ios-person-circle-outline"}
          widget1secondText={currentDelivery?.customerNote}
          widget1secondIcon={"ios-alert-circle"}
          widget1thridText={`${currentDelivery?.customerAddress} ${currentDelivery?.customerCompany ? currentDelivery?.customerCompany : currentDelivery?.customerApartment}`}
          onWidget1thridText={onCustomerLocationPress}
          widget1thridIcon={"ios-location"}
          widget1firstButtonText={"Call customer"}
          widget1firstButtonIcon={"ios-phone-portrait"}
          widget2Title={"From the vendor"}
          widget2firstText={currentDelivery.vendorName}
          widget2firstIcon={"ios-restaurant"}
          widget2firstButtonText={`items`}
          widget2firstButtonIcon={"ios-fast-food"}
          onMainButtonPress={() => openMessageMenu(null, "dropDelivery")}
          onLastButtonPress={() => setShowItems(it => !it)}     
          mainButtonColor={undefined}
          mainButtonText={"Deliver order"}
          mainButtonIcon={"ios-phone-portrait"}
            />}

     {!currentDelivery?.pickedUpAt && <DeliveryDetails 
          details={null}
          widgetColor={undefined}
          widget1firstTitle={"Resturant details"}
          widget1firstText={currentDelivery?.vendorName}
          widget1firstIcon={"ios-restaurant"}
          widget1secondText={currentDelivery?.vendorNote}
          widget1secondIcon={"ios-alert-circle"}
          widget1thridText={currentDelivery?.vendorAddress}
          onWidget1thridText={onVendorLocationPress}
          widget1thridIcon={"ios-location"}
          widget1firstButtonText={`items`}
          widget1firstButtonIcon={"ios-fast-food"}
          widget2Title={"For the customer"}
          widget2firstText={currentDelivery?.customerName}
          widget2firstIcon={"ios-person-circle-outline"}
          onFirstButtonPress={() => {setShowItems(it => !it)}}
          widget2firstButtonText={currentDelivery?.customerAddress}
          widget2firstButtonIcon={"ios-location"}
          onMainButtonPress={() => openMessageMenu("pick Delivery", null)}
          mainButtonColor={undefined}
          mainButtonText={"Got the order"}
          mainButtonIcon={"ios-phone-portrait"}
          onLastButtonPress={onCustomerLocationPress}     
            />}



        {/* //previous task text */}
       <View
            style={styles.linkView}
            >
                <Text
                style={styles.linkText}
                >
                    {"See previous delivery ? "}
                </Text>

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  
                   navigation.navigate("PreviousDelivery", {"data": lastDelivery, "rider": rider})
                 }
                >
                <Text
                style={styles.applyText}
                >
                {"Check it from here."}
                </Text>

                </TouchableOpacity>


            </View>
       </>





    </ScrollView>}



{!deliveries[0]?.id && <View
  style={styles.nodeliveriesView}
  >
  <LottieView

       autoPlay={false}
       ref={LottieRef}
       style={styles.lottie}
       source={DrivingABikeLotte}
       // OR find more Lottie files @ https://lottiefiles.com/featured
       // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
     />
     <Text
  style={styles.titleNoTask}
  >{rider?.onlineStatus === "online" ? "Looking for deliveries" : "Go online in order to start getting orders from vendors."}</Text>

 { <OnlineStatusButton 
        buttonText={rider?.onlineStatus === "online" ? "Go Offline" : "Go Online"}
        status={rider?.onlineStatus === "online" ? true : false}
        trueColor={customStyles.negativeColor}
        falseColor={customStyles.primaryColor}
        onPress={onlineStatusPress} minWidth={undefined}  />}
  {/* <SliderButton online={undefined} onPress={undefined}/> */}



     {/* //previous task text */}
     <View
            style={[styles.linkView, {marginVertical: "15%",}]}
            >
                <Text
                style={styles.linkText}
                >
                    {"See previous delivery ? "}
                </Text>

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                   {
                    // console.log("data: ", rider?.lastDelivery) 
                    navigation.navigate("PreviousDelivery", {"data": lastDelivery, "rider": rider})
                  }
                }
                >
                <Text
                style={styles.applyText}
                >
                {"Check it from here."}
                </Text>

                </TouchableOpacity>


            </View>
    </View>}
      </>
)

};



