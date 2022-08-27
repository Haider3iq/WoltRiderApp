import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, Animated, Pressable, Linking, PlatformColor, Platform, Modal  } from 'react-native';
import * as Location from 'expo-location';

import googleMaps from "../assets/images/googleMaps.png"
import appleMaps from "../assets/images/appleMaps.png"

import EStyleSheet from 'react-native-extended-stylesheet';

import  MapView, { Polyline, Marker, Polygon, AnimatedRegion,} from 'react-native-maps';

import EditScreenInfo from '../components/EditScreenInfo';


//asstes
import Locations from "../assets/testData/Locations.json";
// import CustomerHouse from "../assets/images/newTask.png";
import siteMapPhoto from "../assets/images/sitemap.png";
import darkMapStyle from "../assets/darkMapStyle.json"
import TabOneScreen from './TabOneScreen';
import ProfileEditHeader from '../navigation/Header/ProfileEditHeader/ProfileEditHeader';
import customStyles from '../AppTheme/customStyles';
import React from 'react';
import WhereToButton from '../navigation/Bottom/WhereToButton';
import LocateMe from '../navigation/Bottom/LocateMe';
import Task from '../navigation/Task/Task';
import WorkingStatus from '../navigation/WorkingStatus/WorkingStatus';
import RightPanelButton from '../navigation/RightPanelButton/RightPanelButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rider } from '../src/Types/Modals';
import RiderTask from '../components/RiderTask';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import MapBottom from '../components/MapBottom';
import { useSelector } from 'react-redux';
import NewTaskScreen from '../components/ScreenComponents/NewTaskScreen';
import { acceptNewTask, skipNewTask } from '../src/functions';

export default function Home (props) {

  const {newTask, tasks, riderData} = useSelector(state=> state.riderReducer)

  const { navigation } = props;


  
const mapImage = Platform.OS === "ios" ? appleMaps : googleMaps





  
  const route = useRoute();





  const testOpenApp = () => {
    // const fullAddress = "Pitkäkatu 44"
    if(Platform.OS === "ios") {
      Linking.openURL(`maps:0,0?q=${route.params?.Address}`)
    } else {
      Linking.openURL(`geo:0,0?q=${route.params?.Address}`)
    }
    
  }


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => testOpenApp()}
        >
        <Image style={styles.locationIcon} source={mapImage} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  // useEffect(() => {
  //     if(route.params?.Address) {
  //       navigation.setParams({directionToAddress: testOpenApp});
  //     }
  // },[route?.params?.Address])




  const nav = useNavigation();

  
  const [location, setLocation] = useState<Location.LocationObject | null >(null);
  const [errorMsg, setErrorMsg] = useState(null);



  const [address, setAddress] = useState("You are currently not working")

  const [online, setOnline] = useState(false);

  // const [rider, setRider] = useState<Rider | null>(route.params?.data)
  const [rider, setRider] = useState(route.params?.data)
  const [workingStatus,  setWorkingStatus] = useState<Number>(0);
  const [otherLocation, setOtherLocation] = useState();
  // const [data] = props; 






  const mapRef = React.useRef();


useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    if(!!route?.params?.latitude) {
      // setDirectionName(route?.params?.directionName)
      // setCustomerName(route.params?.customerName)
      // setVendorName(route.params?.vendorName)
      // setIconName(route?.params?.iconName)
      setOtherLocation(
        {"latitude": route?.params?.latitude,
        "longitude": route?.params?.longitude,}
      )
      console.log("location to navigate to ", route?.params?.latitude)
        mapRef.current?.animateToRegion({
        latitude: route?.params?.latitude,
        longitude: route?.params?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  })

  return unsubscribe
}, [navigation])



 useEffect(() => {
    if(rider?.tasks?.length) {
      setWorkingStatus(rider?.tasks.length)
    }

 },[rider?.tasks?.length]) 

 useEffect(() => {
 fetchLocation();
}, []);

useEffect(() => {
  if(online) {
    navigation.setParams({openMap: testOpenApp, address: address, online: online})
  }
},[online])








  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      console.log(errorMsg)
      return;
    }

    let myLocation = await Location.getCurrentPositionAsync({});
    setLocation(myLocation);
    console.log(`my location: ${myLocation.coords}` )
    
  }


    const goOnline = () => {
      // setAddress("You are currently working");
      // setOnline(true)
      // navigation.setParams({openMap: testOpenApp, address: address, online: online})
      // setShowOfflineMessage(false)
      // console.log("online", online)
      const locationArray = {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      }

    }

   








  if(location) {


    
    const myLocation =  {"latitude": location.coords.latitude, "longitude": location.coords.longitude};
    const otherLocation = {"latitude": 63.09479733237235,
    "longitude": 21.619730237518308}
    const coordinates = [myLocation, otherLocation]

    //TODO:
    const locationColor = myLocation ? "#705AD0" : "lightgreen" 

   const onWhereToButtonPress = () => {
    
      mapRef.current.animateToRegion({
        latitude: route?.params?.latitude,
        longitude: route?.params?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    
   }

   const onLocateMeButtonPress = () => {
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
   }




    return (
      
      <>
      
      

      <View style={styles.container}>

      <MapView
      showsUserLocation
           showsMyLocationButton={true}
           ref={mapRef}
           initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}


          
          //customMapStyle={darkMapStyle}
          style={styles.map}
          >
          

        {/* Customer's location mark */}
        {route.params?.Address && <Marker 
        coordinate={otherLocation} 
        title={`${!!route.params?.customerName && "Customer's location 🏠" || !!route.params?.vendorName && "Vendor's location 🍲"}`}
        description={`${route.params?.Address}`}
        // pinColor="red"
        >

          <View
          style={[styles.locationIconLayout]}
          >
            {
             !!route.params?.customerName && <Image style={styles.locationIcon} source={customStyles.customerPlace} /> || !!route.params?.vendorName && <Image style={styles.locationIcon} source={customStyles.vendorPlace} />
            }
          
          </View>
          
        </Marker>}


        {/* My location mark */}
        {/* <Marker 
        focusable
        coordinate={myLocation} 
        title={"Your location now 📍"}
        description={`${locations.address}`}

        >
          <View
          style={[styles.locationIconLayout, {borderColor: locationColor}]}
          >
             <Image style={styles.locationIcon} source={customStyles.carPng} />
            
          
          </View>
          
        </Marker> */}


         {/* <Polygon
          coordinates={coordinates}
          strokeColor="#000" // fallback for when `strokecustomStyles` is not supported by the map-provider
          
          strokeWidth={4}
        />  */}
      </MapView>

      
     <RightPanelButton 
    //  onPress={infoPanel}
    onPress={() => navigation.navigate("WorkingScreen", {data: rider})}
     />
      {/* <WhereToButton noPlace={noPlace} onPress={() => {
        if(!!route?.params?.Address){
          testOpenApp(route?.params?.Address)
        }
        
        }} /> */}

        {route.params?.Address && <MapBottom onPress={() => onWhereToButtonPress()} iconName={route.params?.iconName} 
        name={route.params?.customerName ? route.params?.customerName :  route.params?.vendorName} text={"Locate"}/>}
      <LocateMe onPress={onLocateMeButtonPress} />
      {/* {showTask && <Task/> } */}
      {/* {rider?.onlineStatus === "offline" && <WorkingStatus onPress={goOnline} stayOffline={() => setShowOfflineMessage(false)} /> } */}
 
      

      {/* <TouchableOpacity
      onPress={onLocationPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: "red",
        position: "absolute",
      }}
      >
        <Text
        style={{fontSize: 25}}
        >{"Where am I ?"}</Text>
      </TouchableOpacity> */}
      
      </View>



      
      <Modal
 statusBarTranslucent
 // style={{backgroundColor: "red"}}
 animationType="fade"
   transparent={false}
   visible={newTask?.id ? true : false} 
   
   // onRequestClose={() => setModal(it => !it)}
 >
   <NewTaskScreen riderNewTask={newTask} acceptNewTask={() => acceptNewTask(newTask, tasks, riderData?.id)} skipNewTask={() => skipNewTask(newTask, tasks, riderData?.id)} />
   
   <StatusBar style={"light"}  backgroundColor={customStyles.primaryColor} />
 </Modal>

      
      </>
    );
  }
    return (
      <View 
      style={styles.container}
      >
      {/* <MapView
      initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    style={styles.map}
  /> */}
          
          
        {/* <Text>{"You have to allow location"}</Text> */}
      
        <StatusBar style={customStyles.statusbar} />
      </View>
    )
   




}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: customStyles.primaryBackgroundColor,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  locationIconLayout: {
    borderWidth: "2rem",
    borderRadius: "100rem",
    borderColor: customStyles.white,
  },
  locationIcon: {
    width: "30rem",
    height: "30rem"
  },
  titleNoTask: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: "white",
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   modalView: {
    backgroundColor: customStyles.successColor,
    paddingTop: "10%",
    alignItems: "center",
    paddingBottom: "30%",
    alignContent: "center",
    marginBottom: "-22%",
    borderBottomStartRadius: "20rem",
    borderBottomEndRadius: "20rem",
  },
  image: {
    width: "120rem", 
    height: "120rem", 
    padding: "5%", 
    // backgroundColor: customStyles.white, 
    borderRadius: "15rem",
  },


});




async function fetch_task_request (locationNow: Object, workingStatus: Number, onlineStatus: String) {

    
        
  // console.log("here we got")
  const function_name = "online_status_request"
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
           "locationNow": locationNow,
       })

    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
      }
      // console.log(`here is the response: ${responseJson}`)
    })

  } catch(error){
      console.log(`error in ${function_name}, ${error}`)
  } 
  

}
